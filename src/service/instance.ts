import axios, { AxiosInstance, AxiosResponse } from "axios";

import Cookies from "js-cookie";

// import qs from "qs";

export interface IApiResponse {
  // status: "success" | "fail" | "error";
  status: number;
  msg: string;
  data: unknown;
}

// 创建一个 Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASIC_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("cardify-token")}`, // 在標頭中設定 Authorization
  },
  // 跨域存取cookies 等待後端設定 cors
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在每次请求之前，从 cookie 中取得最新的 token
    const token = Cookies.get("cardify-token") || undefined;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 更新 Authorization 的值
    }
    return config;
  },
  (error) => {
    // 错误处理
    return Promise.reject(error);
  }
);

const setResponseData = (
  response: AxiosResponse,
  status: "success" | "fail" | "error",
  msg: string,
  data: unknown
) => {
  response.data = {
    status,
    msg,
    data,
  };
};
// const pendingReq = new Map();
// // 生成請求的唯一標識符
// const generateRequestKey = (config: AxiosRequestConfig) => {
//   const { method, url, params } = config;
//   return [method, qs.stringify(params), url].join("&").toString();
// };

// // 檢查是否有重複請求
// const checkPending = (config: AxiosRequestConfig) => {
//   const key = generateRequestKey(config);
//   return pendingReq.has(key);
// };
// // 將請求添加到 pendingReq 中
// const addPending = (config: AxiosRequestConfig) => {
//   const key = generateRequestKey(config);
//   if (!pendingReq.has(key)) {
//     // 為config添加cancelToken屬性
//     config.cancelToken = new axios.CancelToken((cancel) => {
//       // 確認pendingReq中沒有相同的key後，把這次請求的cancel函式存起來
//       pendingReq.set(key, cancel);
//     });
//   }
// };
// // 從 pendingReq 中移除請求
// const removePending = (config: AxiosRequestConfig) => {
//   const key = generateRequestKey(config);
//   // 如果pendingReq中有相同的key，把先前存起來的cancel函式拿出來執行，並且從pendingReq中移除
//   if (pendingReq.has(key)) {
//     const cancelToken = pendingReq.get(key);
//     cancelToken(key);
//     pendingReq.delete(key);
//   }
// };

// // 設置請求攔截器
// instance.interceptors.request.use(
//   function (config) {
//     if (config.method === "get") {
//       config.paramsSerializer = (params) =>
//         qs.stringify(params, { arrayFormat: "indices" });
//     }

//     // get 可以被重複請求 以最後一條為主 但 post 不行

//     // 檢查POST是否有重複請求
//     if (config.method === "post" && checkPending(config)) {
//       return Promise.reject({
//         code: "PostCanceledError",
//         message: generateRequestKey(config),
//         name: "PostCanceledError",
//       });
//     }

//     // 先判斷是否有重複的請求要取消
//     removePending(config);
//     // 把這次請求加入暫存
//     addPending(config);

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, msg, data } = response.data as IApiResponse;

    switch (status) {
      case 200:
        setResponseData(response, "success", msg, data);
        break;
      case 401: // token過期 or 沒有token
        setResponseData(response, "fail", msg, data);
        window.location.assign("/");
        break;
      case 403: // api 失敗
        setResponseData(response, "fail", msg, data);
        break;
      case 404: // 找不到對應的 api
        setResponseData(response, "fail", "Not Found", data);
        break;
      case 500: // 服務器錯誤
        setResponseData(response, "error", "Internal Server Error", data);
        break;
      default:
        setResponseData(response, "error", "Server Not Found", {});
        window.location.assign("/");
        break;
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.log("error = ", error);
      const { msg, data } = error.response.data;
      return {
        data,
        msg,
        status: "fail",
      };
    }

    return {
      data: {},
      msg: "Server Error",
      status: "fail",
    };
  }
);

export default instance;
