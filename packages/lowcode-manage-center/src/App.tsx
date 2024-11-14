import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Router } from "/@/router";

import "/@/styles/global.css";

const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Layout: {
            siderBg: "#1890ff",
            triggerBg: "#1890ff",
            bodyBg: '#ffffff'
          },
          Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "#ffffff",
            darkItemColor: "#ffffff",
            darkItemSelectedColor: "#000000",
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
};

export default App;
