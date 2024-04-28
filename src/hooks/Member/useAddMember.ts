import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

const useAddMember = () => {
  return useMutation({
    mutationFn: async (login_data: IloginProps) => {
      const res: IapiResponse = await instance.post(
        "/member/addMember",
        login_data
      );
      const { data, msg, status } = res;

      if (status === "success") {
        message.success(msg);
        return data as IauthResponse;
      }

      message.error(msg);
    },
  });
};

export default useAddMember;
