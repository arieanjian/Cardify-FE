import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Typography, Flex, Space } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
// component
import { KanbanCard, CreateKanbanCard } from "./index";

const { Title } = Typography;

interface Iprops {
  workspace: Iworkspace;
  isShowSider: boolean;
}

const KanbanGroup: React.FC<Iprops> = ({ workspace, isShowSider }) => {
  const queryClient = useQueryClient();
  const queryUser = queryClient.getQueryData(["useAuth"]) as IUser;

  const queryKanban = queryClient.getQueryData([
    "useKanbans",
    queryUser._id,
  ]) as IqueryKanbans;

  if (!queryKanban) return <div>null</div>;
  if (queryKanban.kanbans.length === 0) return <div>null</div>;

  const displayWorkspace = () => {};

  const kanbans = workspace.kanbanIds.map(
    (kanbanId) => queryKanban.kanbanMap[kanbanId]
  );

  kanbans.sort((a, b) => {
    return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
  });

  return (
    <Flex vertical>
      <Flex justify="space-between" className="pb-2">
        <Title level={4} className="cursor-pointer" onClick={displayWorkspace}>
          <ClockCircleOutlined className="mr-2" />
          {workspace.name}
        </Title>

        <Space size={0}>
          <UserOutlined />
          {workspace.memberIds.length}
          <EllipsisOutlined className="text-lg ml-3 cursor-pointer transition-all hover:scale-125" />
        </Space>
      </Flex>

      <section
        className={`
        grid gap-2
        ${
          isShowSider
            ? "grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6"
            : "grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7"
        }
      `}
      >
        {kanbans.map((kanban) => (
          <KanbanCard key={kanban._id} kanban={kanban} />
        ))}
        <CreateKanbanCard workspaceId={workspace._id} />
      </section>
    </Flex>
  );
};

export default KanbanGroup;
