import React from "react";
import { Typography } from "antd";

interface Iprops {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<Iprops> = ({ children, className }) => {
  return (
    <Typography.Title level={1} className={className}>
      {children}
    </Typography.Title>
  );
};

export default PageTitle;