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

import { AuthProvider, useAuth } from "./context/AuthContext";

// Componente para proteger rutas
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* App Protegida */}
          <Route path="/qr" element={<PrivateRoute><Qr /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/points" element={<PrivateRoute><Points /></PrivateRoute>} />
          <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
          <Route path="/locations" element={<PrivateRoute><Locations /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />

          {/* 404 simple (redirige al login) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
