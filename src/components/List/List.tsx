import React, { useMemo, useState } from "react";

import { CSS } from "@dnd-kit/utilities";
import CardModal from "@/components/Card/CardModal";
// component
import { ListTitle } from "@/components/List";
import { PlusOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";

interface IProps {
  list: Ilist;
  children?: React.ReactNode;
  tasks: Icard[];
  isDndDisabled: boolean;
  setIsDndDisabled: ISetStateFunction<boolean>;
  setTasks: ISetStateFunction<Icard[]>;
}

const List: React.FC<IProps> = (props) => {
  // console.log("props = ", props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, tasks, setTasks, children, isDndDisabled, setIsDndDisabled } =
    props;
  // console.log("list.id = ", list.id);
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

  // 是否顯示新增 Card 的 Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const columnTasks = useMemo(() => {
    return tasks.filter((task) => task.listId === list.id);
  }, [tasks, list.id]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };
  // console.log("isDragging = ", isDragging);
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[255px] shrink-0 flex flex-col max-h-full shadow-md p-3 bg-[#D9D9D9] rounded-md"
    >
      <ListTitle
        list={list}
        cardLength={columnTasks.length}
        setIsDndDisabled={setIsDndDisabled}
      />
      <section className="flex-1 flex flex-col gap-2 scrollbar-none overflow-y-auto">
        {children}
        {/* <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <Card
              key={task.id}
              task={task}
              setIsDndDisabled={setIsDndDisabled}
            />
          ))}
        </SortableContext> */}
      </section>

      <div className="flex justify-between gap-3 py-2 rounded-md transition-all hover:bg-zinc-300">
        <PlusOutlined />
        <span
          className="flex-1 flex justify-start cursor-pointer"
          onClick={() => {
            setIsShowModal(true);
            setIsDndDisabled(true);
          }}
        >
          Add Card
        </span>
      </div>

      <CardModal
        listId={list.id}
        setIsDndDisabled={setIsDndDisabled}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </div>
  );
};

export default List;
