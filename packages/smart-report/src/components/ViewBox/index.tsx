import { FC, ReactNode } from "react";
import cns from "classnames";
import styles from "./index.module.less";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = (props) => {
  const { children } = props;
  return <div className={cns(styles["view-box"], "overflow-y-auto overflow-x-hidden px-3 mt-2", {
    'h-[calc(100vh_-_50px)]': !window.__POWERED_BY_WUJIE__
  })}>{children}</div>;
};

export default Content;
