import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import './index.css'

createRoot(document.getElementById("root")!).render(
  import.meta.env.VITE_DISABLE_STRICT ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);
