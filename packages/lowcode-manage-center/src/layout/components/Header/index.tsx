import { FC, useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import cns from "classnames";
import { ANY_MATCH_NAME } from "/@/constants";
import { allRoutes } from "/@/router/routes";

export const Header: FC = () => {
  const loc = useLocation();

  const { pathname } = loc;

  const moduleTitle = useMemo(() => {
    const module = allRoutes.find((route) => {
      return matchPath(
        {
          path: route.path,
        },
        pathname
      );
    });

    if (module) {
      return module.label;
    }

    return ANY_MATCH_NAME;
  }, [pathname]);

  console.log(loc, moduleTitle);

  return (
    <>
      <header
        className={cns(
          "flex h-[50px] w-full items-center justify-between px-3",
        )}
      >
        <span className="font-700 text-[20px]">{moduleTitle}</span>
      </header>
    </>
  );
};
