/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface IProps {
  url: string; // 要連線的 WebSocket URL
  queryParams?: IQueryParams; // 連線時的 query params
}
// 傳遞給後端的 query params 資料型態 (key-value pair)
export type IQueryParams = { [key: string]: string | number | boolean };

// 聲明 useWebSocket 的返回值類型(方便寫 unit test)
export interface WebSocketState {
  ws: WebSocket | null;
  lastMessage: IlastMessage | null;
  isLoading: boolean;
  createSocket: () => void;
  parseQuery: (query: IQueryParams | null) => string | null;
}

interface IlastMessage {
  status: boolean;
  msg: string;
  data: any;
}

const useWebSocket = (props: IProps): WebSocketState => {
  const { url, queryParams = null } = props;
  // 將 socketRef 初始化為 null
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<IlastMessage | null>(null);
  // 是否正在等待後端回應
  const [isLoading, setIsLoading] = useState(false);

  // 建立 WebSocket 實例
  const createSocket = async () => {
    const socket = await new WebSocket(url);
    setWs(socket);
  };
  // 將 queryParams 轉換成字串格式
  const parseQuery = (query: IQueryParams | null = null): string | null => {
    const isObject =
      typeof query === "object" && query !== null && !Array.isArray(query);
    // queryParams 不是物件時回傳 null
    if (!isObject) return null;
    // 將 query params 轉換成字串
    const stringifiedQueryParams = query ? JSON.stringify(query) : null;
    if (stringifiedQueryParams) {
      return stringifiedQueryParams;
    }

    return null;
  };

  // 解析後端傳來的訊息
  const onMessage = (jsonString: string): IlastMessage => {
    if (!jsonString) {
      return {
        status: false,
        msg: "webSocket回應錯誤",
        data: null,
      };
    }
    return JSON.parse(jsonString);
  };

  useEffect(() => {
    if (!ws) return;
    // 連線成功後的 callback
    ws.onopen = () => {
      console.log(`webSocket連線開啟`);
    };
    ws.onmessage = (event) => {
      console.log(`webSocket接收到後端訊息`);
      const parseData = onMessage(event.data);
      setLastMessage(parseData);
      // 設定 isLoading 為 false
      setIsLoading(false);
    };
  }, [ws]);

  // queryParams 改變時將 queryParams 轉換成字串格式
  useEffect(() => {
    // 如果 ws 不存在則不執行
    if (!ws) return;
    // 如果 ws 連線狀態不是 1 (OPEN) 則不執行
    if (ws.readyState !== 1) return;
    const queryString = parseQuery(queryParams);
    // queryString 不為 null 時傳送資料給後端
    if (queryString) ws.send(queryString);
    // 設定 isLoading 為 true
    setIsLoading(true);
  }, [queryParams, ws?.readyState]);

  return { ws, createSocket, parseQuery, lastMessage, isLoading };
};

export default useWebSocket;
