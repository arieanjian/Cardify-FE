import { App } from "antd";
// API
import instance from "@/service/instance";
import { useMutation } from "@tanstack/react-query";

interface Iprops {
  onSuccess: () => void;
}

const useModifyCard = ({ onSuccess }: Iprops) => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (mutation_data: Icard) => {
      const res: IapiResponse = await instance.post(
        "/card/modifyCard",
        mutation_data
      );
      const { data, msg, status } = res;

      if (status === "success") {
        message.success(msg);
        return data as IauthResponse;
      }

      message.error(msg);
    },
    onSuccess: async () => {
      onSuccess();
    },
  });
};

export default useModifyCard;
