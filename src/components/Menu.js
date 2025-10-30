import React, { useState } from "react";
import Points from "./Points";
import Rewards from "./Rewards";
import Profile from "./Profile";

export default function Menu({ onLogout }) {
  const [screen, setScreen] = useState("points");

  return (
    <div className="menu">
      <nav>
        <button onClick={() => setScreen("points")}>Mis Puntos</button>
        <button onClick={() => setScreen("rewards")}>Recompensas</button>
        <button onClick={() => setScreen("profile")}>Perfil</button>
      </nav>

      {screen === "points" && <Points />}
      {screen === "rewards" && <Rewards />}
      {screen === "profile" && <Profile />}

      <button className="logout" onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}
