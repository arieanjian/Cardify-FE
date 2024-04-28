import { Flex, Typography } from "antd";
// util function
import { navigateKanban, switchPinned } from "@/util/kanban";

import { EllipsisOutlined } from "@ant-design/icons";
import React from "react";
// component
import Star from "../Star";
import { useNavigate } from "react-router-dom";
// api
import { usePinned } from "@/hooks/Kanban";

const { Title } = Typography;

interface Iprops {
  kanban: Ikanban;
}

const KanbanCard: React.FC<Iprops> = ({ kanban }) => {
  const mutatePinned = usePinned();
  const navigate = useNavigate();
  // switch kanban isPinned
  const onClick = (e: React.MouseEvent) => {
    switchPinned(kanban, mutatePinned);
    e.stopPropagation();
  };

  if (!kanban) return;
  return (
    <Flex
      vertical
      justify="space-between"
      className="cursor-pointer bg-white rounded-md shadow-md h-[130px] px-4 py-2"
      onClick={() => navigateKanban(navigate, kanban)}
    >
      <Flex justify="space-between">
        <Title level={5}>{kanban.name}</Title>
        <EllipsisOutlined className="text-lg ml-3 cursor-pointer transition-all hover:scale-125" />
      </Flex>
      <Star
        className="self-end text-xl"
        isFill={kanban.isPinned}
        onClick={(e) => onClick(e)}
      />
    </Flex>
  );
};

export default KanbanCard;
