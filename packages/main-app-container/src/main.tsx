import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WujieReact from "wujie-react";
import credentialsFetch from "./utils/fetch";
import plugins from "./utils/plugin";
import lifecycles from "./utils/lifecycle";
import App from "./App.tsx";
// import './index.css'

const { setupApp } = WujieReact;

const PAGE_CONFIG_LIST = window.__PROJECT_CONFIG__.pageConfigList || [];

PAGE_CONFIG_LIST.forEach(
  (pageConfig: PageConfig) => {
    const { url, identifier } = pageConfig;
    setupApp({
      url,
      name: identifier,
      attrs: {
        // src: url, // 开发时记得关闭，防止浏览器跨域
      },
      fetch: credentialsFetch,
      plugins,
      ...lifecycles,
    });
  }
);

const root = document.getElementById("root")!;
createRoot(root).render(
  import.meta.env.VITE_DISABLE_STRICT ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);
