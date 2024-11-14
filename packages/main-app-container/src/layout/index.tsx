import { FC } from "react";
import { Layout } from "antd";

import { Navigate, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Header } from "/@/layout/components/Header";
import { Main } from "/@/layout/components/Main";
import { navRoutes } from "../router/routes";

const hasNav = (window as Window).__PROJECT_CONFIG__?.portalConfig?.hasNav || false;
const hasTitle = (window as Window).__PROJECT_CONFIG__?.portalConfig?.hasTitle || false;

export const BodyLayout: FC = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate replace to={navRoutes[0].path} />;
  }

  return (
    <Layout hasSider className="h-full">
      {hasNav ? <Nav /> : null}
      <Layout.Content className="overflow-auto h-full">
        {hasTitle ? <Header /> : null}
        <Main />
      </Layout.Content>
    </Layout>
  );
};
