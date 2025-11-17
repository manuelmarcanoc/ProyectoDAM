import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground";

export default function Register() {
  const navigate = useNavigate();

  // 🔥 Eliminado "curso"
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirm: "",
    direccion: "",
    telefono: "",
    nacimiento: "",
  });

  // 🔐 CAPTCHA
  const [captcha, setCaptcha] = useState(Math.floor(Math.random() * 9000 + 1000));
  const [captchaInput, setCaptchaInput] = useState("");

  const refreshCaptcha = () => {
    setCaptcha(Math.floor(Math.random() * 9000 + 1000));
    setCaptchaInput("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    if (captchaInput !== String(captcha)) {
      alert("❌ Captcha incorrecto");
      refreshCaptcha();
      return;
    }

    console.log("✅ Datos registrados:", form);
    alert("🎉 Registro completado correctamente");
    navigate("/login");
  };

  // Google
  const handleGoogleRegister = () => {
    console.log("🟦 Registro con Google…");
    navigate("/home");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <AuthBackground />

      <div className="absolute w-[450px] h-[450px] bg-emerald-400/20 blur-[150px] top-[20%] left-[15%] rounded-full animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-yellow-300/15 blur-[120px] bottom-[15%] right-[20%] rounded-full animate-pulse" />

      <motion.form
        onSubmit={handleRegister}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-[90%] max-w-md shadow-2xl space-y-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src={logo}
          alt="Vibbe Logo"
          className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl rounded-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-emerald-400 to-yellow-300 bg-clip-text text-transparent">
          Crear cuenta
        </h2>

        <p className="text-gray-300 text-sm text-center mb-4">
          Únete al programa Vibbe 🎉
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            name="confirm"
            type="password"
            placeholder="Confirmar contraseña"
            value={form.confirm}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />

          <input
            name="direccion"
            type="text"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />

          <input
            name="telefono"
            type="tel"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />

          <input
            name="nacimiento"
            type="date"
            value={form.nacimiento}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
        </div>

        {/* CAPTCHA */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center mt-2">
          <p className="text-gray-300 text-sm mb-2">Escribe el número:</p>
          <div className="text-3xl font-bold text-emerald-300 tracking-widest">
            {captcha}
          </div>

          <input
            type="text"
            placeholder="Introduce el número"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full mt-3 p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
                       border border-white/20 focus:border-emerald-400 focus:ring-2 
                       focus:ring-emerald-400/50 outline-none transition"
          />

          <button
            type="button"
            onClick={refreshCaptcha}
            className="text-xs text-emerald-400 mt-2 underline hover:text-emerald-300"
          >
            Cambiar captcha
          </button>
        </div>

        {/* Botón registrar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 mt-4 rounded-xl font-semibold text-gray-900 bg-gradient-to-r 
                     from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition"
        >
          Registrarse
        </motion.button>

        {/* Google */}
        <motion.button
          onClick={handleGoogleRegister}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 flex items-center justify-center gap-3 rounded-xl 
                     bg-white text-gray-700 font-semibold shadow-md mt-2 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-6 h-6"
            alt="Google logo"
          />
          Registrarse con Google
        </motion.button>

        <p className="text-center text-gray-400 text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-emerald-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </p>
      </motion.form>
    </div>
  );
}
