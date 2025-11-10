import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function Home() {
  const opciones = [
    { icon: "💳", texto: "Generar QR" },
    { icon: "📊", texto: "Consultar Puntos" },
    { icon: "🎁", texto: "Premios y Sorteos" },
    { icon: "📍", texto: "Nuestros Locales" },
    { icon: "👤", texto: "Mi Perfil" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-6 py-10 space-y-8"
      style={{
        backgroundColor: "#082129",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* LOGO */}
      <motion.img
        src={logo}
        alt="Vibbe Logo"
        className="w-32 h-32 mb-4 drop-shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* SALUDO */}
      <motion.h1
        className="text-3xl font-bold text-emerald-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ¡Hola, Usuario Demo!
      </motion.h1>

      {/* TARJETA DE PUNTOS */}
      <motion.div
        className="bg-white/10 rounded-3xl shadow-lg w-full max-w-sm p-6 border border-white/20 backdrop-blur-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-300 text-sm mb-1">Puntos disponibles</p>
        <h2 className="text-5xl font-extrabold text-emerald-400 mb-2">1250</h2>

        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-2 bg-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ duration: 1.2 }}
          />
        </div>

        <p className="text-gray-400 text-sm mt-1">Próximo nivel: 25%</p>
      </motion.div>

      {/* MENÚ PRINCIPAL VERTICAL */}
      <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
        {opciones.map((item, idx) => (
          <motion.button
            key={idx}
            className="bg-white/10 text-white font-semibold rounded-2xl py-3 flex items-center justify-between px-5 border border-white/20 hover:bg-emerald-400/20 hover:border-emerald-400/30 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              {item.texto}
            </span>
            <span className="text-emerald-400 text-lg">›</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

