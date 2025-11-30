import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import BackArrow from "../common/BackArrow";

export default function Points() {
  const movimientos = [
    { id: 1, tipo: "ganado", cantidad: 300, descripcion: "Compra en Café Central", fecha: "02/11/2025" },
    { id: 2, tipo: "gastado", cantidad: 200, descripcion: "Rasca y gana", fecha: "02/11/2025" },
    { id: 3, tipo: "ganado", cantidad: 500, descripcion: "Ruleta: ¡Premio especial!", fecha: "01/11/2025" },
    { id: 4, tipo: "gastado", cantidad: 100, descripcion: "Canje en tienda", fecha: "30/10/2025" },
    { id: 5, tipo: "ganado", cantidad: 150, descripcion: "Promoción Vibbe", fecha: "28/10/2025" },
  ];

  const total = movimientos.reduce(
    (acc, mov) => (mov.tipo === "ganado" ? acc + mov.cantidad : acc - mov.cantidad),
    0
  );

  const totalGanado = movimientos
    .filter((m) => m.tipo === "ganado")
    .reduce((acc, m) => acc + m.cantidad, 0);

  const totalGastado = movimientos
    .filter((m) => m.tipo === "gastado")
    .reduce((acc, m) => acc + m.cantidad, 0);

  // ======= contador animado del total =======
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  React.useEffect(() => {
    const controls = animate(count, total, {
      duration: 0.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [total]);

  const ganadoPercent =
    totalGanado + totalGastado === 0
      ? 0
      : (totalGanado / (totalGanado + totalGastado)) * 100;

  const gastadoPercent =
    totalGanado + totalGastado === 0
      ? 0
      : (totalGastado / (totalGanado + totalGastado)) * 100;

  return (
    <div
      className="relative min-h-screen px-6 py-8 flex flex-col items-center overflow-hidden"
      style={{ backgroundColor: "#020617", color: "white" }}
    >
      {/* Fondo sutil con gradiente (mucho menos brillo) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_55%),radial-gradient(circle_at_bottom,rgba(21,94,49,0.35),transparent_60%)]" />
      </div>

      {/* Pequeños puntos flotando, muy suaves */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1 + Math.random() * 0.5,
              scale: 0.5 + Math.random() * 0.7,
            }}
            animate={{
              y: ["0%", "-12%", "0%"],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Back */}
      <div className="z-10 self-start mb-3">
        <BackArrow to="/home" />
      </div>

      {/* Título */}
      <motion.h1
        className="z-10 text-3xl sm:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Historial de puntos
      </motion.h1>

      {/* Tarjeta de balance + mini gráfico */}
      <motion.div
        className="z-10 w-full max-w-md rounded-3xl bg-emerald-900/40 border border-emerald-500/40 backdrop-blur-xl px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
        initial={{ y: 20, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-emerald-100/80">Tu saldo actual</p>

        <div className="flex items-end justify-between mt-1 gap-3">
          <motion.div
            className="flex items-baseline gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.span className="text-4xl sm:text-5xl font-extrabold text-emerald-300">
              {rounded}
            </motion.span>
            <span className="text-sm text-emerald-200/80">pts</span>
          </motion.div>

          {/* Chip suave */}
          <motion.div
            className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-[0.7rem] text-emerald-200 flex items-center gap-1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Activo
          </motion.div>
        </div>

        {/* Gráfico ligero ganados/gastados */}
        <div className="mt-4">
          <div className="flex justify-between text-[0.7rem] text-emerald-100/80 mb-1">
            <span>Ganados: {totalGanado} pts</span>
            <span>Gastados: {totalGastado} pts</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-emerald-950/70 overflow-hidden flex">
            <motion.div
              className="h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${ganadoPercent}%` }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            <motion.div
              className="h-full bg-emerald-800"
              initial={{ width: 0 }}
              animate={{ width: `${gastadoPercent}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Lista de movimientos con animación */}
      <motion.div
        className="z-10 w-full max-w-md mt-8 flex flex-col gap-3 pb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        {movimientos.map((mov, index) => (
          <motion.div
            key={mov.id}
            className={`relative flex justify-between items-center px-4 py-3 rounded-2xl border backdrop-blur-lg ${
              mov.tipo === "ganado"
                ? "border-emerald-500/40 bg-emerald-900/40"
                : "border-emerald-800/40 bg-emerald-950/50"
            }`}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.15 + index * 0.05,
              type: "spring",
              stiffness: 220,
              damping: 18,
            }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            {/* línea lateral sutil */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-r-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background:
                  mov.tipo === "ganado"
                    ? "linear-gradient(to bottom, #4ade80, #22c55e)"
                    : "linear-gradient(to bottom, #475569, #22c55e33)",
              }}
            />

            <div className="ml-3">
              <p className="text-sm font-semibold text-emerald-50">
                {mov.descripcion}
              </p>
              <p className="text-[0.7rem] text-emerald-100/70">{mov.fecha}</p>
            </div>

            <motion.span
              className={`text-base sm:text-lg font-bold ${
                mov.tipo === "ganado" ? "text-emerald-300" : "text-emerald-500/80"
              }`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 + index * 0.1 }}
            >
              {mov.tipo === "ganado" ? "+" : "-"}
              {mov.cantidad}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
