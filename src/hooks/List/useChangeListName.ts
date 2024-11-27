import { App } from "antd";
// API
import instance from "@/service/instance";
import { useMutation } from "@tanstack/react-query";

const useChangeListName = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (mutation_data: IchangeListName) => {
      const res: IapiResponse = await instance.post(
        "/list/changeListName",
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

export default useChangeListName;
