import { App } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// API
import instance from "@/service/instance";
// util
import { QUERY_KANBANS_INIT_VALUE } from "@/util/initValue";

interface Iprops {
  userId?: string;
}

const useKanbans = (props: Iprops) => {
  const { message } = App.useApp();

  const { data, ...rest } = useQuery<IqueryKanbans, Error>({
    queryKey: ["useKanbans", props.userId],
    placeholderData: keepPreviousData,
    enabled: !!props.userId,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/kanban/getKanbans", {
        params: props,
      });
      if (!res) {
        return QUERY_KANBANS_INIT_VALUE;
      }

      if (res.status === "error" || res.status === "fail") {
        message.error(res.msg);
        return QUERY_KANBANS_INIT_VALUE;
      }

      if (res.status === "success") {
        const kanbans = res.data as Ikanban[];
        const kanbanMap = kanbans?.reduce((prev, curr) => {
          prev[curr._id] = curr;
          return prev;
        }, {} as IkanbanMap);

        return { kanbans, kanbanMap };
      }

      return QUERY_KANBANS_INIT_VALUE;
    },
  });

  return {
    ...rest,
    data: data || QUERY_KANBANS_INIT_VALUE,
  };
};

export default useKanbans;
