import React, { useState } from "react";
import { Layout } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
// component
import Sider from "./Sider";
// API
import { useWsByUserId } from "@/hooks/Workspace";
import { useKanbans } from "@/hooks/Kanban";

export type ContextType = { isShowSider: boolean };

const Content: React.FC = () => {
  const [isShowSider, setIsShowSider] = useState(true);

  const queryClient = useQueryClient();
  // 目前登入人員
  const user = queryClient.getQueryData(["useAuth"]) as IUser;

  const { data: queryWs } = useWsByUserId({
    userId: user._id,
  });

  const { data: queryKanbans } = useKanbans({
    userId: user._id,
  });

  return (
    <Layout className="h-[calc(100vh_-_80px)]">
      <Sider
        queryWs={queryWs}
        queryKanbans={queryKanbans}
        isShowSider={isShowSider}
        setIsShowSider={setIsShowSider}
      />
      <Layout.Content
        className={`bg-[#F0F0F0] flex flex-col pt-5 pr-8 ${
          isShowSider ? "pl-5" : "pl-10"
        }`}
      >
        <Outlet
          key={queryWs?.workspaces?.length + queryKanbans?.kanbans.length} // 用來觸發 re-render
          context={{ isShowSider } satisfies ContextType}
        />
      </Layout.Content>
    </Layout>
  );
};

export default Content;
