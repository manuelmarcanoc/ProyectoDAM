import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// ⭐ Fondo dinámico estilo Login
import HomeBackground from "../backgrounds/HomeBackground";

export default function Home() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);

  const totalPoints = 1250;
  const nextLevelPercent = 25;

  // Animación contador
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      if (current >= totalPoints) {
        setPoints(totalPoints);
        clearInterval(interval);
      } else {
        setPoints(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const opciones = [
    { icon: "💳", texto: "Generar QR", ruta: "/qr" },
    { icon: "📊", texto: "Consultar Puntos", ruta: "/points" },
    { icon: "🎁", texto: "Premios y Sorteos", ruta: "/rewards" },
    { icon: "🎮", texto: "Vibbe Run", ruta: "/game" },
    { icon: "📍", texto: "Nuestros Locales", ruta: "/locations" },
    { icon: "👤", texto: "Mi Perfil", ruta: "/profile" },
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start px-6 sm:px-8 py-8 sm:py-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ⭐ Fondo dinámico vibbe neon */}
      <HomeBackground />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Vibbe Logo"
        className="w-24 h-24 sm:w-28 sm:h-28 mb-3 mt-2 drop-shadow-[0_0_28px_rgba(52,211,153,0.8)] relative z-10"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Título */}
      <motion.h1
        className="relative z-10 text-2xl sm:text-3xl font-extrabold text-center tracking-wide 
        bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500 
        bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        ¡Bienvenido, Usuario Demo!
      </motion.h1>

      {/* Tarjeta de puntos */}
      <motion.div
        className="relative w-full max-w-md mt-6 sm:mt-8 rounded-3xl 
        bg-slate-900/60 border border-emerald-500/30 
        shadow-[0_0_40px_rgba(16,185,129,0.55)] backdrop-blur-2xl px-6 py-5 
        sm:px-7 sm:py-6 overflow-hidden z-10"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow interno */}
        <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Puntos */}
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-emerald-100/80 mb-1 tracking-wide uppercase">
              Puntos disponibles
            </span>

            <motion.span
              key={points}
              className="text-5xl sm:text-6xl font-extrabold text-emerald-300 leading-none drop-shadow-[0_0_25px_rgba(45,212,191,0.8)]"
              initial={{ opacity: 0.3, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {points}
            </motion.span>

            <span className="mt-2 text-xs text-slate-300/90">
              Total acumulado:{" "}
              <span className="font-semibold text-emerald-300">{totalPoints} pts</span>
            </span>
          </div>

          {/* Progreso circular */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="50%"
                  cy="50%"
                  r="38"
                  stroke="rgba(15,23,42,0.9)"
                  strokeWidth="9"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="38"
                  stroke="rgba(15,118,110,0.9)"
                  strokeWidth="9"
                  fill="none"
                  strokeDasharray="6 12"
                  strokeLinecap="round"
                />

                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#a3e635" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                </defs>

                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="38"
                  stroke="url(#progressGrad)"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 260" }}
                  animate={{ strokeDasharray: `${(260 * nextLevelPercent) / 100} 260` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm sm:text-base font-semibold text-emerald-50">
                  {nextLevelPercent}%
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-slate-300">Próximo nivel</span>
          </div>
        </div>
      </motion.div>

      {/* Menú */}
      <motion.div
        className="w-full max-w-md flex flex-col gap-3 mt-6 mb-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {opciones.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => navigate(item.ruta)}
            className="group bg-slate-900/70 text-white font-medium rounded-2xl py-3.5 
              flex items-center justify-between px-5 border border-slate-700/70 
              hover:border-emerald-400/60 hover:bg-slate-900/90 
              shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="flex items-center gap-3 text-base sm:text-lg">
              <span className="text-2xl drop-shadow-[0_0_10px_rgba(148,163,184,0.8)]">
                {item.icon}
              </span>
              {item.texto}
            </span>
            <span className="text-emerald-400 text-2xl group-hover:translate-x-1 transition-transform">
              ›
            </span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
