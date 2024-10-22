import { FC, ReactNode } from "react";
import { HomeOutlined, RadarChartOutlined } from "@ant-design/icons";

type Route = {
  label: string;
  icon: ReactNode;
  path: string;
  element: Promise<FC>;
};

export const routes: Route[] = [
  {
    label: "Home",
    path: "/home",
    icon: <HomeOutlined />,
    element: import("../pages/Home").then(
      (Home) => Home.default
    ),
  },
  {
    label: "About",
    path: "/about",
    icon: <RadarChartOutlined />,
    element: import("../pages/About").then((About) => About.default),
  },
  {
    label: "Download",
    path: "/download",
    icon: <RadarChartOutlined />,
    element: import("../pages/Download").then((Download) => Download.default),
  },
  {
    label: "Product",
    path: "/product",
    icon: <RadarChartOutlined />,
    element: import("../pages/Product").then((Product) => Product.default),
  },
];
