import { App } from "antd";
// API
import instance from "@/service/instance";
import { useMutation } from "@tanstack/react-query";

// interface Iprops {
//   onSuccess: () => void;
// }

export interface IchangeOrder {
  activeCard: Icard;
  targetCard: Icard;
}

const useChangeOrder = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (mutation_data: IchangeOrder) => {
      const res: IapiResponse = await instance.post(
        "/card/changeOrder",
        mutation_data
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

export default useChangeOrder;
