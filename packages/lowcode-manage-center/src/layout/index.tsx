import { FC, useEffect } from "react";
import { Layout } from "antd";

// const { Header, Content, Footer, Sider } = Layout;

// const siderStyle: React.CSSProperties = {
//   overflow: "auto",
//   height: "100vh",
//   position: "fixed",
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarColor: "unset",
// };

import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { Layout as AntdLayout } from 'antd'
// import cns from 'classnames'

// import { useIsDesktop } from '/@/hooks/useIsDeskTop'
import { Nav } from "./components/Nav";
import { Header } from "/@/layout/components/Header";
import { Main } from "/@/layout/components/Main";
import { navRoutes } from "../router/routes";

export const BodyLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const isDesktop = useIsDesktop()
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // if (!isDesktop) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-center text-xl">
  //       Please use a device with a width greater than 1024px to access.
  //     </div>
  //   )
  // }

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

  // return (
  //   <AntdLayout className={cns(!isDesktop && 'hidden')}>
  //     <Nav />

  //     <AntdLayout.Content>
  //       <Header />
  //       <Main />
  //     </AntdLayout.Content>
  //   </AntdLayout>
  // )
  return (
    <Layout hasSider className="bg-gray-200">
      <Nav />
      <Layout.Content>
        <Header />
        <Main />
      </Layout.Content>
    </Layout>
  );
};
