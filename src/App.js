import { useState } from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";


export default function App() {
  const [screen, setScreen] = useState("login");

  // Función para cambiar de pantalla
  const goTo = (view) => setScreen(view);

  switch (screen) {
    case "login":
      return <Login onSwitch={() => goTo("register")} onLogin={() => goTo("dashboard")} />;
    case "register":
      return <Register onSwitch={() => goTo("login")} />;
    case "dashboard":
      return <Dashboard onLogout={() => goTo("login")} />;
    default:
      return <Login onSwitch={() => goTo("register")} onLogin={() => goTo("dashboard")} />;
  }
}
