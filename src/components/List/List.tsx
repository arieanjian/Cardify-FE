import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useMemo, useState } from "react";

import { Card } from "@/components/Card";
import CardModal from "@/components/Card/CardModal";
// component
import { ListTitle } from "@/components/List";
import { PlusOutlined } from "@ant-design/icons";
import { SortableContext } from "@dnd-kit/sortable";

interface IProps {
  list: Ilist;
  setIsDndDisabled?: ISetStateFunction<boolean>;
  tasks: Icard[];
  setTasks: ISetStateFunction<Icard[]>;
}

const List: React.FC<IProps> = (props) => {
  // console.log("props = ", props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { list, tasks, setTasks, setIsDndDisabled = () => {} } = props;

  // 是否顯示新增 Card 的 Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  // console.log("tasksIds = ", tasksIds);

  // const onDragEnd = (event: DragEndEvent) => {
  //   console.log("List onDragEnd event = ", event);

  //   const {
  //     active, // 記錄拖曳開始時的資訊
  //     over, // 記錄拖曳結束時的資訊
  //   } = event;
  //   if (!over) return;

  //   // console.log("active = ", active.id);
  //   // console.log("over = ", over.id);
  // };

  // useEffect(() => {
  //   console.log("list render");
  // });
  // const addTask = () => {
  //   alert("wait");
  //   // const newTask: Task = {
  //   //   columnId: list.order,
  //   //   content: `${list.name}-card-${columnTasks.length + 1}`,
  //   // };
  //   // console.log("newTask = ", newTask);
  //   // setTasks([...tasks, newTask]);
  // };
  // const columnTasks = tasks.filter((task) => task.listId === list.id);
  const columnTasks = useMemo(() => {
    return tasks.filter((task) => task.listId === list.id);
  }, [tasks, list.id]);

  return (
    <div className="h-full w-[255px] flex flex-col rounded-md cursor-pointer p-3 bg-[#D9D9D9] max-h-fit">
      <ListTitle
        list={list}
        cardLength={columnTasks.length}
        setIsDndDisabled={setIsDndDisabled}
      />
      <section className="flex-1 flex flex-col gap-2 scrollbar-none overflow-y-auto">
        {/* <DndContext onDragEnd={onDragEnd}> */}
        <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <Card
              key={task.id}
              task={task}
              setIsDndDisabled={setIsDndDisabled}
            />
          ))}
        </SortableContext>
        {/* </DndContext> */}
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
