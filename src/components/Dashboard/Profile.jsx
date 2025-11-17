import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeBackground from "../backgrounds/HomeBackground";

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("Manuel");
  const [email, setEmail] = useState("manuel@vibbe.com");
  const [password, setPassword] = useState("");

  // Datos ficticios de usuario
  const level = 12;
  const xp = 340;
  const xpNeeded = 500;
  const xpPercent = (xp / xpNeeded) * 100;

  const badges = [
    { name: "Usuario activo", icon: "🔥" },
    { name: "5 locales visitados", icon: "📍" },
    { name: "Primer premio ganado", icon: "🎁" },
  ];

  const handleSave = () => {
    alert("Datos actualizados correctamente ✔");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-6 overflow-hidden bg-[#02070a]">
      <HomeBackground />

      {/* Tarjeta principal */}
      <motion.div
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl 
                   border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(16,185,129,0.35)]"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        {/* Avatar */}
        <motion.div
          className="w-full flex flex-col items-center mb-8"
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
        >
          <div className="relative w-32 h-32 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-xl overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.3),transparent)] animate-pulse"></div>

            <span className="text-5xl relative z-10">👤</span>

            <button
              className="absolute bottom-1 right-1 bg-emerald-400 text-black text-xs px-2 py-1 rounded-full shadow-md hover:bg-emerald-300 transition z-20"
              onClick={() => alert("🖼 Próximamente: cambiar foto")}
            >
              Editar
            </button>
          </div>

          <p className="text-slate-300 text-sm mt-3">Miembro desde 2024</p>
        </motion.div>

        {/* Nivel de usuario */}
        <div className="mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
          <p className="text-sm text-slate-300">Nivel actual</p>
          <p className="text-2xl font-bold text-emerald-300">Nivel {level}</p>

          <div className="w-full h-3 bg-white/10 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-lime-300"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          <p className="text-xs text-slate-400 mt-1">
            {xp} / {xpNeeded} XP
          </p>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-emerald-300 mb-2">Logros</h3>

          <div className="flex gap-3 flex-wrap">
            {badges.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2 rounded-xl text-sm shadow-sm"
                whileHover={{ scale: 1.06 }}
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-slate-200">{b.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FORMULARIO */}
        <motion.h2
          className="text-2xl font-extrabold mb-4 
                     bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                     bg-clip-text text-transparent"
        >
          Datos personales
        </motion.h2>

        {/* Usuario */}
        <label className="block text-sm text-gray-200 mb-1">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                     border border-white/20 focus:border-emerald-400 
                     outline-none transition mb-4"
        />

        {/* Email */}
        <label className="block text-sm text-gray-200 mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                     border border-white/20 focus:border-emerald-400 
                     outline-none transition mb-4"
        />

        {/* Password */}
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

        {/* GUARDAR */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-3 rounded-xl font-semibold text-gray-900
                     bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                     shadow-[0_0_20px_rgba(52,211,153,0.5)] mb-4"
        >
          Guardar cambios
        </motion.button>

        {/* LOGOUT */}
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
