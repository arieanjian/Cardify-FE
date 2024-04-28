import { App } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// API
import instance from "@/service/instance";
// util
import { QUERY_WORKSPACE_INIT_VALUE } from "@/util/initValue";

interface Iprops {
  userId?: string;
}

const useWsByUserId = (props: Iprops) => {
  const { message } = App.useApp();
  const { data, ...rest } = useQuery<IqueryWorkspaces, Error>({
    queryKey: ["useWsByUserId", props.userId],
    placeholderData: keepPreviousData,
    enabled: !!props.userId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/workspace/getByUserId", {
        params: props,
      });
      if (!res) {
        return QUERY_WORKSPACE_INIT_VALUE;
      }

      if (res.status === "error" || res.status === "fail") {
        message.error(res.msg);
        return QUERY_WORKSPACE_INIT_VALUE;
      }

      if (res.status === "success") {
        const workspaces = res.data as Iworkspace[];
        const workspaceMap = workspaces?.reduce((prev, curr) => {
          prev[curr._id] = curr;
          return prev;
        }, {} as IworkspaceMap);

        return { workspaces, workspaceMap };
      }

      return QUERY_WORKSPACE_INIT_VALUE;
    },
  });

  return {
    ...rest,
    data: data || QUERY_WORKSPACE_INIT_VALUE,
  };
};

export default useWsByUserId;
