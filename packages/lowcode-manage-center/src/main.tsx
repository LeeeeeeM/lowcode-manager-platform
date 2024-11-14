import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setUserName } from "common";
import App from "./App.tsx";
// import './index.css'

const render = () => {
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
};

if (window.__POWERED_BY_WUJIE__) {
  // @ts-expect-error window any
  window.$wujie?.bus.$on("get-user-info", (info: Record<string, string>) => {
    console.log(info);
    setUserName(info.name);
    render();
  });
  // @ts-expect-error window any
  window.$wujie?.bus.$emit("sub-loaded", "lowcode-center");
} else {
  render();
}
