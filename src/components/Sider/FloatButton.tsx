import React from "react";
import { DoubleRightOutlined } from "@ant-design/icons";

interface Iprops {
  setIsShowSider: ISetStateFunction<boolean>;
}

const FloatButton: React.FC<Iprops> = ({ setIsShowSider }) => (
  <div
    className={`
      bg-[#b9b8b8] 
      hover:opacity-70 cursor-pointer transition 
      flex-center 
      w-8 h-16 absolute rounded-r-xl
    `}
    onClick={() => setIsShowSider(true)}
  >
    <DoubleRightOutlined className="text-white" />
  </div>
);

export default FloatButton;
