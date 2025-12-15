import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthBackground from "./AuthBackground"; // Fixed import path - assuming it's in the same folder or adjusted
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { registerWithEmail, loginWithGoogle } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirm: "",
    direccion: "",
    telefono: "",
    nacimiento: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("❌ Las contraseñas no coinciden");
      return;
    }

    if (captchaInput !== String(captcha)) {
      setError("❌ Captcha incorrecto");
      refreshCaptcha();
      return;
    }

    try {
      setLoading(true);
      // await registerWithEmail(email, password, userData)
      await registerWithEmail(form.email, form.password, form);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("❌ Este correo ya está registrado.");
      } else if (err.code === 'auth/weak-password') {
        setError("❌ La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("❌ Error al registrarse. Inténtalo de nuevo.");
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      setError("Error con Google.");
      console.error(err);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* We use ../../AuthBackground because checking file structure suggested it is in src/components/AuthBackground or similar path 
           Wait, previous error said: Error: Can't resolve '../AuthBackground' in 'C:\Users\Manuel\Documents\vibbe-app\src\components\Auth'
           And we fixed it in Login.jsx with "../../AuthBackground".
           Wait, Login.jsx is in src/components/Auth/Login.jsx
           AuthBackground.jsx is in src/AuthBackground.jsx ? NO.
           Let's look at list_dir output Step 249: "AuthBackground.jsx" is in src (root of src).
           So from src/components/Auth/Register.jsx, we need ../../AuthBackground.jsx 
        */}
      <AuthBackground />

      <div className="absolute w-[450px] h-[450px] bg-emerald-400/20 blur-[150px] top-[20%] left-[15%] rounded-full animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-yellow-300/15 blur-[120px] bottom-[15%] right-[20%] rounded-full animate-pulse" />

      <motion.form
        onSubmit={handleRegister}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-[90%] max-w-md shadow-2xl space-y-4 my-10 overflow-auto max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.img
            src={logo}
            alt="Vibbe Logo"
            className="w-20 h-20 mx-auto mb-2 drop-shadow-2xl rounded-2xl"
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
        </div>


        {error && <div className="bg-red-500/20 text-red-200 p-2 rounded text-center text-sm border border-red-500/30">{error}</div>}

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-3">
          <input
            name="nombre"
            type="text"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
            />
            <input
              name="confirm"
              type="password"
              placeholder="Confirmar"
              value={form.confirm}
              onChange={handleChange}
              required
              className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
            />
          </div>

          <input
            name="direccion"
            type="text"
            placeholder="Dirección (Opcional)"
            value={form.direccion}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 outline-none transition"
          />

          <div className="grid grid-cols-2 gap-3">
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
        </div>

        {/* CAPTCHA */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-4">
          <div className="text-xl font-bold text-emerald-300 tracking-widest bg-black/30 px-3 py-1 rounded select-none">
            {captcha}
          </div>

          <input
            type="text"
            placeholder="Copia el # aquí"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-500 text-center
                       border border-white/10 focus:border-emerald-400 outline-none transition"
          />

          <button
            type="button"
            onClick={refreshCaptcha}
            className="text-xl"
            title="Recargar Captcha"
          >
            🔄
          </button>
        </div>

        {/* Botón registrar */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-slate-900 bg-gradient-to-r 
                     from-emerald-400 via-lime-300 to-yellow-300 hover:opacity-90 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </motion.button>

        {/* Google */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900/0 backdrop-blur-sm px-2 text-slate-500">O también</span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleGoogleRegister}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 flex items-center justify-center gap-3 rounded-xl 
                     bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="Google logo"
          />
          Registrarse con Google
        </motion.button>

        <p className="text-center text-gray-400 text-sm pt-2">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-emerald-400 cursor-pointer hover:underline font-bold"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </p>
      </motion.form>
    </div>
  );
}
