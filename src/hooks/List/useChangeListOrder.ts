import { App } from "antd";
// API
import instance from "@/service/instance";
import { useMutation } from "@tanstack/react-query";

const useChangeListOrder = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (mutation_data: IchangeListOrder) => {
      const res: IapiResponse = await instance.post(
        "/list/changeListOrder",
        mutation_data
      );
      const { msg, status } = res;

      if (status === "success") {
        message.success(msg);
        return;
      }

      message.error(msg);
    },
  });
};

export default useChangeListOrder;
