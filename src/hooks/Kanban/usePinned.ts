import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// API
import instance from "@/service/instance";
// util
import { KANBAN_INIT_VALUE } from "@/util/initValue";

const usePinned = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (data: Ikanban) => {
      const res: IapiResponse = await instance.post("/kanban/pinned", data);
      const { msg, status } = res;
      if (status === "success") {
        message.success(msg);

        return res.data as Ikanban; // 回傳更新後的 kanban
      }

      if (status === "error" || status === "fail") {
        message.error(msg);
        return KANBAN_INIT_VALUE;
      }

      return KANBAN_INIT_VALUE;
    },
    onSuccess: async () => {
      queryClient.refetchQueries({ queryKey: ["useKanbans"] });
    },
  });
};

export default usePinned;
