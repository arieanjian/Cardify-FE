import React from "react";
import { Breadcrumb } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  ProfileOutlined,
  HomeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const Bread: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryUser = queryClient.getQueryData(["useAuth"]) as IUser;
  const { workspaceId, kanbanId } = useParams();
  const queryWs = queryClient.getQueryData([
    "useWsByUserId",
    queryUser._id,
  ]) as IqueryWorkspaces;

  const queryKanban = queryClient.getQueryData([
    "useKanbans",
    queryUser._id,
  ]) as IqueryKanbans;

  if (!queryWs || !queryKanban) return null;

  const workspace = workspaceId && {
    onClick: () => navigate(`/workspace/${workspaceId}`),
    className: "cursor-pointer",
    title: (
      <>
        <ProfileOutlined />
        <span>{queryWs.workspaceMap[workspaceId].name}</span>
      </>
    ),
  };
  const kanban = kanbanId && {
    onClick: () => navigate(`/kanban/${workspaceId}/${kanbanId}`),
    className: "cursor-pointer",
    title: (
      <>
        <ProjectOutlined />
        <span>{queryKanban.kanbanMap[kanbanId].name}</span>
      </>
    ),
  };

  const overview = {
    onClick: () => navigate("/workspace"),
    className: "cursor-pointer",
    title: (
      <>
        <HomeOutlined />
        <span>overview</span>
      </>
    ),
  };
  const items = [overview];

  if (workspaceId && workspace) items.push(workspace);
  if (kanbanId && kanban) items.push(kanban);

  return <Breadcrumb items={items} />;
};

export default Bread;
