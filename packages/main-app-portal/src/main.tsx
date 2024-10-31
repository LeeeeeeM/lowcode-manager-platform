// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import WujieReact from "wujie-react";
import hostMap from "./hostMap";
import credentialsFetch from "./utils/fetch";
import plugins from "./utils/plugin";
import lifecycles from "./utils/lifecycle";

// const { setupApp, preloadApp, bus } = WujieReact;
const { setupApp } = WujieReact;
const isProduction = process.env.NODE_ENV === "production";
const attrs = isProduction ? { src: hostMap("//localhost:5173/") } : {};

const degrade = window.localStorage.getItem("degrade") === "true" || !window.Proxy || !window.CustomElementRegistry;

setupApp({
  name: "react16",
  url: hostMap("//localhost:5174/"),
  attrs,
  alive: true,
  exec: true,
  // @ts-expect-error type any
  fetch: credentialsFetch,
  plugins,
  prefix: { "prefix-dialog": "/dialog", "prefix-location": "/location" },
  degrade,
  ...lifecycles,
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
