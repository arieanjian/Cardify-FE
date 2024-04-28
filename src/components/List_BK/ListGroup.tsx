import ColumnContainer, { TaskCard } from "./Test/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// component
// import List from "./List";
import React, { useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

const ListGroup: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 3,
    },
  });

  const sensors = useSensors(pointerSensor);

  const columnIds = useMemo(() => {
    return columns.map((column) => column.id);
  }, [columns]);

  const cereateNewColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log(
      "event.active.data.current?.type = ",
      event.active.data.current?.type
    );
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Card") {
      setActiveTask(event.active.data.current.card);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("DragEndEvent = ", event);
    setActiveColumn(null);
    setActiveTask(null);

    const {
      active, // 記錄拖曳開始時的資訊
      over, // 記錄拖曳結束時的資訊
    } = event;
    console.log("active = ", active);
    console.log("over = ", over);
    if (!over) return;

    // 結束拖曳時放置位置為原點
    if (active.id === over.id) return;

    // 拖曳開始時 dom 的 type
    const activeType = active.data.current?.type || "";
    // 拖曳結束時 dom 的 type
    const overType = over.data.current?.type || "";

    // 拖曳 Column
    if (activeType === "Column" && overType === "Column") {
      const activeIndex = columns.findIndex((col) => col.id === active.id);
      const overIndex = columns.findIndex((col) => col.id === over.id);
      setColumns(arrayMove(columns, activeIndex, overIndex));
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    // 卡片移動到不同的看板
    const isActiveCard = active.data.current?.type === "Card";
    const isOvereCard = over.data.current?.type === "Card";

    if (!isActiveCard) return;

    // Im dropping a Task over another Task
    if (isActiveCard && isOvereCard) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveCard && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  console.log("activeColumn = ", activeColumn);
  return (
    <section className="flex-1 flex gap-4 mb-2 min-w-full overflow-auto bg-gray-500">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <div className="flex gap-2">
          <SortableContext items={columnIds}>
            {columns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          <div className="rotate-[5deg]">
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks}
                setTasks={setTasks}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </div>
        </DragOverlay>
      </DndContext>

      <button
        className="h-[60px] w-[350px] rounded-lg cursor-pointer bg-slate-400 border-solid border-2 border-slate-500"
        onClick={cereateNewColumn}
      >
        Add
      </button>
    </section>
  );
  // return (
  //   <section
  //     ref={setNodeRef}
  //     className="flex-1 flex gap-4 pb-5 min-w-full overflow-auto"
  //   >
  //     <List id="1" />
  //     <List id="2" />
  //     <List id="3" />
  //   </section>
  // );
};

export const generateId = () => Math.floor(Math.random() * 10001);

export default ListGroup;
