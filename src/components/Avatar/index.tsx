import React from "react";
import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";

// 獲得 Avatar 的 prop 型別, 讓 CustAvatar 繼承
// type AvatarProps = React.ComponentProps<typeof AntdAvatar>;

interface IProps extends AvatarProps {
  user: IUser;
}

const Avatar: React.FC<IProps> = ({ user, ...rest }) => {
  // console.log("info = ", info);
  return (
    <AntdAvatar
      size={32}
      src={
        user.avatar.length > 0 &&
        `https://cdn.filestackcontent.com/${user.avatar}`
      }
      className="cursor-pointer bg-gray-500"
      {...rest}
    >
      {user.avatar.length === 0 ? user.username[0] : null}
    </AntdAvatar>
  );
};

export default Avatar;
