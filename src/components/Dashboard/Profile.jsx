import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeBackground from "../backgrounds/HomeBackground";

export default function Profile() {
  const navigate = useNavigate();

  // Datos de perfil (mock)
  const [fullName, setFullName] = useState("Manuel Vibbe");
  const [username, setUsername] = useState("Manuel");
  const [email, setEmail] = useState("manuel@vibbe.com");
  const [phone, setPhone] = useState("+34 600 000 000");
  const [address, setAddress] = useState("C/ Ejemplo 123");
  const [city, setCity] = useState("Madrid");
  const [birthdate, setBirthdate] = useState("1999-05-15");
  const [preferredStore, setPreferredStore] = useState("madrid-center");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [marketing, setMarketing] = useState(true);

  // Stats ficticias
  const level = 7;
  const xp = 260;
  const xpNeeded = 400;
  const xpPercent = Math.min(100, (xp / xpNeeded) * 100);
  const visits = 18;
  const totalPoints = 1250;

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }
    // Aquí guardarías en API / backend
    alert("Datos actualizados correctamente ✔");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 pb-10 px-4 sm:px-6 overflow-hidden bg-[#02070a]">
      {/* Fondo tipo Auth: HomeBackground + glows */}
      <HomeBackground />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.24),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(250,204,21,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute -top-10 left-1/3 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
      <div className="pointer-events-none absolute top-16 right-10 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_16px_rgba(250,204,21,0.9)]" />
      <div className="pointer-events-none absolute bottom-10 left-8 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_16px_rgba(56,189,248,0.9)]" />

      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        className="relative w-full max-w-4xl bg-slate-900/70 backdrop-blur-2xl 
                   border border-white/10 rounded-3xl px-6 sm:px-10 py-8 shadow-[0_0_40px_rgba(15,118,110,0.55)]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* CABECERA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          {/* Avatar + nombre */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-300 flex items-center justify-center shadow-xl">
              <span className="text-3xl sm:text-4xl">👤</span>
              <span className="absolute -bottom-2 right-2 text-[0.6rem] px-2 py-0.5 rounded-full bg-slate-900/90 text-emerald-300 border border-emerald-400 text-[10px]">
                Nivel {level}
              </span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-300/80">
                Perfil Vibbe
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {fullName}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Miembro desde 2024 · {visits} visitas · {totalPoints} pts
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/5 border border-white/15 rounded-2xl px-3 py-2">
              <p className="text-slate-300">XP actual</p>
              <p className="text-lg font-semibold text-emerald-300">
                {xp}/{xpNeeded}
              </p>
              <div className="mt-1 h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            <div className="bg-white/5 border border-white/15 rounded-2xl px-3 py-2">
              <p className="text-slate-300">Racha</p>
              <p className="text-lg font-semibold text-yellow-300">3 días 🔥</p>
              <p className="text-[0.7rem] text-slate-400 mt-1">
                Sigue visitando locales para mantenerla.
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO DE DATOS */}
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-4 
                     bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                     bg-clip-text text-transparent"
        >
          Datos personales
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Nombre completo */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Usuario */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">Teléfono</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Ciudad / Provincia
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm [color-scheme:dark]"
            />
          </div>

          {/* Local preferido */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Local Vibbe preferido
            </label>
            <select
              value={preferredStore}
              onChange={(e) => setPreferredStore(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white text-sm
                         border border-white/15 focus:border-emerald-400 outline-none"
            >
              <option value="madrid-center">Madrid Centro</option>
              <option value="bcn-diagonal">Barcelona Diagonal</option>
              <option value="vlc-russafa">Valencia Ruzafa</option>
              <option value="sev-centro">Sevilla Centro</option>
            </select>
          </div>
        </div>

        {/* CONTRASEÑA */}
        <motion.h3 className="text-lg font-semibold text-emerald-300 mb-3">
          Seguridad de la cuenta
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white placeholder-gray-400
                         border border-white/15 focus:border-emerald-400 
                         outline-none text-sm"
            />
          </div>
        </div>

        {/* PREFERENCIAS */}
        <div className="flex items-start gap-2 mb-6">
          <input
            id="marketing"
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-slate-900"
          />
          <label htmlFor="marketing" className="text-xs text-slate-300">
            Quiero recibir novedades, sorteos y promociones especiales de Vibbe
            en mi correo electrónico.
          </label>
        </div>

        {/* BOTONES */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-900
                       bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 
                       shadow-[0_0_20px_rgba(52,211,153,0.5)]"
          >
            Guardar cambios
          </motion.button>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 
                       text-white font-semibold shadow-md transition"
          >
            Cerrar sesión
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
