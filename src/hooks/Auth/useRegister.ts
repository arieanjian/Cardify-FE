import { message } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  onSuccess: () => void;
}

interface IauthResponse {
  userInfo: IUser;
  token: string;
}

// 註冊
const useRegister = ({ onSuccess }: Iprops) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (register_data: IregisterProps) => {
      const res: IapiResponse = await instance.post(
        "/auth/register",
        register_data
      );
      const { data, msg, status } = res;

      if (status === "success") {
        message.success(msg);
        return data as IauthResponse;
      }
      message.error(msg);
    },
    onSuccess: async (res) => {
      if (!res) return;
      const { userInfo, token } = res as IauthResponse;
      // set cookie
      Cookies.set("cardify-token", token);
      // set useAuth 的 data
      queryClient.setQueryData(["useAuth"], userInfo);
      // 導轉到 workspace
      navigate("/workspace");
      onSuccess();
    },
  });
};

export default useRegister;
