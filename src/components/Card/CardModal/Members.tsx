import { Divider, Form, FormInstance, Input, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";

import Avatar from "@/components/Avatar";
// component
import { MemberSelect } from "@/components/Member";
import { useQueryClient } from "@tanstack/react-query";
// API
import useUsers from "@/hooks/useUsers";

interface IProps {
  card: Icard | undefined;
  form: FormInstance<Icard>;
}

const Members: React.FC<IProps> = ({ form }) => {
  const queryClient = useQueryClient();
  // 如果是新增狀態，則取得當前使用者
  const owner_user = queryClient.getQueryData(["useAuth"]) as IUser;

  // 取得所有人員資料
  const { data: queryUsers } = useUsers({ username: "all" });
  // 取得所有人員資料，用來顯示成員頭像
  const [userMap, setUserMap] = useState<Record<string, IUser>>({});

  const f_memberIds = Form.useWatch("memberIds", form);
  console.log("owner_user = ", owner_user);
  console.log("f_memberIds = ", f_memberIds);
  console.log("userMap = ", userMap);

  // 將所有人員資料轉換成 map 方便查找
  useEffect(() => {
    if (queryUsers) {
      const newMap =
        queryUsers?.reduce((prev, curr) => {
          prev[curr._id] = curr;
          return prev;
        }, {} as Record<string, IUser>) || {};
      setUserMap(newMap);
    }
  }, [queryUsers]);

  // 新增成員, 如果成員已存在則不新增
  const addMember = (memberID: string) => {
    // 判斷 f_memberIds 是否為陣列，如果不是則初始化為空陣列
    let memberIds = f_memberIds;
    if (!Array.isArray(memberIds)) {
      memberIds = [];
    }

    if (memberIds?.includes(memberID)) return;
    form.setFieldsValue({ memberIds: [...memberIds, memberID] });
  };

  // 刪除成員
  const deleteMember = (memberId: string) => {
    const memberIds = f_memberIds.filter((id: string) => id !== memberId);
    form.setFieldsValue({ memberIds });
  };

  return (
    <section className="flex flex-col">
      <Typography.Text strong>Members</Typography.Text>

      <MemberSelect onChange={(memberID) => addMember(memberID)} />

      <Form.Item
        label={<Typography.Text strong>Members</Typography.Text>}
        name="memberIds"
        hidden
      >
        <Input />
      </Form.Item>

      <section className="flex mt-3">
        <div className="flex flex-col items-center gap-2">
          <Tag color="success">Owner</Tag>
          <Avatar user={owner_user} size={30} />
        </div>

        <Divider type="vertical" className="h-20" />

        <div className="flex flex-col gap-2 flex-1">
          <Tag className="w-14">Owner</Tag>
          <div className="flex flex-1 gap-[15px]">
            {Object.keys(userMap).length > 0 &&
              f_memberIds?.map((memberId: string) => (
                <Avatar
                  key={memberId}
                  user={userMap[memberId]}
                  size={30}
                  onDelete={() => deleteMember(memberId)}
                />
              ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Members;
