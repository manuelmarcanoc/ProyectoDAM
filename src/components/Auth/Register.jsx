import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground"; // ✅ fondo animado reutilizable

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirm: "",
    direccion: "",
    telefono: "",
    curso: "",
    nacimiento: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("✅ Datos de registro enviados:", form);
    alert("Registro completado correctamente");
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* 🌌 Fondo dinámico de partículas + parallax */}
      <AuthBackground />

      {/* 💡 Luces decorativas suaves */}
      <div className="absolute w-[450px] h-[450px] bg-emerald-400/20 blur-[150px] top-[20%] left-[15%] rounded-full animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-yellow-300/15 blur-[120px] bottom-[15%] right-[20%] rounded-full animate-pulse" />

      {/* 🧾 FORMULARIO */}
      <motion.form
        onSubmit={handleRegister}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-[90%] max-w-md shadow-2xl space-y-4"
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
          Crear cuenta
        </h2>
        <p className="text-gray-300 text-sm text-center mb-4">
          Únete al programa Vibbe y empieza a ganar recompensas 🎉
        </p>

        {/* GRID DE INPUTS */}
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
            name="curso"
            type="text"
            placeholder="Curso (Ej: 2º ESO)"
            value={form.curso}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            name="nacimiento"
            type="date"
            value={form.nacimiento}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
        </div>

        {/* BOTÓN REGISTRO */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 mt-4 rounded-xl font-semibold text-gray-900 bg-gradient-to-r 
                     from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition"
        >
          Registrarse
        </motion.button>

        {/* ENLACE LOGIN */}
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
