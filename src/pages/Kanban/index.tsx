import React, { useEffect } from "react";

// component
import Bread from "@/components/Bread";
import { KanbanTitle } from "@/components/Kanban";
import { ListGroup } from "@/components/List";
// API
import { useKanbans } from "@/hooks/Kanban";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Kanban: React.FC = () => {
  const { kanbanId = "" } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["useAuth"]) as IUser;
  const { data: queryKanbans } = useKanbans({
    userId: user._id,
  });
  const kanban: Ikanban = queryKanbans.kanbanMap[kanbanId];
  useEffect(() => {
    console.log("render");
    return () => {
      console.log("unmount");
    };
  }, []);
  if (!kanban) return <div />;
  return (
    <section className="h-full flex flex-col">
      <Bread />
      <KanbanTitle className="my-3">{kanban.name}</KanbanTitle>
      {/* <div>workspaceId: {workspaceId}</div>
      <div>kanbanId: {kanbanId}</div> */}
      <ListGroup />
    </section>
  );
};

export default Kanban;
