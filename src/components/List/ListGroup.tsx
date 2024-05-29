/* eslint-disable react-hooks/exhaustive-deps */
// util
import { IQueryParams, useWebSocket } from "@/hooks/webSocket";
import React, { useEffect, useMemo, useState } from "react";

import CreateList from "./CreateList";
// component
import CustDndContext from "./CustDndContext";
import List from "./List";
import { SortableContext } from "@dnd-kit/sortable";
import { message } from "antd";

interface IParams extends IQueryParams {
  kanbanId: string;
}

interface Iprops {
  kanbanId: string;
}

const ListGroup: React.FC<Iprops> = ({ kanbanId }) => {
  const [lists, setLists] = useState<Ilist[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socketProps, setSocketProps] = useState<IParams>({
    kanbanId: kanbanId,
  });
  // websocket 取得 list
  const call_listSocket = useWebSocket({
    url: `ws://localhost:8080/list`,
    queryParams: socketProps,
  });

  // 第一次進入頁面時，建立 WebSocket 連線
  useEffect(() => {
    call_listSocket.createSocket();
    // return () => {
    //   call_kanbanSocket.closeSocket();
    // };
  }, []);

  // 監聽後端傳來的 socket 訊息
  useEffect(() => {
    if (!call_listSocket.lastMessage) return;
    const { data, status, msg } = call_listSocket.lastMessage;
    if (status) {
      // 比對 data 跟 lists 是否一樣，不一樣才更新 lists
      if (JSON.stringify(data) !== JSON.stringify(lists)) {
        setLists(data);
      }
    }
    if (!status) {
      message.error(msg);
      setLists([]);
    }
  }, [call_listSocket.lastMessage]);

  const listIds = useMemo(() => {
    return lists.map((list) => list.id);
  }, [lists]);

  return (
    <section className="flex-1 flex gap-4 mb-2 min-w-full overflow-auto">
      <CustDndContext
        lists={lists}
        setLists={setLists}
        tasks={tasks}
        setTasks={setTasks}
      >
        <SortableContext items={listIds}>
          {lists.map((list) => (
            <List
              key={list.order}
              list={list}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </SortableContext>
      </CustDndContext>

      <CreateList kanbanId={kanbanId} />
    </section>
  );
};

export default ListGroup;
