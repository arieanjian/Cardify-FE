import Bread from "@/components/Bread";
// component
import { ContextType } from "@/components/Layout/Content";
import { KanbanGroup } from "@/components/Kanban";
import React from "react";
import { Typography } from "antd";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const { Title } = Typography;

const Workspace: React.FC = () => {
  const queryClient = useQueryClient();
  const { isShowSider } = useOutletContext<ContextType>();

  const user = queryClient.getQueryData(["useAuth"]) as IUser;

  const queryWs = queryClient.getQueryData([
    "useWsByUserId",
    user._id,
  ]) as IqueryWorkspaces;

  return (
    <>
      <Bread />
      <Title className="mt-5 mb-7">Overview</Title>
      <section className="overflow-y-auto flex flex-col gap-6 flex-1 p-2">
        {queryWs?.workspaces?.map((workspace) => (
          <KanbanGroup
            key={workspace._id}
            workspace={workspace}
            isShowSider={isShowSider}
          />
        ))}
      </section>
    </>
  );
};

export default Workspace;
