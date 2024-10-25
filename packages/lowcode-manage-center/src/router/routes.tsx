import { FC, ReactNode } from "react";
import { ProjectOutlined, ShopOutlined, UserOutlined, DownloadOutlined, FileOutlined } from "@ant-design/icons";
import { ANY_MATCH_NAME } from "/@/constants";

type Route = {
  label?: string;
  icon?: ReactNode;
  path: string;
  lazy: () => Promise<FC>;
  loader?: () => Promise<unknown>;
};

export const navRoutes: Route[] = [
  {
    label: "项目管理",
    path: "/project-manage",
    icon: <ProjectOutlined />,
    lazy: () => import("../pages/ProjectManage").then(({ Entry }) => Entry),
  },
  {
    label: "用户管理",
    path: "/user-manage",
    icon: <UserOutlined />,
    lazy: () => import("../pages/UserManage").then(({ Entry }) => Entry),
  },
  {
    label: "组件管理",
    path: "/component-manage",
    icon: <ShopOutlined />,
    lazy: () =>
      import("../pages/ComponentManage").then(({ Entry }) => Entry),
  },
  {
    label: "页面管理",
    path: "/page-manage",
    icon: <FileOutlined />,
    lazy: () =>
      import("../pages/PageManage").then(({ Entry }) => Entry),
  },
  {
    label: "下载【测试页】",
    path: "/download",
    icon: <DownloadOutlined />,
    lazy: () => import("../pages/Download").then(({ Entry }) => Entry),
  },
];

export const otherRoutes: Route[] = [
  {
    label: "详情",
    path: "/detail/:id",
    lazy: () => import("../pages/Detail").then(({ Entry }) => Entry),
  },
  {
    label: "项目详情",
    path: "/project-detail/:id",
    lazy: () => import("../pages/ProjectDetail").then(({ Entry }) => Entry),
  },
  {
    label: "项目详情",
    path: "/project-create",
    lazy: () => import("../pages/ProjectCreate").then(({ Entry }) => Entry),
  },
  {
    label: ANY_MATCH_NAME,
    path: "*",
    lazy: () =>
      import("../pages/PageNotFound").then(
        (PageNotFound) => PageNotFound.default
      ),
  },
];

export const allRoutes: Route[] = [...navRoutes, ...otherRoutes];
