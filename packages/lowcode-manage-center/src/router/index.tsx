import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import { allRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () =>
      import("/@/layout").then(({ BodyLayout }) => ({ Component: BodyLayout })),
    children: allRoutes.map((route) => ({
      path: route.path,
      lazy: () => route.lazy().then((Component) => ({ Component })),
      loader: route.loader
    })),
  }
]);

export const Router = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <Spin
          className="absolute left-2/4 top-2/4 translate-x-[-50%,-50%]"
          spinning
        />
      }
    />
  );
};
