import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css"; // 🔹 Estilos globales (incluye Tailwind si lo usas)

// 🔹 Estilo global para toda la aplicación (color de fondo #082129)
document.body.style.backgroundColor = "#082129";
document.body.style.color = "white";
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.minHeight = "100vh";
document.body.style.overflowX = "hidden";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
