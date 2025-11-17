import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const totalPoints = 1250;
  const nextLevelPercent = 25;

  // Animación del contador de puntos
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
      style={{
        background: "radial-gradient(circle at top, #022327 0%, #020617 55%)",
        color: "white",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Capa base de degradado suave */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_20%,rgba(45,212,191,0.15),transparent_60%),radial-gradient(circle_at_90%_80%,rgba(250,204,21,0.15),transparent_60%)]" />

      {/* Ondas neon animadas (fondo estilo Vibbe) */}
      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-10 w-[140%] h-64 -z-10"
        style={{
          borderRadius: "55% 45% 0 0",
          background:
            "linear-gradient(90deg, rgba(34,197,94,0.75), rgba(132,204,22,0.7), rgba(250,204,21,0.8))",
          filter: "blur(12px)",
        }}
        animate={{ x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-52 -right-20 w-[150%] h-64 -z-10 opacity-70"
        style={{
          borderRadius: "60% 40% 0 0",
          background:
            "linear-gradient(90deg, rgba(16,185,129,0.85), rgba(56,189,248,0.7))",
          filter: "blur(18px)",
        }}
        animate={{ x: [0, 35, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-64 left-1/2 -translate-x-1/2 w-[110%] h-60 -z-10 opacity-60"
        style={{
          borderRadius: "60% 40% 0 0",
          background:
            "linear-gradient(90deg, rgba(22,163,74,0.9), rgba(132,204,22,0.6))",
          filter: "blur(22px)",
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Vibbe Logo"
        className="w-24 h-24 sm:w-28 sm:h-28 mb-3 mt-2 drop-shadow-[0_0_28px_rgba(52,211,153,0.8)]"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Título / saludo */}
      <motion.h1
        className="text-2xl sm:text-3xl font-extrabold text-center tracking-wide bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        ¡Bienvenido, Usuario Demo!
      </motion.h1>

      {/* Tarjeta de puntos (diseño neon premium) */}
      <motion.div
        className="relative w-full max-w-md mt-6 sm:mt-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.55)] backdrop-blur-2xl px-6 py-5 sm:px-7 sm:py-6 overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Glow interno diagonal */}
        <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Bloque puntos */}
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
              <span className="font-semibold text-emerald-300">
                {totalPoints} pts
              </span>
            </span>
          </div>

          {/* Bloque progreso circular */}
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
                  animate={{
                    strokeDasharray: `${(260 * nextLevelPercent) / 100} 260`,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm sm:text-base font-semibold text-emerald-50">
                  {nextLevelPercent}%
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-slate-300">
              Próximo nivel
            </span>
          </div>
        </div>
      </motion.div>

      {/* Sección de “acciones rápidas” arriba del menú (opcional) */}
      <motion.div
        className="w-full max-w-md mt-3 grid grid-cols-2 gap-3 text-xs sm:text-sm"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="rounded-2xl bg-slate-900/60 border border-emerald-500/30 px-3 py-2 flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <div>
            <p className="font-semibold text-emerald-200">Vibbe Level</p>
            <p className="text-[0.7rem] text-slate-300">
              Te faltan {100 - nextLevelPercent}% para subir.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/30 px-3 py-2 flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <div>
            <p className="font-semibold text-cyan-200">Racha activa</p>
            <p className="text-[0.7rem] text-slate-300">
              Consigue puntos hoy y mantenla.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Menú principal mejorado */}
      <motion.div
        className="w-full max-w-md flex flex-col gap-3 mt-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {opciones.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => navigate(item.ruta)}
            className="group bg-slate-900/70 text-white font-medium rounded-2xl py-3.5 flex items-center justify-between px-5 border border-slate-700/70 hover:border-emerald-400/60 hover:bg-slate-900/90 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition"
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
