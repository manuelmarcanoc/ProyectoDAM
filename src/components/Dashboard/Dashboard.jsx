// src/components/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import Home from "./Home";
import Points from "./Points";
import Rewards from "./Rewards";
import Locations from "./Locations";
import Profile from "./Profile";

export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("home");

  const renderTab = () => {
    switch (tab) {
      case "home":      return <Home />;
      case "points":    return <Points />;
      case "rewards":   return <Rewards />;
      case "locations": return <Locations />;
      case "profile":   return <Profile onLogout={onLogout} />;
      default:          return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col">
      <div className="flex-1">{renderTab()}</div>

      {/* bottom nav */}
      <nav className="bg-white/90 backdrop-blur border-t border-emerald-200 flex justify-around py-3">
        <button
          className={`text-sm font-semibold ${tab==="home"?"text-emerald-600":"text-gray-500"}`}
          onClick={() => setTab("home")}
        >
          Inicio
        </button>
        <button
          className={`text-sm font-semibold ${tab==="points"?"text-emerald-600":"text-gray-500"}`}
          onClick={() => setTab("points")}
        >
          Puntos
        </button>
        <button
          className={`text-sm font-semibold ${tab==="rewards"?"text-emerald-600":"text-gray-500"}`}
          onClick={() => setTab("rewards")}
        >
          Premios
        </button>
        <button
          className={`text-sm font-semibold ${tab==="locations"?"text-emerald-600":"text-gray-500"}`}
          onClick={() => setTab("locations")}
        >
          Locales
        </button>
        <button
          className={`text-sm font-semibold ${tab==="profile"?"text-emerald-600":"text-gray-500"}`}
          onClick={() => setTab("profile")}
        >
          Perfil
        </button>
      </nav>
    </div>
  );
}
