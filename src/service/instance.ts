import Cookies from "js-cookie";
import axios, { AxiosInstance, AxiosResponse } from "axios";

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
