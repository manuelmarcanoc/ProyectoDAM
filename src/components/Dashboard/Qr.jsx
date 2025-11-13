// src/components/Dashboard/Qr.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import BackArrow from "../common/BackArrow"; // 👈 IMPORTA LA FLECHA

export default function Qr() {
  const [text, setText] = useState("UsuarioDemo@vibbe.com");
  const [qrUrl, setQrUrl] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UsuarioDemo@vibbe.com"
  );
  const [version, setVersion] = useState(0);

  const handleGenerate = () => {
    if (!text.trim()) {
      alert("Introduce un texto o ID para generar el QR.");
      return;
    }
    // Forzamos URL única para refrescar imagen + animación
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      text
    )}&_=${Date.now()}`;
    setQrUrl(url);
    setVersion((v) => v + 1);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "vibbe_qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #04161a 0%, #082129 60%, #0c2f36 100%)",
        color: "white",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Flecha arriba-izquierda */}
      <BackArrow to="/home" />

      {/* Fondo animado sutil */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(52,211,153,.12), transparent 60%), radial-gradient(circle at 80% 80%, rgba(250,204,21,.1), transparent 60%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Logo */}
      <motion.img
        src={logo}
        alt="Vibbe"
        className="w-24 h-24 mb-3 z-10 drop-shadow-2xl"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <h1 className="text-3xl font-bold text-emerald-400 mb-2 z-10">
        Tu código QR Vibbe
      </h1>
      <p className="text-gray-300 text-center text-sm mb-6 z-10">
        Escanéalo para sumar puntos o acceder a promociones 🎁
      </p>

      {/* Tarjeta QR */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Luz sutil */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: "linear-gradient(145deg, rgba(52,211,153,.08), rgba(250,204,21,.08))" }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Imagen QR con animación al regenerar */}
        <AnimatePresence mode="wait">
          <motion.img
            key={version}
            src={qrUrl}
            alt="Código QR"
            className="w-56 h-56 mb-5 rounded-2xl border border-emerald-400/40 shadow-[0_0_24px_rgba(52,211,153,0.35)] bg-white"
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Introduce tu ID o texto..."
          className="w-full text-center p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 outline-none transition mb-4"
        />

        {/* Botones */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            className="px-5 py-2 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition"
          >
            Generar QR
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl font-semibold text-white bg-emerald-500/30 border border-emerald-400/40 hover:bg-emerald-400/50 transition"
          >
            Descargar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
