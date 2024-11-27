import { Empty, Select } from "antd";
import React, { useState } from "react";

import type { SelectProps } from "antd";
// util
import debounce from "@/util/debounce";
// API
import useUsers from "@/hooks/useUsers";

interface Iprops extends SelectProps {}

const MemberSelect: React.FC<Iprops> = ({ ...rest }) => {
  // 用來搜尋 member
  const [userName, setUserName] = useState("");

  const { data: queryUsers, ...usersResult } = useUsers({
    username: userName,
  });

  const options =
    queryUsers?.map((user) => ({
      key: user._id,
      label: user.username,
      value: user._id,
      user: user,
    })) || [];

  const searchUserByName = debounce((newValue: string) => {
    setUserName(newValue);
  }, 1000);

  return (
    <Select
      className="w-full"
      showSearch
      options={options}
      onSearch={searchUserByName}
      loading={usersResult.isFetching}
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
