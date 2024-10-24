import { FC, ReactNode } from "react";
import styles from "./index.module.less";

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = (props) => {
  const { children } = props;
  return <div className={styles["content-box"]}>{children}</div>;
};

export default Content;
