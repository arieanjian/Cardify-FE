import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface Iprops {
  children: React.ReactNode;
  className?: string;
}

const KanbanTitle: React.FC<Iprops> = ({ children, className }) => {
  return (
    <Title level={1} className={className}>
      {children}
    </Title>
  );
};

export default KanbanTitle;
