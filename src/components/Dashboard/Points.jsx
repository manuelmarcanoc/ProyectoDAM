import React from "react";
import { motion } from "framer-motion";

export default function Points() {
  const movimientos = [
    { id: 1, tipo: "ganado", cantidad: 300, descripcion: "Compra en Café Central", fecha: "02/11/2025" },
    { id: 2, tipo: "gastado", cantidad: 200, descripcion: "Rasca y gana", fecha: "02/11/2025" },
    { id: 3, tipo: "ganado", cantidad: 500, descripcion: "Ruleta: ¡Premio especial!", fecha: "01/11/2025" },
    { id: 4, tipo: "gastado", cantidad: 100, descripcion: "Canje en tienda", fecha: "30/10/2025" },
    { id: 5, tipo: "ganado", cantidad: 150, descripcion: "Promoción Vibbe", fecha: "28/10/2025" },
  ];

  const total = movimientos.reduce((acc, mov) => {
    return mov.tipo === "ganado" ? acc + mov.cantidad : acc - mov.cantidad;
  }, 0);

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-10"
      style={{ backgroundColor: "#082129", color: "white" }}
    >
      {/* Título */}
      <motion.h1
        className="text-3xl font-bold text-emerald-400 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Historial de puntos
      </motion.h1>

      {/* Tarjeta de balance */}
      <motion.div
        className="bg-white/10 w-full max-w-md rounded-3xl p-6 text-center shadow-lg mb-8 border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-300 text-sm">Tu balance actual</p>
        <h2 className="text-5xl font-extrabold text-emerald-400">{total} pts</h2>
      </motion.div>

      {/* Lista de movimientos */}
      <motion.div
        className="w-full max-w-md flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {movimientos.map((mov) => (
          <motion.div
            key={mov.id}
            className={`flex justify-between items-center p-4 rounded-2xl shadow-md border border-white/10 ${
              mov.tipo === "ganado"
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-red-500/10 text-red-300"
            }`}
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <p className="font-semibold text-white">{mov.descripcion}</p>
              <p className="text-sm text-gray-400">{mov.fecha}</p>
            </div>
            <span
              className={`text-lg font-bold ${
                mov.tipo === "ganado" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {mov.tipo === "ganado" ? "+" : "-"}
              {mov.cantidad}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
