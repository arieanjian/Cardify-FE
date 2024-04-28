import { message } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// API
import instance from "@/service/instance";

interface Iprops {
  username?: string;
  _id?: string;
}

const useUsers = (props: Iprops) => {
  const { data, ...rest } = useQuery({
    queryKey: ["useUsers", props],
    // queryKey: ["useUsers"],
    placeholderData: keepPreviousData,
    enabled: !!props.username || !!props._id,
    queryFn: async () => {
      const res: IapiResponse = await instance.get("/user", {
        params: props,
      });

      if (!res) return [];

      if (res.status === "success") {
        return res.data as IUser[];
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

export default useUsers;
