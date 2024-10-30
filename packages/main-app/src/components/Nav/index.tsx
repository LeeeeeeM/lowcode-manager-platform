import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import WujieReact from "wujie-react";
import { Button } from "antd";
import { UnorderedListOutlined, CaretUpOutlined } from "@ant-design/icons";

const { bus } = WujieReact;

const subMap = {
  react16: [
    "project-manage",
    "user-manage",
    "component-manage",
    "page-manage",
    "download",
  ],
  react17: ["home", "dialog", "location", "communication", "state"],
};

export function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [react16Flag, setReact16Flag] = useState(
    location.pathname.includes("react16-sub")
  );

  // 在 xxx-sub 路由下子应用将激活路由同步给主应用，主应用跳转对应路由高亮菜单栏
  bus.$on("sub-route-change", (name: string, path: string) => {
    const mainName = `${name}-sub`;
    const mainPath = `/${name}-sub${path}`;
    // console.log(mainName, mainPath, location.pathname)
    const currentPath = window.location.hash.replace("#", "");
    if (currentPath.includes(mainName) && currentPath !== mainPath) {
      navigate(mainPath);
    }
  });

  const handleFlag = (name: string) => {
    switch (name) {
      case "react16":
        setReact16Flag(!react16Flag);
        break;
      default:
        break;
    }
  };
  return (
    <nav>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        介绍
      </NavLink>
      <NavLink
        to="/react16"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        react16
        <CaretUpOutlined
          className={react16Flag ? "main-icon active" : "main-icon"}
          onClick={() => handleFlag("react16")}
        />
      </NavLink>
      <div
        className="sub-menu"
        style={{ display: react16Flag ? "block" : "none" }}
      >
        {subMap.react16.map((item) => (
          <NavLink
            to={`/react16-sub/${item}`}
            key={item}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            {item}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
