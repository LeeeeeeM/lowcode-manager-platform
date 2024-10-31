import hostMap from "../../hostMap";
import WujieReact from "wujie-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function React16() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.replace("/react16-sub", "").replace("/react16", ""); ////

  if (path) {
    WujieReact.bus.$emit("react16-router-change", path);
  }
  
  const react16Url = hostMap("http://localhost:5174/");
  const props = {
    jump: (name: string) => {
      navigate(`/${name}`);
    },
  };
  return (
    // 单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由
    <WujieReact
      width="100%"
      height="100%"
      name="react16"
      url={react16Url}
      sync={!path}
      props={props}
    ></WujieReact>
  );
}
