import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import Home from "./Pages/Home";
import React16 from "./Pages/React16";

function App() {
  const [active, setActive] = useState(false);

  const changeActive = (v: boolean) => {
    setActive(v);
  };

  return (
    <div className="app">
      <Router>
        <div className={active ? "nav active" : "nav"}>
          <Nav />
        </div>
        <div className="content" onClick={() => setActive(false)}>
          <Routes>
            <Route path="/home" element={<Home changeActive={changeActive} />} />
            <Route path="/react16" element={<React16 />} />
            <Route path="/react16-sub/:path" element={<React16 />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
