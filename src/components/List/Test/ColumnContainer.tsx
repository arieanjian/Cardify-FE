import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { generateId } from "../ListGroup";

interface Props {
  column: Column;
  tasks: Task[];
  setTasks: ISetStateFunction<Task[]>;
}
interface IProps {
  task: Task;
}
export const TaskCard = (props: IProps) => {
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
        className="w-full h-[50px] flex-shrink-0 bg-gray-300 rounded-lg opacity-50"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full h-[50px] flex-shrink-0 bg-gray-300 rounded-lg"
    >
      {task.content}
    </div>
  );
};

const ColumnContainer = (props: Props) => {
  const { column, tasks, setTasks } = props;
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const basicStyle =
    "w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-slate-400";

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column: column,
    },
    // disabled:
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    // transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <section
        ref={setNodeRef}
        style={style}
        className={`${basicStyle} opacity-50`}
      />
    );
  }
  // console.log("columnTasks = ", columnTasks);
  const addTask = () => {
    const newTask: Task = {
      id: generateId(),
      columnId: column.id,
      content: `${column.title}-card-${columnTasks.length + 1}`,
    };
    console.log("newTask = ", newTask);
    setTasks([...tasks, newTask]);
  };

  const columnTasks =
    tasks?.filter((task) => task.columnId === column.id) || [];
  // console.log("columnTasks = ", columnTasks);
  return (
    <section
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${basicStyle}`}
    >
      {/* Column title */}
      <div
        className={`
            text-md text-white h-[60px] cursor-grab
            rounded-md rounded-b-none 
            p-3 font-bold
            border-solid border-4 border-slate-400
          `}
      >
        {column.title}
      </div>
      {/* Column content */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto p-2 bg-green-300">
        <SortableContext items={tasksIds}>
          {columnTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <div>
        <button onClick={addTask}>add card</button>
      </div>
    </section>
  );
};

export default ColumnContainer;
