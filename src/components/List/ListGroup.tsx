/* eslint-disable react-hooks/exhaustive-deps */
// util
import { IQueryParams, useWebSocket } from "@/hooks/webSocket";
import React, { useContext, useEffect, useMemo, useState } from "react";

import CreateList from "./CreateList";
// component
import CustDndContext from "./CustDndContext";
import CustUseSortable from "./CustUseSortable";
import { KanbanContext } from "@/pages/Kanban";
// import List from "./List";
import { SortableContext } from "@dnd-kit/sortable";
import { message } from "antd";

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

  const listIds = useMemo(() => {
    return lists?.map((list) => list.id) || [];
  }, [lists]);

  // console.log("lists = ", lists);
  console.log("tasks = ", tasks);
  // console.log("listIds = ", listIds);
  return (
    <section className="flex-1 flex gap-4 mb-2 min-w-full overflow-auto">
      <CustDndContext
        lists={lists}
        setLists={setLists}
        tasks={tasks}
        setTasks={setTasks}
      >
        <SortableContext items={listIds}>
          {lists?.map((list) => (
            <CustUseSortable
              key={list.id}
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
