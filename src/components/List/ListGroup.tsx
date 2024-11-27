import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
/* eslint-disable react-hooks/exhaustive-deps */
// util
import { IQueryParams, useWebSocket } from "@/hooks/webSocket";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Card } from "@/components/Card";
import CreateList from "./CreateList";
// component
// import CustDndContext from "./CustDndContext";
// import CustUseSortable from "./CustUseSortable";
import { KanbanContext } from "@/pages/Kanban";
import List from "./List";
import { arrayMoveWithOrder } from "@/util/kanban";
// import List from "./List";
import { debounce } from "lodash";
import { message } from "antd";
import { useChangeListOrder } from "@/hooks/List";
import { useChangeOrder } from "@/hooks/Card";

interface IParams extends IQueryParams {
  kanbanId: string;
}

interface Iprops {
  kanbanId: string;
}

const ListGroup: React.FC<Iprops> = ({ kanbanId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tags, setTags } = useContext(KanbanContext);
  const [lists, setLists] = useState<Ilist[]>([]);
  const [tasks, setTasks] = useState<Icard[]>([]);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  // 是否可以拖曳
  const [isDndDisabled, setIsDndDisabled] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socketProps, setSocketProps] = useState<IParams>({
    kanbanId: kanbanId,
  });
  // websocket 取得 list
  const call_listSocket = useWebSocket({
    url: `ws://localhost:8080/list`,
    queryParams: socketProps,
  });
  // websocket 取得 card
  const call_cardSocket = useWebSocket({
    url: `ws://localhost:8080/card`,
    queryParams: socketProps,
  });
  // websocket 取得 tag
  const call_tagSocket = useWebSocket({
    url: `ws://localhost:8080/tag`,
    queryParams: socketProps,
  });

  // 第一次進入頁面時，建立 WebSocket 連線
  useEffect(() => {
    call_listSocket.createSocket();
    call_tagSocket.createSocket();
    call_cardSocket.createSocket();
    // return () => {
    //   call_kanbanSocket.closeSocket();
    // };
  }, []);

  // 監聽後端傳來的 socket 訊息
  useEffect(() => {
    if (!call_listSocket.lastMessage) return;
    const { data, status, msg } = call_listSocket.lastMessage;
    if (status) {
      // 樂觀更新 => 比對 data 跟 lists 是否一樣，不一樣才更新 lists
      if (JSON.stringify(data) !== JSON.stringify(lists)) {
        setLists(data);
      }
    }
    if (!status) {
      message.error(msg);
      setLists([]);
    }
  }, [call_listSocket.lastMessage]);

  // 監聽後端傳來的 socket 訊息
  useEffect(() => {
    if (!call_cardSocket.lastMessage) return;
    const { data, status, msg } = call_cardSocket.lastMessage;
    if (status) {
      setTasks(data);
    }
    if (!status) {
      message.error(msg);
      setTasks([]);
    }
  }, [call_cardSocket.lastMessage]);

  // 監聽後端傳來的 socket 訊息
  useEffect(() => {
    if (!call_tagSocket.lastMessage) return;
    const { data, status, msg } = call_tagSocket.lastMessage;
    if (status) {
      const result = data?.reduce(
        (prev: ITagsContext, curr: Itag) => {
          prev.array.push(curr);
          prev.map[curr.id] = curr;
          return prev;
        },
        { array: [], map: {} }
      );
      setTags(result);
    }
    if (!status) {
      message.error(msg);
      setTags({ array: [], map: {} });
    }
  }, [call_tagSocket.lastMessage]);

  // const listIds = useMemo(() => {
  //   return lists?.map((list) => list.id) || [];
  // }, [lists]);

  // const tasksIds = useMemo(() => {
  //   return tasks.map((task) => task.id);
  // }, [tasks]);
  const listIds = lists?.map((list) => list.id);
  // const tasksIds = tasks.map((task) => task.id);

  const taskMap =
    tasks?.reduce<Record<string, Icard[]>>((prev, curr) => {
      if (!prev[curr.listId]) {
        prev[curr.listId] = [];
      }
      prev[curr.listId].push(curr);
      return prev;
    }, {}) || {};
  useEffect(() => {
    console.log("taskMap = ", taskMap);
  }, [taskMap]);
  // console.log("lists = ", lists);
  // console.log("aaa = ", aaa);
  // console.log("listIds = ", listIds);

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

  const debouncedChangeTaskOrder = useCallback(
    debounce((activeCard: Icard, overCard: Icard) => {
      // console.log("activeCard = ", activeCard);
      console.log("overCard = ", overCard);
      // over.order > 資料庫order -> 下面
      // over.order <= 資料庫order -> 上面
      // return;

      changeTaskOrder_mudation.mutate({
        activeCard: activeCard,
        targetCard: overCard,
      });
    }, 1000),
    [isDragging]
  );

  const onDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
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
    // console.log("onDragEnd event = ", event);
    setIsDragging(false);
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

    // console.log("active = ", active.id);
    // console.log("over = ", over.id);

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
        // return;
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
    // console.log("onDragOver event = ", event);
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
      // console.log("activeId = ", activeId);
      // console.log("overId = ", overId);
      const activeCard: Icard | undefined = tasks.find(
        (task) => task.id === active.id
      );
      const overCard: Icard | undefined = tasks.find(
        (task) => task.id === over.id
      );

      if (activeCard && overCard) {
        // call API 變更 task 順序
        // 防抖調用 changeTaskOrder_mudation.mutate
        debouncedChangeTaskOrder(activeCard, overCard);
        // changeTaskOrder_mudation.mutate({
        //   activeCard: activeCard,
        //   targetCard: overCard,
        // });
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === activeId);
          const overIndex = tasks.findIndex((t) => t.id === overId);
          // console.log("activeIndex = ", activeIndex);

          if (tasks[activeIndex].listId != tasks[overIndex].listId) {
            // Fix introduced after video recording
            tasks[activeIndex].listId = tasks[overIndex].listId;

            return arrayMoveWithOrder(tasks, activeIndex, overIndex - 1);
          }

          return arrayMoveWithOrder(tasks, activeIndex, overIndex);
        });
      }
    }

    const isOverAList = over.data.current?.type === "List";
    // Im dropping a Task over a column
    if (isActiveCard && isOverAList) {
      console.log("aa active = ", active);
      console.log("aa over = ", over);
      const activeCard: Icard | undefined = tasks.find(
        (task) => task.id === active.id
      );
      console.log("activeCard = ", activeCard);
      if (activeCard && over.data.current) {
        console.log("active.listId = ", activeCard.listId);
        console.log("overId = ", overId.toString());
        const targetCard = JSON.parse(JSON.stringify(activeCard));
        // call API 變更 task 順序
        debouncedChangeTaskOrder(
          { ...activeCard },
          {
            ...targetCard,
            listId: overId.toString(),
          }
        );
      }
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
  return (
    <section className="flex-1 flex gap-4 mb-2 min-w-full overflow-auto">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <SortableContext items={listIds} id={kanbanId}>
          {lists?.map((list) => (
            <List
              key={list.id}
              list={list}
              tasks={tasks}
              setTasks={setTasks}
              isDndDisabled={isDndDisabled}
              setIsDndDisabled={setIsDndDisabled}
            >
              <SortableContext
                // id={list.id}
                items={taskMap[list.id]?.map((card) => card.id) || []}
                strategy={verticalListSortingStrategy}
              >
                {taskMap[list.id]?.map((card) => (
                  <Card
                    key={card.id}
                    task={card}
                    setIsDndDisabled={setIsDndDisabled}
                  />
                ))}
              </SortableContext>
            </List>
          ))}
        </SortableContext>
        <DragOverlay>
          <div className="rotate-[5deg] flex h-full bg-red-500">
            {activeList && (
              <List
                list={activeList}
                tasks={tasks}
                setTasks={setTasks}
                isDndDisabled={isDndDisabled}
                setIsDndDisabled={setIsDndDisabled}
              />
            )}
            {activeTask && <Card task={activeTask} />}
          </div>
        </DragOverlay>
      </DndContext>

      <CreateList kanbanId={kanbanId} />
    </section>
  );
};

export default ListGroup;
