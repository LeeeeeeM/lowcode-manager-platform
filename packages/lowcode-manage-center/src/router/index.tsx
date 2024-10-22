// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider, createHashRouter, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import { allRoutes, otherRoutes, routes } from "./routes";

console.log(routes, otherRoutes)

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () =>
      import("/@/layout").then(({ BodyLayout }) => ({ Component: BodyLayout })),
    children: allRoutes.map((route) => ({
      path: route.path,
      lazy: () => route.lazy().then((Component) => ({ Component })),
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
