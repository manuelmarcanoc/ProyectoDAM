import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthBackground from "../../AuthBackground";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
      console.error(err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await loginWithEmail(email, password);
      navigate("/home");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <AuthBackground />

      <motion.div
        className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <motion.img
            src={logo}
            className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            alt="Logo"
          />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
            Vibbe
          </h1>
          <p className="text-slate-400 text-sm">Bienvenido de nuevo</p>
        </div>

        {error && <p className="text-red-400 text-sm text-center mb-4 bg-red-500/10 p-2 rounded">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500">O continúa con</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          ¿No tienes cuenta? {" "}
          <span
            className="text-emerald-400 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Regístrate
          </span>
        </p>
      </motion.div>
    </div>
  );
}
