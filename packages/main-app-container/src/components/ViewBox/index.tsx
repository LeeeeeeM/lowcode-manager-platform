import { FC, ReactNode } from "react";
import cns from "classnames";
import styles from "./index.module.less";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = (props) => {
  const { children } = props;
  return <div className={cns(styles["view-box"], "h-[calc(100vh_-_50px)] overflow-y-auto overflow-x-hidden px-3 mt-2")}>{children}</div>;
};

export default Content;
