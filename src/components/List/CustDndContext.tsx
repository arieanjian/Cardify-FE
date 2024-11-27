import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";

// component
import { Card } from "@/components/Card";
import List from "./List";
// util
import { arrayMoveWithOrder } from "@/util/kanban";
// import { debounce } from "lodash";
// api
import { useChangeListOrder } from "@/hooks/List";
import { useChangeOrder } from "@/hooks/Card";

interface Iprops {
  children: React.ReactNode;
  lists: Ilist[];
  setLists: ISetStateFunction<Ilist[]>;
  tasks: Icard[];
  setTasks: ISetStateFunction<Icard[]>;
}

const CustDndContext: React.FC<Iprops> = ({
  lists,
  setLists,
  tasks,
  setTasks,
  children,
}) => {
  const [activeList, setActiveList] = useState<Ilist | null>(null);
  const [activeTask, setActiveTask] = useState<Icard | null>(null);

  // 變更 list 順序
  const changeListOrder_mudation = useChangeListOrder();
  // 變更 task 順序
  const changeTaskOrder_mudation = useChangeOrder();
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
      // delay: 100,
      // tolerance: 0,
    },
  });
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 300,
    },
  });
  const sensors = useSensors(pointerSensor, mouseSensor);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Card") {
      setActiveTask(event.active.data.current.card);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    console.log("onDragEnd event = ", event);
    setActiveList(null);
    setActiveTask(null);

    const {
      active, // 記錄拖曳開始時的資訊
      over, // 記錄拖曳結束時的資訊
    } = event;
    if (!over) return;

    // 拖曳開始時 dom 的 type
    const activeType = active.data.current?.type || "";
    // 拖曳結束時 dom 的 type
    const overType = over.data.current?.type || "";

    console.log("active = ", active.id);
    console.log("over = ", over.id);

    // 拖曳 Card
    if (activeType === "Card" && overType === "Card") {
      const activeCard: Icard | undefined = tasks.find(
        (task) => task.id === active.id
      );
      const overCard: Icard | undefined = tasks.find(
        (task) => task.id === over.id
      );

      if (!activeCard || !overCard) return;

      // 在同一個 list 內拖曳
      if (activeCard.listId === overCard.listId) {
        return;
        // call API 變更 task 順序
        changeTaskOrder_mudation.mutate({
          activeCard: activeCard,
          targetCard: overCard,
        });
        // changeTaskOrder_mudation.mutate({
        //   activeTask: activeCard,
        //   newOrder: overCard.order,
        // });
        // console.log("tasks before = ", tasks);
        // const result = arrayMoveWithOrder(tasks, activeCard.order, overCard.order);
        // console.log("arrayMoveWithOrder = ", result);
        // alert(123);
        // 用樂觀更新 task 順序
        // setTasks(result);
      }

      if (activeCard && overCard) {
        // call API 變更 task 順序
        // changeTaskOrder_mudation.mutate({
        //   activeTask: activeCard,
        //   newOrder: overCard.order,
        // });
        // console.log("tasks before = ", tasks);
        // const result = arrayMoveWithOrder(tasks, activeCard.order, overCard.order);
        // console.log("arrayMoveWithOrder = ", result);
        // alert(123);
        // 用樂觀更新 task 順序
        // setTasks(result);
      }
    }

    // 結束拖曳時放置位置為原點
    if (active.id === over.id) return;

    // 拖曳 List
    if (activeType === "List" && overType === "List") {
      const activeList: Ilist | undefined = lists.find(
        (list) => list.id === active.id
      );
      const overList: Ilist | undefined = lists.find(
        (list) => list.id === over.id
      );
      if (activeList && overList) {
        // call API 變更 list 順序
        changeListOrder_mudation.mutate({
          activeList: activeList,
          newOrder: overList.order,
        });
        console.log("list before = ", lists);
        const result = arrayMoveWithOrder(
          lists,
          activeList.order,
          overList.order
        );
        console.log("arrayMoveWithOrder = ", result);
        // alert(123);
        // 用樂觀更新 list 順序
        setLists(result);
      }
    }
  };
  const onDragOver = (event: DragOverEvent) => {
    console.log("onDragOver event = ", event);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    // 卡片移動到不同的看板
    const isActiveCard = active.data.current?.type === "Card";
    const isOvereCard = over.data.current?.type === "Card";

    if (!isActiveCard) return;

    // In dropping a Task over another Task
    if (isActiveCard && isOvereCard) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].listId != tasks[overIndex].listId) {
          // Fix introduced after video recording
          tasks[activeIndex].listId = tasks[overIndex].listId;

          return arrayMoveWithOrder(tasks, activeIndex, overIndex - 1);
        }
        console.log("123");
        return arrayMoveWithOrder(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";
    // Im dropping a Task over a column
    if (isActiveCard && isOverAList) {
      // console.log("aa activeId = ", activeId);
      // console.log("aa overId = ", overId);
      setTasks((tasks) => {
        const _tasks = [...tasks];
        const activeIndex = _tasks.findIndex((t) => t.id === activeId);
        // console.log("aa activeIndex = ", activeIndex);
        _tasks[activeIndex].listId = overId.toString();
        // console.log("tasks = ", tasks);
        // console.log("run");
        return arrayMoveWithOrder(_tasks, activeIndex, activeIndex);
      });
    }
  };

  // console

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      sensors={sensors}
      // modifiers={[restrictToWindowEdges]}
      // collisionDetection={pointerWithin}
    >
      {children}
      <DragOverlay>
        <div className="rotate-[5deg] w-[255px] flex h-full">
          {activeList && (
            <List list={activeList} tasks={tasks} setTasks={setTasks} />
          )}
          {activeTask && <Card task={activeTask} />}
        </div>
      </DragOverlay>
    </DndContext>
  );
};
// CustDndContext.desplayName = "CustDndContext";
// CustDndContext.prototype = {};

export default CustDndContext;
