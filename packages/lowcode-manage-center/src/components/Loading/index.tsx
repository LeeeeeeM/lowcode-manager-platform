import { useState, ReactNode, FC } from "react";
import { Spin, message } from "antd";
import { useAsyncEffect } from 'ahooks';
import Content from "../Content";

interface LoadingContentProps {
  children?: ReactNode;
  loadData?: Promise<unknown>;
}

const Loading: FC<LoadingContentProps> = (props) => {
  const { loadData, children } = props;
  const [loaded, setLoaded] = useState(true);

  useAsyncEffect(async () => {
    if (loadData) {
      try {
        await loadData;
      } catch {
        message.warning(`数据请求异常`)
      }
    }
    setLoaded(false);
  }, [loadData]);

  return (
    <>
      {loaded ? (
        <Content>
          <Spin />
        </Content>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
