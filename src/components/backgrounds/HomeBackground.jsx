import React from "react";
import { motion } from "framer-motion";

export default function HomeBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-[#02070a]">
      {/* Capa base de degradado oscuro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#022c22_0,transparent_45%),radial-gradient(circle_at_100%_100%,#1e293b_0,transparent_55%)]" />

      {/* Blob grande verde arriba izquierda */}
      <motion.div
        className="absolute -top-40 -left-32 w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.7), transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 25, -10, 0],
          y: [0, -15, 10, 0],
          opacity: [0.45, 0.75, 0.55, 0.45],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blob grande cyan arriba derecha */}
      <motion.div
        className="absolute -top-48 right-[-120px] w-[420px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.7), transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [0, -20, 15, 0],
          y: [0, -10, 5, 0],
          opacity: [0.35, 0.6, 0.45, 0.35],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blob grande amarillo abajo */}
      <motion.div
        className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,204,21,0.7), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.55, 0.4, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Banda ondulada principal (onda visible) */}
      <motion.div
        className="absolute bottom-[-40px] left-[-10%] w-[130%] h-[160px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.75), rgba(132,204,22,0.7), rgba(250,204,21,0.7))",
          filter: "blur(22px)",
          borderRadius: "60% 40% 0 0",
        }}
        animate={{
          y: [0, -25, -5, 0],
          x: [0, -30, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Segunda banda ondulada (capa inferior, cyan) */}
      <motion.div
        className="absolute bottom-[-70px] left-[-15%] w-[140%] h-[170px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.65), rgba(16,185,129,0.65))",
          filter: "blur(26px)",
          borderRadius: "55% 45% 0 0",
          opacity: 0.85,
        }}
        animate={{
          y: [10, -15, 0, 10],
          x: [0, 35, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tercera banda más fina (efecto ola extra) */}
      <motion.div
        className="absolute bottom-[10%] left-[-20%] w-[160%] h-[90px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,197,94,0.45), rgba(56,189,248,0.45))",
          filter: "blur(18px)",
          borderRadius: "50% 50% 50% 50%",
          opacity: 0.7,
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -10, 5, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Líneas de onda horizontales suaves */}
      <motion.div
        className="absolute inset-x-[-20%] top-[55%] h-[140px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient( to right, rgba(148,163,184,0.10) 0px, rgba(148,163,184,0.10) 2px, transparent 2px, transparent 8px )",
          opacity: 0.6,
        }}
        animate={{
          backgroundPositionX: ["0px", "120px", "0px"],
          opacity: [0.3, 0.7, 0.4, 0.3],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Pequeños brillos flotantes */}
      <motion.div
        className="absolute left-[12%] top-[40%] w-[120px] h-[120px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(52,211,153,0.6), transparent 65%)",
          filter: "blur(35px)",
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[15%] top-[55%] w-[100px] h-[100px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.6), transparent 65%)",
          filter: "blur(30px)",
        }}
        animate={{
          y: [10, -10, 10],
          opacity: [0.25, 0.55, 0.3],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
