import React from "react";
// component
import Star from "../Star";
// util function
import { switchPinned } from "@/util/kanban";
// api
import { usePinned } from "@/hooks/Kanban";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface Iprops {
  kanban: Ikanban;
}

const MenuItem: React.FC<Iprops> = ({ kanban }) => {
  // 切換 kanban 是否為追蹤狀態(isPinned)
  const mutatePinned = usePinned();
  const handelClick = (event: ClickEvent) => {
    switchPinned(kanban, mutatePinned);
    event.stopPropagation();
  };
  if (!kanban) return;
  return (
    <div className="flex justify-between pr-1">
      <span>{kanban.name}</span>
      <Star
        isFill={kanban.isPinned}
        onClick={(e: ClickEvent) => handelClick(e)}
      />
    </div>
  );
};

export default MenuItem;
