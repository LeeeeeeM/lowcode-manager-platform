import { FC, ReactNode } from "react";
import { HomeOutlined, RadarChartOutlined } from "@ant-design/icons";
import { ANY_MATCH_NAME } from "../constants/routes";

type Route = {
  label?: string;
  icon?: ReactNode;
  path: string;
  lazy: () => Promise<FC>;
};

export const routes: Route[] = [
  {
    label: "项目管理",
    path: "/project-manage",
    icon: <HomeOutlined />,
    lazy: () => import("../pages/Home/Entry").then(({ Entry }) => Entry),
  },
  {
    label: "用户管理",
    path: "/user-manage",
    icon: <RadarChartOutlined />,
    lazy: () => import("../pages/About").then((About) => About.default),
  },
  {
    label: "下载",
    path: "/download",
    icon: <RadarChartOutlined />,
    lazy: () =>
      import("../pages/Download").then((Download) => Download.default),
  },
  {
    label: "组件管理",
    path: "/component-manage",
    icon: <RadarChartOutlined />,
    lazy: () =>
      import("../pages/Product/Product").then((Product) => Product.default),
  },
];

export const otherRoutes: Route[] = [
  {
    label: "详情",
    path: "/detail/:id",
    lazy: () => import("../pages/Detail/Entry").then(({ Entry }) => Entry),
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

export const allRoutes: Route[] = [...routes, ...otherRoutes];
