import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootNode = document.getElementById("root");

if (!rootNode) throw new Error("Failed to load rootNode");

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
