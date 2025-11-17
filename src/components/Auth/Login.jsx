import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("🔐 Login con:", { email, password });
    navigate("/home");
  };

  // ⭐ LOGIN CON GOOGLE
  const handleGoogleLogin = () => {
    console.log("🔵 Login con Google…");
    navigate("/home");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* 🌌 Fondo animado */}
      <AuthBackground />

      {/* Luces decorativas */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-400/20 blur-[150px] top-[25%] left-[15%] rounded-full animate-pulse" />
      <div className="absolute w-[350px] h-[350px] bg-yellow-300/15 blur-[130px] bottom-[20%] right-[15%] rounded-full animate-pulse" />

      {/* 🧾 Tarjeta principal */}
      <motion.form
        onSubmit={handleLogin}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-[90%] max-w-sm shadow-2xl space-y-5"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* LOGO */}
        <motion.img
          src={logo}
          alt="Vibbe Logo"
          className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-yellow-300 bg-clip-text text-transparent">
          Bienvenido
        </h2>
        <p className="text-gray-300 text-sm text-center mb-2">
          Accede a tu cuenta Vibbe
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
                       border border-white/20 focus:border-emerald-400 focus:ring-2 
                       focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
                       border border-white/20 focus:border-emerald-400 focus:ring-2 
                       focus:ring-emerald-400/50 outline-none transition"
          />
        </div>

        {/* Botón de acceso */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r 
                     from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition"
        >
          Iniciar sesión
        </motion.button>

        {/* ⭐ INICIO DE SESIÓN CON GOOGLE */}
        <motion.button
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 flex items-center justify-center gap-3 rounded-xl 
                     bg-white text-gray-700 font-semibold shadow-md mt-3 hover:bg-gray-50 transition"
        >
          {/* ICONO GOOGLE */}
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google logo"
          />
          Iniciar sesión con Google
        </motion.button>

        {/* Enlace a registro */}
        <p className="text-center text-gray-400 text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <span
            className="text-emerald-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Regístrate aquí
          </span>
        </p>
      </motion.form>
    </div>
  );
}
