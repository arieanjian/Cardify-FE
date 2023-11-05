import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// API
import instance from "@/service/instance";
// util
import { USER_INIT_VALUE } from "@/util/initValue";

const useAuth = () => {
  const navigate = useNavigate();
  const { data, ...rest } = useQuery<IUser, Error>({
    queryKey: ["useAuth"],
    placeholderData: USER_INIT_VALUE,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/auth/verifyAuth");

      if (!res) {
        return USER_INIT_VALUE;
      }

      if (res.status === "success") {
        const { userInfo, token } = res.data as IauthResponse;
        // 取得使用者資訊時更新token
        Cookies.set("cardify-token", token);
        // 登入成功導轉到 workspace
        userInfo._id.length > 0 ? navigate("/workspace") : navigate("/");
        return userInfo;
      }

      if (res.status === "error" || res.status === "fail") {
        // 失敗導轉到首頁
        navigate("/");
        return USER_INIT_VALUE;
      }
      // 失敗導轉到首頁
      navigate("/");
      return USER_INIT_VALUE;
    },
  });

  return {
    ...rest,
    data: data || USER_INIT_VALUE,
  };
};

export default useAuth;
