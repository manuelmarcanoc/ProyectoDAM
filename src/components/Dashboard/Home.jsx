import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const totalPoints = 1250;
  const nextLevelPercent = 25;

  // Efecto contador
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

  // Opciones del menú
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
      className="min-h-screen flex flex-col items-center justify-start px-6 py-10 space-y-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #04161a 0%, #082129 60%, #0c2f36 100%)",
        color: "white",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fondo dinámico sutil */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(52, 211, 153, 0.1), transparent 60%), radial-gradient(circle at 80% 70%, rgba(250, 204, 21, 0.1), transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* LOGO */}
      <motion.img
        src={logo}
        alt="Vibbe Logo"
        className="w-28 h-28 mb-4 drop-shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* SALUDO */}
      <motion.h1
        className="text-3xl font-extrabold text-emerald-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ¡Hola, Usuario Demo!
      </motion.h1>

      {/* TARJETA DE PUNTOS */}
      <motion.div
        className="bg-white/10 rounded-3xl shadow-lg w-full max-w-sm p-6 border border-white/20 backdrop-blur-xl relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Efecto brillo animado */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/10 to-yellow-300/5 opacity-30"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <p className="text-gray-300 text-sm mb-1 relative z-10">
          Puntos disponibles
        </p>
        <motion.h2
          key={points}
          className="text-5xl font-extrabold text-emerald-400 mb-3 relative z-10"
          initial={{ opacity: 0.4, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {points}
        </motion.h2>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative z-10 mb-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-emerald-400 to-yellow-300 rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${nextLevelPercent}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>

        <p className="text-gray-400 text-sm mt-1 relative z-10">
          Próximo nivel: {nextLevelPercent}%
        </p>
      </motion.div>

      {/* MENÚ PRINCIPAL */}
      <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
        {opciones.map((item, idx) => (
          <motion.button
            key={idx}
            onClick={() => navigate(item.ruta)}
            className="bg-white/10 text-white font-semibold rounded-2xl py-3 flex items-center justify-between px-5 border border-white/20 hover:bg-emerald-400/20 hover:border-emerald-400/30 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3 text-lg">
              <span className="text-xl">{item.icon}</span>
              {item.texto}
            </span>
            <span className="text-emerald-400 text-lg">›</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

