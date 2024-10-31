import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import { BodyLayout } from "/@/layout";
import { allRoutes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    // lazy: () =>
    //   import("/@/layout").then(({ BodyLayout }) => ({ Component: BodyLayout })),
    element: <BodyLayout />,
    children: allRoutes.map((route) => ({
      path: route.path,
      element: route.element
    })),
  },
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
