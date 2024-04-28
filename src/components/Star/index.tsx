import React from "react";

import { StarOutlined, StarFilled } from "@ant-design/icons";

interface Iprops extends React.HTMLProps<HTMLSpanElement> {
  isFill: boolean;
  className?: string;
}

const BASIC_CLASS = "text-md text-[#FF4D4F]";

const Star: React.FC<Iprops> = ({ isFill, className, ...rest }) => (
  <span
    className={`flex items-center cursor-pointer transition-all duration-[400ms] hover:scale-125 ${className}`}
    {...rest}
  >
    {isFill ? (
      <StarFilled className={BASIC_CLASS} />
    ) : (
      <StarOutlined className={BASIC_CLASS} />
    )}
  </span>
);

export default Star;
