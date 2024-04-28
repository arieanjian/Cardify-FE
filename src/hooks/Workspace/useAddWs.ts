import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
// API
import instance from "@/service/instance";

interface Iprops {
  onSuccess: () => void;
}

const useAddWs = ({ onSuccess }: Iprops) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (mutation_data: IaddWorkspace) => {
      const res: IapiResponse = await instance.post(
        "/workspace/addWorkspace",
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
      queryClient.refetchQueries({ queryKey: ["useWsByUserId"] });
      onSuccess();
    },
  });
};

export default useAddWs;
