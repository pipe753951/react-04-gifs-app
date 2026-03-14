import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { CounterApp } from "./counter/components/CounterApp";
import { GifsApp } from "./GifsApp";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GifsApp />
    {/* <CounterApp /> */}
  </StrictMode>,
);
