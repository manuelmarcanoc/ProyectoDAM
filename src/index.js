// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";       // <- tu CSS global (Tailwind, etc.)
import App from "./App.jsx";       // <- usamos el App.jsx que acabamos de crear

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
