// src/components/Dashboard/Qr.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "../common/BackArrow";
import logo from "../../assets/logo.png";

export default function Qr() {
  const [text, setText] = useState("UsuarioDemo@vibbe.com");
  const [qrUrl, setQrUrl] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UsuarioDemo@vibbe.com"
  );
  const [version, setVersion] = useState(0);
  const [animWave, setAnimWave] = useState(false);

  const handleGenerate = () => {
    if (!text.trim()) {
      alert("Introduce un texto válido");
      return;
    }

    const newUrl =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(text) +
      "&_=" +
      Date.now();

    setQrUrl(newUrl);
    setVersion((v) => v + 1);

    setAnimWave(true);
    setTimeout(() => setAnimWave(false), 900);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "vibbe_qr.png";
    a.click();
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-10 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <BackArrow to="/home" />

      {/* Fondo premium */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#02080b] via-[#05171c] to-[#093036]" />

      {/* Neblina de color */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.16),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(250,204,21,0.15),transparent_60%)]" />

      <motion.img
        src={logo}
        alt="logo"
        className="w-24 h-24 mb-3 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      />

      <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-yellow-300 bg-clip-text text-transparent mb-3 text-center">
        Tu código QR Vibbe
      </h1>

      <p className="text-gray-300 text-center max-w-xs mb-6">
        Escanéalo en comercios para sumar puntos y activar beneficios.
      </p>

      {/* Tarjeta QR */}
      <motion.div
        className="relative bg-white/10 border border-white/20 p-7 rounded-3xl backdrop-blur-xl shadow-xl w-full max-w-md flex flex-col items-center"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Glow */}
        <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-emerald-400 to-yellow-300 opacity-20 blur-xl -z-10"></div>

        {/* Ondas de animación (NO encima del QR) */}
        {animWave && (
          <>
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-emerald-300/40"
              initial={{ scale: 0.85, opacity: 0.8 }}
              animate={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-yellow-300/40"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.25, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </>
        )}

        {/* QR */}
        <AnimatePresence mode="wait">
          <motion.img
            key={version}
            src={qrUrl}
            alt="QR"
            className="w-64 h-64 rounded-xl bg-white shadow-[0_0_22px_rgba(52,211,153,0.25)]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        {/* Input */}
        <input
          type="text"
          className="mt-6 w-full text-center p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-emerald-400 outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Botones */}
        <div className="flex gap-4 mt-5">
          <motion.button
            onClick={handleGenerate}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 shadow-lg"
          >
            Generar
          </motion.button>

          <motion.button
            onClick={handleDownload}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl font-semibold bg-emerald-600/40 border border-emerald-300/40 text-white"
          >
            Descargar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
