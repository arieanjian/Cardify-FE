import { message } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  onSuccess: () => void;
}

// 登入
const useLogin = ({ onSuccess }: Iprops) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (login_data: IloginProps) => {
      const res: IapiResponse = await instance.post("/auth/login", login_data);
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

export default useLogin;
