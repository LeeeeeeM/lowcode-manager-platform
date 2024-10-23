import { ConfigProvider } from "antd";

import { Router } from "/@/router";

import "/@/styles/global.css";

const App = () => {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
};

export default App;
