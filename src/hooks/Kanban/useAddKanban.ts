import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  onSuccess: () => void;
}

const useAddKanban = ({ onSuccess }: Iprops) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  return useMutation({
    mutationFn: async (data: IaddKanban) => {
      const res: IapiResponse = await instance.post("/kanban/addKanban", data);
      const { msg, status } = res;

      if (status === "success") {
        message.success(msg);

        return res.data as Iworkspace; // 回傳更新後的 workspace
      }

      if (status === "error" || status === "fail") {
        message.error(msg);
        return null;
      }
    },
    onSuccess: async (updataWorkspace) => {
      if (!updataWorkspace) {
        onSuccess();
        return;
      }

      queryClient.refetchQueries({ queryKey: ["useWsByUserId"] });
      queryClient.refetchQueries({ queryKey: ["useKanbans"] });
      onSuccess();
    },
  });
};

export default useAddKanban;
