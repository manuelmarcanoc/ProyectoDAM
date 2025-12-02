import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import BackArrow from "../common/BackArrow";

export default function Points() {
  const movimientos = [
    { id: 1, tipo: "ganado", cantidad: 300, descripcion: "Compra en Café Central", fecha: "Hoy, 14:30" },
    { id: 2, tipo: "gastado", cantidad: 200, descripcion: "Rasca y gana", fecha: "Ayer" },
    { id: 3, tipo: "ganado", cantidad: 500, descripcion: "Premio Ruleta", fecha: "01 Nov" },
    { id: 4, tipo: "gastado", cantidad: 100, descripcion: "Canje Tienda", fecha: "30 Oct" },
    { id: 5, tipo: "ganado", cantidad: 150, descripcion: "Promo Login", fecha: "28 Oct" },
  ];

  const total = 1250;
  
  // Contador animado
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  React.useEffect(() => { animate(count, total, { duration: 1, ease: "circOut" }); }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col">
      {/* Fondo ambiental */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-900/20 to-transparent" />
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-8 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
            <BackArrow to="/home" />
            <h1 className="text-2xl font-bold tracking-tight">Mi Billetera</h1>
        </div>

        {/* Tarjeta Principal */}
        <motion.div 
            className="w-full p-6 rounded-[2rem] bg-gradient-to-r from-emerald-900/60 to-slate-900/60 border border-emerald-500/20 backdrop-blur-md shadow-2xl mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            <span className="text-emerald-200/70 text-sm font-medium uppercase tracking-wider">Saldo Total</span>
            <div className="flex items-baseline gap-1 mt-1">
                <motion.span className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                    {rounded}
                </motion.span>
                <span className="text-xl text-emerald-400 font-bold">PTS</span>
            </div>
            {/* Barra Visual */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-lime-300"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>Nivel Actual</span>
                <span>Próximo Nivel (1500)</span>
            </div>
        </motion.div>

        {/* Lista de Movimientos */}
        <div className="flex-1 overflow-y-auto pb-10 no-scrollbar">
            <h3 className="text-lg font-bold mb-4 text-slate-200">Actividad Reciente</h3>
            <div className="flex flex-col gap-3">
                {movimientos.map((mov, i) => (
                    <motion.div
                        key={mov.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                                mov.tipo === "ganado" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                            }`}>
                                {mov.tipo === "ganado" ? "↓" : "↑"}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-100">{mov.descripcion}</p>
                                <p className="text-xs text-slate-500">{mov.fecha}</p>
                            </div>
                        </div>
                        <span className={`font-bold text-lg ${
                            mov.tipo === "ganado" ? "text-emerald-300" : "text-slate-400"
                        }`}>
                            {mov.tipo === "ganado" ? "+" : "-"}{mov.cantidad}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}