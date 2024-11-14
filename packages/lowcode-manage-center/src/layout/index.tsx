import { FC, useEffect } from "react";
import { Layout } from "antd";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Header } from "/@/layout/components/Header";
import { Main } from "/@/layout/components/Main";
import { navRoutes } from "../router/routes";

export const BodyLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-expect-error window as any
    window.$wujie?.bus.$on("react16-router-change", (path: string) => {
      console.log(path);
      navigate(path);
    });
  }, []);



  useEffect(() => {
    // @ts-expect-error window as any
    window.$wujie?.bus.$emit("sub-route-change", "react16", location.pathname);
  }, [location]);

  if (location.pathname === "/") {
    return <Navigate replace to={navRoutes[0].path} />;
  }

  return (
    <Layout hasSider>
      {!window.__POWERED_BY_WUJIE__ ? <Nav /> : null}
      <Layout.Content>
        <Header />
        <Main />
      </Layout.Content>
    </Layout>
  );
};
