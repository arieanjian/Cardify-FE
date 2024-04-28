import { message } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  workspaceId?: string;
}

const useMembers = (props: Iprops) => {
  const { data, ...rest } = useQuery({
    queryKey: ["useMembers", props],
    placeholderData: keepPreviousData,
    enabled: !!props.workspaceId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/workspace/getMembers", {
        params: props,
      });
      if (!res) return [];

      if (res.status === "success") {
        return res.data as Imember[];
      }
      if (res.status === "error" || res.status === "fail") {
        message.error(res.msg);
        return [];
      }
      return [];
    },
  });
  return {
    ...rest,
    data: data || [],
  };
};

export default useMembers;
