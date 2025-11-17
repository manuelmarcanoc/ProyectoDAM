import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeBackground from "../backgrounds/HomeBackground"; // ⬅️ mismo fondo que Home

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("Manuel");
  const [email, setEmail] = useState("manuel@vibbe.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("Datos actualizados correctamente ✔");
  };

  const handleLogout = () => {
    navigate("/login"); // ⬅️ volver al Login
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-6 overflow-hidden bg-[#02070a]">

      {/* ⭐ Fondo animado igual al Home */}
      <HomeBackground />

      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl 
                   border border-white/20 rounded-3xl p-7 shadow-[0_0_30px_rgba(16,185,129,0.4)] mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* TÍTULO */}
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 
                     bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                     bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Mi Perfil
        </motion.h2>

        {/* INPUT: USUARIO */}
        <label className="block text-sm text-gray-200 mb-1">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                     border border-white/20 focus:border-emerald-400 
                     outline-none transition mb-4"
        />

        {/* INPUT: EMAIL */}
        <label className="block text-sm text-gray-200 mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                     border border-white/20 focus:border-emerald-400 
                     outline-none transition mb-4"
        />

        {/* INPUT: CONTRASEÑA */}
        <label className="block text-sm text-gray-200 mb-1">Nueva contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                     border border-white/20 focus:border-emerald-400 
                     outline-none transition mb-6"
        />

        {/* BOTÓN GUARDAR */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3 rounded-xl font-semibold text-gray-900
                     bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                     shadow-[0_0_15px_rgba(52,211,153,0.5)] mb-4"
        >
          Guardar cambios
        </motion.button>

        {/* BOTÓN CERRAR SESIÓN */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3 rounded-xl bg-red-500/80 hover:bg-red-500 
                     text-white font-semibold shadow-md transition"
        >
          Cerrar sesión
        </motion.button>
      </motion.div>
    </div>
  );
}
