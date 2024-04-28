import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Typography, Flex, Divider, Button, message } from "antd";
import { DefaultOptionType as Ioption } from "antd/es/select";
// api
import useUsers from "@/hooks/useUsers";
import useMembers from "@/hooks/Member/useMembers";
import { useAddWs } from "@/hooks/Workspace";
// component
import { MemberSelect, MemberList } from "@/components/Member";
// util
import debounce from "@/util/debounce";

interface Iprops {
  closeWsModal: () => void; // 關閉 Modal
  wsData: Iworkspace; // 編輯的資料
}

const { Text } = Typography;

const WsModal: React.FC<Iprops> = ({ wsData, closeWsModal }) => {
  const queryClient = useQueryClient();

  const owner_userInfo = queryClient.getQueryData(["useAuth"]) as IUser;

  const owner: Imember = {
    _id: owner_userInfo._id,
    userInfo: owner_userInfo,
    role: "Owner",
  };
  // 判斷現在是新建 or 修改
  const isCreate = wsData._id.length === 0;

  const [userName, setUserName] = useState(""); // 用來搜尋 member
  const [workspaceName, setWorkspaceName] = useState(""); // 要新增的 workspaceName
  const [members, setMembers] = useState<Imember[]>([owner]); // 要新增的 member

  const { data: queryUsers, ...usersResult } = useUsers({
    username: userName,
  });
  const { data: quertMembers } = useMembers({
    workspaceId: wsData._id,
  });
  const addWs_mutation = useAddWs({
    onSuccess: closeWsModal,
  });

  // 新增 member
  const addMember = (_: string, option: Ioption | Ioption[]) => {
    if (Array.isArray(option)) return;
    if (!option.user) return;

    const user: IUser = option.user;

    const newMember: Imember = {
      _id: user._id,
      userInfo: user,
      role: "Member", // 角色權限預設值
    };

    // 檢查 member 是否已存在
    const member = members.find(
      (member) => member.userInfo._id === newMember.userInfo._id
    );

    if (member?.role === "Owner") {
      message.error("user can't be Owner");
      return;
    }

    if (member) {
      message.error("user already exists");
      return;
    }

    setMembers((prev) => {
      return [...prev, newMember];
    });
  };

  const onSubmit = () => {
    if (isCreate) {
      addWs_mutation.mutate({
        name: workspaceName,
        members: members,
      });
      // const data:IaddMember[] = members.map(member => ({
      // }))
    }
  };

  const searchUserByName = debounce((newValue: string) => {
    setUserName(newValue);
  }, 1000);

  console.log(userName);

  useEffect(() => {
    if (quertMembers.length > 0) {
      setMembers(quertMembers);
    }
  }, [quertMembers]);

  console.log("queryUsers = ", queryUsers);

  return (
    <section className="border-solid border-0 border-t border-[#F5F5F5]">
      <Flex vertical gap="middle" className="mt-5">
        <Flex vertical>
          <Text strong className="my-0">
            workspace name<span className="text-red-500">*</span>
          </Text>
          <Input
            placeholder="please type a name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </Flex>

        <Flex vertical>
          <Text strong className="my-0">
            Members<span className="text-red-500">*</span>
          </Text>
          <MemberSelect
            users={queryUsers}
            loading={usersResult.isFetching}
            onChange={addMember}
            onSearch={isCreate ? searchUserByName : undefined}
          />
        </Flex>

        <MemberList members={members} setMembers={setMembers} />

        <Divider className="m-0" />

        <Flex gap="small" justify="end">
          <Button onClick={closeWsModal}>Cancel</Button>
          <Button type="primary" onClick={onSubmit}>
            {isCreate ? "Create" : "Save"}
          </Button>
        </Flex>
      </Flex>
    </section>
  );
};

export default WsModal;
