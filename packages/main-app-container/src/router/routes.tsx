import { ReactNode } from "react";
// import { ProjectOutlined } from "@ant-design/icons";
import { ANY_MATCH_NAME } from "/@/constants";
// import ProjectManager from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import WujieContainer from "../components/WujieContainer";

type Route = {
  label?: string;
  icon?: ReactNode;
  path: string;
  element: ReactNode;
};

const PAGE_CONFIG_LIST = window.__PROJECT_CONFIG__.pageConfigList || [];

const COMPOSED_PAGE_LIST: Route[] = PAGE_CONFIG_LIST.map(
  (pageConfig: PageConfig) => {
    const { url, identifier, name } = pageConfig;
    return {
      label: name,
      path: `/${identifier}`,
      element: (
        <WujieContainer url={url} name={identifier} identifier={identifier} />
      ),
    };
  }
);

export const navRoutes: Route[] = [
  // {
  //   label: "项目管理",
  //   path: "/project-manage",
  //   icon: <ProjectOutlined />,
  //   element: <ProjectManager />,
  // },
  ...COMPOSED_PAGE_LIST,
];

export const otherRoutes: Route[] = [
  {
    label: ANY_MATCH_NAME,
    path: "*",
    element: <PageNotFound />,
  },
];

export const allRoutes: Route[] = [...navRoutes, ...otherRoutes];
