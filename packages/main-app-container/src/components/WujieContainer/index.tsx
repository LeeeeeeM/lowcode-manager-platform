import WujieReact from "wujie-react";
import { FC } from "react";

interface WujieContainerProps {
  url: string,
  identifier: string,
  name: string,
}

const WujieContainer: FC<WujieContainerProps> = (containerProps) => {
  const { url, identifier, name } = containerProps;

  const props = {
    log() {
      console.log(name);
    }
  };
  return (
    // 单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由
    <WujieReact
      width="100%"
      height="100%"
      name={identifier}
      url={url}
      props={props}
    ></WujieReact>
  );
}


export default WujieContainer;