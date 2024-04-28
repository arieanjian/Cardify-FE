/* eslint-disable  @typescript-eslint/no-explicit-any */
import { act, renderHook } from "@testing-library/react";
import useWebSocket, {
  WebSocketState,
} from "../../hooks/webSocket/useWebSocket";

// import { useWebSocket } from "@/hooks/webSocket";

describe("檢查 createSocket", () => {
  const url = "wss://example.com";
  const queryParams = { id: 123 };
  let result: { current: WebSocketState };

  // 在每個 test case 執行前 render useWebSocket
  beforeEach(() => {
    result = renderHook(() => useWebSocket({ url, queryParams })).result;
  });

  it("是否有 createSocket 這個 function", async () => {
    expect(result.current.createSocket).toBeDefined();
  });

  it("執行 createSocket 前 ws 應為 null", async () => {
    expect(result.current.ws).toBeNull();
  });

  it("執行 createSocket 後是否能正確建立 webSocket instance", async () => {
    // 建立 websocket
    await act(async () => {
      await result.current.createSocket();
    });
    // createSocket 後 ws 應不為 null
    expect(result.current.ws).not.toBeNull();
    // createSocket 後 ws 應為 WebSocket instance
    expect(result.current.ws).toBeInstanceOf(WebSocket);
  });
});

describe("檢查 parseQuery", () => {
  const url = "wss://example.com";
  const queryParams = { id: 123 };
  let result: { current: WebSocketState };

  // 在每個 test case 執行前 render useWebSocket
  beforeEach(() => {
    result = renderHook(() => useWebSocket({ url, queryParams })).result;
    if (!result.current) {
      throw new Error("WebSocket instance 不存在");
    }
  });

  it("是否有 parseQuery 這個 function", () => {
    expect(result.current.parseQuery).toBeDefined();
  });

  it("傳入 null 時回傳 null", () => {
    const parsedQuery = result.current.parseQuery(null);

    expect(parsedQuery).toBe(null);
  });

  it("傳入 string 時回傳 null", () => {
    const parsedQuery = result.current.parseQuery("i am a string" as any);

    expect(parsedQuery).toBe(null);
  });

  it("傳入 number 時回傳 null", () => {
    const parsedQuery = result.current.parseQuery(1000 as any);

    expect(parsedQuery).toBe(null);
  });

  it("傳入各種 array 時回傳 null", () => {
    const numberArray = [1, 2, 3];
    const stringArray = ["1", "2", "3"];
    const booleanArray = [true, true, false];
    const parsedQuery_number = result.current.parseQuery(numberArray as any);
    const parsedQuery_string = result.current.parseQuery(stringArray as any);
    const parsedQuery_boolen = result.current.parseQuery(booleanArray as any);

    expect(parsedQuery_number).toBe(null);
    expect(parsedQuery_string).toBe(null);
    expect(parsedQuery_boolen).toBe(null);
  });

  it("傳入物件時回傳物件的 stringified string", () => {
    const query = { id: 1234 };
    const parsedQuery = result.current.parseQuery(query as any);

    expect(parsedQuery).toEqual(JSON.stringify(query));
  });
});
