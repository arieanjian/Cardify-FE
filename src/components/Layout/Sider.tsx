import {
  AppstoreOutlined,
  DoubleLeftOutlined,
  PlusCircleFilled,
  ProfileOutlined,
  ProjectOutlined,
  StarOutlined,
} from "@ant-design/icons";
// component
import { FloatButton, MenuItem } from "../Sider";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

import { KanbanModal } from "../Kanban";
import type { MenuProps } from "antd";
import { WsModal } from "@/components/Workspace";
// util function
import { navigateKanban } from "@/util/kanban";
import { useNavigate } from "react-router-dom";

interface Iprops {
  queryWs: IqueryWorkspaces;
  queryKanbans: IqueryKanbans;
  isShowSider: boolean;
  setIsShowSider: ISetStateFunction<boolean>;
}

const Sider: React.FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const { queryWs, queryKanbans, isShowSider, setIsShowSider } = props;
  // 是否開啟建立 workspace 的彈窗
  const [isCreateWorkspace, setIsCreateWorkspace] = useState(false);
  // 是否開啟建立 kanban 的彈窗
  const [isCreateKanban, setIsCreateKanban] = useState(false);
  // 建立 kanban 時讓後端知道要建在哪個 workspace
  const [workspaceId, setWorkspaceId] = useState("");
  // 紀錄 Menu 選中的東西
  const [s_selectedKeys, set_s_selectedKeys] = useState<string[]>([]);

  if (!queryKanbans) return <div>null</div>;
  if (queryKanbans.kanbans.length === 0) return <div>null</div>;

  const item_basic: MenuProps["items"] = [
    {
      key: "noSelect_overview",
      label: (
        <div className="flex justify-between">
          <span>Overview</span>
          <DoubleLeftOutlined onClick={() => setIsShowSider(false)} />
        </div>
      ),
      icon: <AppstoreOutlined />,
    },
    {
      key: "Favorite_page_noSelect",
      label: "Favorite page",
      icon: <StarOutlined />,
    },
    {
      key: "noSelect_create",
      label: "create workspace",
      className: "text-[#7D7D7D]",
      icon: <PlusCircleFilled />,
      onClick: () => setIsCreateWorkspace(true),
    },
    { type: "divider" },
  ];

  const generateKanbans = (kanbanIds: string[], workspaceId: string) => {
    const kanbans: MenuProps["items"] =
      kanbanIds?.map((kanbanId) => {
        return {
          key: kanbanId,
          label: <MenuItem kanban={queryKanbans.kanbanMap[kanbanId]} />,
          icon: <ProjectOutlined />,
          onClick: () =>
            navigateKanban(navigate, queryKanbans.kanbanMap[kanbanId]),
        };
      }) || [];

    const createKanban = {
      key: `${workspaceId}_noSelect`,
      className: "text-[#7D7D7D]",
      onClick: () => {
        setIsCreateKanban(true);
        setWorkspaceId(workspaceId);
      },
      label: (
        <div>
          <span>Create kanban</span>
        </div>
      ),
      icon: <PlusCircleFilled />,
    };

    kanbans.push(createKanban);

    return kanbans;
  };

  const item_workspaces: MenuProps["items"] = queryWs?.workspaces?.map(
    (workspace) => {
      const kanbans: MenuProps["items"] = generateKanbans(
        workspace.kanbanIds,
        workspace._id
      );

      return {
        key: workspace._id,
        label: workspace.name,
        icon: <ProfileOutlined />,
        children: kanbans,
      };
    }
  );

  return (
    <>
      {!isShowSider && <FloatButton setIsShowSider={setIsShowSider} />}
      <Layout.Sider
        className="border-solid border-0 border-r border-[#d8d7d7] bg-[#F0F0F0] overflow-auto"
        width={isShowSider ? 255 : 0}
      >
        <Menu
          mode="inline"
          className="sider"
          items={item_basic.concat(item_workspaces)}
          selectedKeys={s_selectedKeys}
          onClick={(props) => {
            if (!props.key.includes("noSelect")) {
              set_s_selectedKeys([props.key]);
            }
          }}
        />
      </Layout.Sider>

      {/* 新增、修改 workspace 的 component */}
      <WsModal
        isOpen={isCreateWorkspace}
        closeWsModal={() => setIsCreateWorkspace(false)}
      />

      <KanbanModal
        isOpen={isCreateKanban}
        workspaceId={workspaceId}
        closeKanbanModal={() => {
          setIsCreateKanban(false);
          setWorkspaceId("");
        }}
      />
    </>
  );
};

export default Sider;
