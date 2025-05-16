import { FC, ReactNode } from "react";
import { ProjectOutlined, ShopOutlined, UserOutlined, DownloadOutlined, FileOutlined } from "@ant-design/icons";
import { ANY_MATCH_NAME, ROUTES_ENUM } from "/@/constants";

type Route = {
  label?: string;
  icon?: ReactNode;
  path: ROUTES_ENUM;
  lazy: () => Promise<FC>;
  loader?: () => Promise<unknown>;
};

export const navRoutes: Route[] = [
  {
    label: "模板管理",
    path: ROUTES_ENUM.TEMPLATE_MANAGE,
    icon: <ProjectOutlined />,
    lazy: () => import("../pages/TemplateManage").then(({ Entry }) => Entry),
  },
  {
    label: "生成报告",
    path: ROUTES_ENUM.GENERATE_REPORT,
    icon: <UserOutlined />,
    lazy: () => import("../pages/UserManage").then(({ Entry }) => Entry),
  },
  {
    label: "模板编辑器",
    path: ROUTES_ENUM.TEMPLATE_EDITOR,
    icon: <ShopOutlined />,
    lazy: () => import("../pages/TemplateEditor").then(({ Entry }) => Entry),
  },
];

export const otherRoutes: Route[] = [
  // {
  //   label: "项目详情",
  //   path: "/project-detail/:id",
  //   lazy: () => import("../pages/ProjectDetail").then(({ Entry }) => Entry),
  // },
  // {
  //   label: "项目详情",
  //   path: "/project-create",
  //   lazy: () => import("../pages/ProjectCreate").then(({ Entry }) => Entry),
  // },
  {
    label: ANY_MATCH_NAME,
    path: ROUTES_ENUM.NONE_MATCH,
    lazy: () =>
      import("../pages/PageNotFound").then(
        (PageNotFound) => PageNotFound.default
      ),
  },
];

export const allRoutes: Route[] = [...navRoutes, ...otherRoutes];
