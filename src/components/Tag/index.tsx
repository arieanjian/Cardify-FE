import * as AntdIcons from "@ant-design/icons";

import React from "react";

interface IProps {
  // name: string;
  // color: string;
  // icon: string;
  tag: Itag;
  size?: "large" | "middle" | "small";
  className?: string;
  narrowMold?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const Index: React.FC<IProps> = ({
  tag, // 要顯示的 tag
  size = "small", // tag 的大小
  className, // tag 的額外 class
  narrowMold = false, // 是否為窄版 tag
  ...props
}) => {
  const sizeMap = {
    large: "text-[40px] h-8 px-5 py-1 leading-[40px]",
    middle: "text-[20px] h-7 px-3 py-1 leading-[25px]",
    small: "text-[15px] h-5 px-1 py-1 leading-[20px]",
  };
  const AntdIcon = AntdIcons[tag.icon as keyof typeof AntdIcons];
  const ValidAntdIcon = AntdIcon as React.ComponentType;

  return (
    <span
      className={`${tag.color} ${sizeMap[size]} inline-flex rounded-sm min-w-[40px] ${className}`}
      onClick={props.onClick}
    >
      <span
        className={`transition-all duration-500 ease-in-out  ${
          narrowMold ? "max-w-0 overflow-hidden" : "max-w-full"
        }`}
      >
        <ValidAntdIcon />
      </span>

      <span
        className={`transition-all duration-500 ease-in-out  ${
          narrowMold ? "max-w-0 overflow-hidden" : "max-w-full"
        }`}
      >
        {tag.name}
      </span>
    </span>
  );
};

export default Index;
