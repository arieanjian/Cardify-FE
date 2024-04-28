import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage";
import Kanban from "@/pages/Kanban";
// pages
import LandingPage from "@/pages/LandingPage";
// component
import Layout from "@/components/Layout/Layout";
import React from "react";
import Workspace from "@/pages/Workspace";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 斜線導入 */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/workspace">
            <Route path="/workspace/:workspaceId" element={<Workspace />} />
            <Route path="/workspace" element={<Workspace />} />
          </Route>
          <Route path="/kanban/:workspaceId/:kanbanId" element={<Kanban />} />
        </Route>
        <Route path="/404" element={<ErrorPage />} />
        {/* 未匹配 */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
