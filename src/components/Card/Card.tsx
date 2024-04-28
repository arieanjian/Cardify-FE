import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";

interface IProps {
  task: Task;
}

const Card: React.FC<IProps> = (props) => {
  const { task } = props;
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Card",
      card: task,
    },
    // disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full h-[160px] max-h-[245px] bg-white shadow-md rounded-sm opacity-50"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full h-[160px] max-h-[245px] bg-white shadow-md rounded-sm"
    >
      Card
    </div>
  );
};

export default Card;
