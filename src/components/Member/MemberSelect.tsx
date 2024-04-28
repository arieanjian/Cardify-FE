import React from "react";
import { Select, Empty } from "antd";
import type { SelectProps } from "antd";

interface Iprops extends SelectProps {
  users: IUser[];
  onSearch?: (newValue: string) => void;
}

const MemberSelect: React.FC<Iprops> = ({ users, onSearch, ...rest }) => {
  const options =
    users?.map((user) => ({
      key: user._id,
      label: user.username,
      value: user._id,
      user: user,
    })) || [];
  return (
    <Select
      className="w-full"
      showSearch
      options={options}
      onSearch={onSearch}
      notFoundContent={<Empty />}
      filterOption={(input, option) => {
        if (typeof option?.label === "string") {
          // 讓搜尋不區分大小寫, ex: 輸入小寫 a 可以 filter 出大寫 A
          return option.label.toLowerCase().includes(input.toLowerCase());
        }
        return true;
      }}
      {...rest}
    />
  );
};

export default MemberSelect;
