import React from "react";
import { Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ListTitle: React.FC = () => {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between cursor-pointer">
        <Title level={5} className="flex-1">
          Metting
        </Title>
        <MoreOutlined
          rotate={90}
          className="text-xl transition-all duration-[400ms] hover:scale-125"
        />
      </div>
      <Text type="secondary">2 cards</Text>
    </section>
  );
};

export default ListTitle;
