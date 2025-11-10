import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #05161b 0%, #082129 60%, #0c2f36 100%)",
        color: "white",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(57, 253, 139, 0.15), transparent 60%), radial-gradient(circle at 70% 80%, rgba(241, 196, 15, 0.1), transparent 70%)",
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
        className="w-28 h-28 mb-6 z-10 drop-shadow-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* FORMULARIO */}
      <motion.form
        onSubmit={handleLogin}
        className="z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-[90%] max-w-sm shadow-2xl space-y-5"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-yellow-300 bg-clip-text text-transparent">
          Bienvenido
        </h2>
        <p className="text-gray-300 text-sm text-center mb-2">
          Accede a tu cuenta Vibbe
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
                       border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
                       border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r 
                     from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition"
        >
          Iniciar sesión
        </motion.button>

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
    </motion.div>
  );
}
