// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// AUTH
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// DASHBOARD
import Home from "./components/Dashboard/Home";
import Points from "./components/Dashboard/Points";
import Rewards from "./components/Dashboard/Rewards";
import Locations from "./components/Dashboard/Locations";
import Profile from "./components/Dashboard/Profile";
import Qr from "./components/Dashboard/Qr";
import Game from "./components/Dashboard/Game";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/qr" element={<Qr />} />

        {/* App */}
        <Route path="/home" element={<Home />} />
        <Route path="/points" element={<Points />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />

        {/* 404 simple (redirige al login) */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
