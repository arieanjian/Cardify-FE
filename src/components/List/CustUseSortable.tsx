import React, { useMemo, useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import List from "./List";
import { useSortable } from "@dnd-kit/sortable";

interface IProps {
  list: Ilist;
  tasks: Icard[];
  setTasks: ISetStateFunction<Icard[]>;
}

// dndkit 目前有已知的效能問題，所以將 dndkit 的元件拆開，避免整個 List 重新 render
const CustUseSortable: React.FC<IProps> = (props) => {
  const { list, tasks, setTasks } = props;
  // 是否可以拖曳
  const [isDndDisabled, setIsDndDisabled] = useState<boolean>(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list: list,
    },
    disabled: isDndDisabled,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };

  const MemoList = useMemo(() => {
    // console.log("GGG tasks = ", tasks[0]?.listId);
    return (
      <List
        list={list}
        tasks={tasks}
        setTasks={setTasks}
        setIsDndDisabled={setIsDndDisabled}
      />
    );
  }, [list, tasks]);

  if (isDragging) {
    return (
      <section
        data-testid="list-element"
        ref={setNodeRef}
        style={style}
        className={`w-[255px] shrink-0 flex flex-col max-h-full shadow-md p-3 bg-[#D9D9D9] rounded-md opacity-50`}
      />
    );
  }
  return (
    <div
      data-testid="list-element"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // className="w-[255px] shrink-0 flex flex-col max-h-fit shadow-md"
    >
      {MemoList}
    </div>
  );
};

export default CustUseSortable;
