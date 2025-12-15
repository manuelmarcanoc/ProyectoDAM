import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import HomeBackground from "../backgrounds/HomeBackground";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Datos reales del usuario
  const points = currentUser?.points || 0;
  const username = currentUser?.name || currentUser?.displayName || "Usuario";

  const totalPoints = 1250;
  const nextLevelPercent = Math.min(100, (points / totalPoints) * 100).toFixed(0);

  const opciones = [
    { icon: "💳", texto: "Generar QR", ruta: "/qr", color: "from-blue-400 to-cyan-300" },
    { icon: "📊", texto: "Historial", ruta: "/points", color: "from-emerald-400 to-lime-300" },
    { icon: "🎁", texto: "Premios", ruta: "/rewards", color: "from-purple-400 to-pink-300" },
    { icon: "🎮", texto: "Vibbe Run", ruta: "/game", color: "from-orange-400 to-yellow-300" },
    { icon: "📍", texto: "Locales", ruta: "/locations", color: "from-teal-400 to-emerald-300" },
    { icon: "👤", texto: "Mi Perfil", ruta: "/profile", color: "from-gray-400 to-slate-300" },
  ];

  // Efecto Tilt para la tarjeta


  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start px-5 py-6 relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <HomeBackground />

      {/* Header Compacto */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 z-10 pt-2">
        <div className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-12 h-12 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
          <div className="flex flex-col">
            <span className="text-xs text-emerald-200/80 uppercase tracking-wider">Bienvenido</span>
            <span className="font-bold text-white text-lg leading-none">{username}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-emerald-500/30 flex items-center justify-center">
          🔔
        </div>
      </div>

      {/* Tarjeta de Puntos Premium con Tilt 3D */}
      <div className="perspective-1000 w-full max-w-md z-10 mb-8">
        <motion.div
          className="relative w-full rounded-[2rem] bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-emerald-950/90 
            border border-white/10 shadow-[0_20px_50px_-12px_rgba(16,185,129,0.3)] backdrop-blur-xl overflow-hidden p-6"
        >
          {/* Brillo de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex justify-between items-center">
            <div>
              <p className="text-emerald-100/60 text-sm font-medium mb-1">Saldo Disponible</p>
              <motion.h2
                key={points}
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-white drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]"
              >
                {points}
              </motion.h2>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold uppercase tracking-wide">
                  Nivel Oro
                </span>
                <span className="text-xs text-slate-400">Prox: Diamante</span>
              </div>
            </div>

            {/* Gráfico circular minimalista */}
            <div className="relative w-24 h-24">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="50%" cy="50%" r="36" stroke="#1e293b" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="36"
                  stroke="url(#gradienteBarra)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 250" }}
                  animate={{ strokeDasharray: `${(250 * nextLevelPercent) / 100} 250` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
                <defs>
                  <linearGradient id="gradienteBarra" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#bef264" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-white">{nextLevelPercent}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid de Menú */}
      <motion.div
        className="grid grid-cols-2 gap-4 w-full max-w-md z-10 pb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {opciones.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => navigate(item.ruta)}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex flex-col items-start justify-between p-4 h-32 rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden hover:bg-slate-800/60 transition-colors"
          >
            {/* Gradiente sutil al hacer hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <span className="text-3xl bg-slate-950/50 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
              {item.icon}
            </span>

            <div className="w-full flex justify-between items-end">
              <span className="font-semibold text-slate-100 text-sm tracking-wide">{item.texto}</span>
              <span className="text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                →
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}