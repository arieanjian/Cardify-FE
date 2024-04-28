import React from "react";
import { Outlet } from "react-router-dom";
// component
import Header from "./Header";
import Content from "./Content";
// hook
import useAuth from "@/hooks/Auth/useAuth";

const Layout: React.FC = () => {
  const { data: user, isFetching } = useAuth();

  if (isFetching) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-screen w-screen">
      <Header user={user} />
      {user._id.length > 0 ? <Content /> : <Outlet />}
    </div>
  );
};

export default Layout;
