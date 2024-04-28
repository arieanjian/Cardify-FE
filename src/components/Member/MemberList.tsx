import React from "react";
import { Select, Flex, Typography } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
// component
import Avatar from "@/components/Avatar";
// util
import { ROLE_DEFAULT_VALUE } from "@/util/initValue";

interface Iprops {
  members: Imember[];
  setMembers: ISetStateFunction<Imember[]>;
}

const { Title } = Typography;

const roleOptions = ROLE_DEFAULT_VALUE.filter((role) => role !== "Owner").map(
  (role) => ({
    label: role,
    value: role,
  })
);

const MemberList: React.FC<Iprops> = (props) => {
  const { members, setMembers } = props;

  const changeRole = (memberId: string, newRole: Imember["role"]) => {
    setMembers((prev) => {
      return prev.map((member) => ({
        ...member,
        role: memberId === member._id ? newRole : member.role,
      }));
    });
  };

  const removeMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member._id !== memberId));
  };

  return (
    <Flex vertical gap="small">
      {members?.map((member) => (
        <Flex key={member._id} align="center" gap="small">
          <Avatar user={member.userInfo} size={30} />
          <Title level={5} className="flex-1">
            {member.userInfo.username}
          </Title>
          <Select
            size="small"
            className="w-24"
            disabled={member.role === "Owner"}
            value={member.role}
            options={roleOptions}
            onChange={(role) => changeRole(member._id, role)}
          />
          {member.role !== "Owner" && (
            <MinusCircleOutlined
              className="text-lg"
              onClick={() => removeMember(member._id)}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default MemberList;
