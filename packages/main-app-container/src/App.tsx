import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Router } from "/@/router";

import "/@/styles/global.css";

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  );
};

export default App;
