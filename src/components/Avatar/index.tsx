import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

// 獲得 Avatar 的 prop 型別, 讓 CustAvatar 繼承
// type AvatarProps = React.ComponentProps<typeof AntdAvatar>;

interface IProps extends AvatarProps {
  user: IUser;
  onDelete?: () => void;
}

const Avatar: React.FC<IProps> = ({ user, onDelete, ...rest }) => {
  // console.log("info = ", info);
  return (
    <div className=" relative">
      <AntdAvatar
        size={32}
        src={
          user?.avatar?.length > 0 &&
          `https://cdn.filestackcontent.com/${user.avatar}`
        }
        className="cursor-pointer bg-gray-500"
        {...rest}
      >
        {user.avatar.length === 0 ? user.username[0] : null}
      </AntdAvatar>
      {onDelete && (
        <div
          onClick={onDelete}
          className={`
            absolute top-[-5px] right-[-7px] 
            w-4 h-4 flex-center bg-red-500 rounded-lg cursor-pointer
            hover:scale-150 transition-transform
          `}
        >
          <CloseOutlined
            style={{ width: "8px", height: "8px", color: "#FFF" }}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
