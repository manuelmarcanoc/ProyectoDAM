import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import { motion } from "framer-motion";
import BackArrow from "../common/BackArrow";

const wheelData = [
  { option: "+50 pts", value: 50 },
  { option: "+150 pts", value: 150 },
  { option: "x2 puntos", value: "x2" },
  { option: "Sin premio", value: 0 },
  { option: "-20 pts", value: -20 },
  { option: "+300 pts", value: 300 },
];

const storeItems = [
  { id: 1, nombre: "Café gratis", costo: 200, icono: "☕" },
  { id: 2, nombre: "Descuento 10€", costo: 350, icono: "💸" },
  { id: 3, nombre: "Camiseta Vibbe", costo: 800, icono: "👕" },
];

export default function Rewards() {
  const [puntos, setPuntos] = useState(1000);

  // Ruleta
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ruletaResultado, setRuletaResultado] = useState(null);

  // Rasca
  const canvasRef = useRef(null);
  const [scratchResult, setScratchResult] = useState(null);
  const [scratching, setScratching] = useState(false);

  // Sorteo
  const [tickets, setTickets] = useState(0);

  // ==================== RULETA ====================
  const spin = () => {
    if (mustSpin || puntos < 25) return;

    setPuntos(p => p - 25);
    setRuletaResultado(null);

    const n = Math.floor(Math.random() * wheelData.length);
    setPrizeNumber(n);
    setMustSpin(true);
  };

  const onStop = () => {
    const premio = wheelData[prizeNumber];

    setMustSpin(false);
    setRuletaResultado(premio.option);

    setPuntos(p => premio.value === "x2" ? p * 2 : p + premio.value);
  };

  // ==================== RASCA ====================
  useEffect(() => {
    resetScratch();
  }, []);

  const resetScratch = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#444";
    ctx.fillRect(0, 0, 300, 150);

    ctx.fillStyle = "#eee";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Rasca aquí", 150, 80);

    setScratchResult(null);
  };

  const startScratch = () => setScratching(true);
  const stopScratch = () => setScratching(false);

  const scratchMove = e => {
    if (!scratching || scratchResult) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left;
    const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calcular %
    const pixels = ctx.getImageData(0, 0, 300, 150);
    let cleared = 0;
    for (let i = 3; i < pixels.data.length; i += 4)
      if (pixels.data[i] === 0) cleared++;

    if (cleared / (pixels.data.length / 4) > 0.55) {
      const premios = [
        { texto: "+100 pts", val: 100 },
        { texto: "+50 pts", val: 50 },
        { texto: "0 pts", val: 0 },
      ];
      const r = premios[Math.floor(Math.random() * premios.length)];
      setScratchResult(r.texto);
      setPuntos(p => p + r.val);
    }
  };

  // ==================== SORTEO ====================
  const buyTicket = () => {
    if (puntos < 50) return alert("No tienes suficientes puntos");
    setPuntos(p => p - 50);
    setTickets(t => t + 1);
  };

  const canjear = item => {
    if (puntos < item.costo)
      return alert("No tienes suficientes puntos");

    setPuntos(p => p - item.costo);
    alert(`🎉 Canjeado: ${item.nombre}`);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-[#050505] text-white relative">

      {/* GLOW DE FONDO */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.35),transparent_60%)]"></div>

      <BackArrow to="/home" />

      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
        🎁 Recompensas Vibbe
      </h1>

      {/* Punto total */}
      <div className="text-center mb-10">
        <p className="text-gray-400">Puntos disponibles</p>
        <motion.p
          key={puntos}
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-emerald-400 drop-shadow-lg"
        >
          {puntos}
        </motion.p>
      </div>

      {/* CONTENEDOR GRID */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* RULETA */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">🎡 Ruleta de premios</h2>

          <div className="relative flex justify-center">
            <div className="absolute w-64 h-64 bg-emerald-400/20 blur-3xl rounded-full"></div>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelData}
              onStopSpinning={onStop}
              backgroundColors={["#34d399", "#fde047", "#f87171", "#818cf8"]}
              textColors={["#000"]}
              fontSize={18}
              radiusLineWidth={1}
            />
          </div>

          <motion.button
            onClick={spin}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-yellow-300 text-black font-semibold w-full hover:opacity-90"
          >
            Girar (25 pts)
          </motion.button>

          {ruletaResultado && (
            <p className="text-center text-emerald-300 mt-3">
              Resultado: {ruletaResultado}
            </p>
          )}
        </div>

        {/* RASCA */}
       <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">

  <div className="absolute inset-0 pointer-events-none bg-[conic-gradient(from_0deg,rgba(16,185,129,0.1),rgba(56,189,248,0.1),rgba(168,85,247,0.1),rgba(244,114,182,0.1),rgba(16,185,129,0.1))] animate-spin-slow"></div>

  <h2 className="text-xl font-semibold mb-4 relative">🎯 Rasca y gana</h2>

  <div className="relative w-[320px] h-[180px] mx-auto rounded-3xl overflow-hidden shadow-xl border border-white/20">

    {/* Tarjeta interior (resultado) */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-yellow-300 flex items-center justify-center text-black text-3xl font-extrabold tracking-wide">
      {scratchResult || "?"}
    </div>

    {/* Capa metálica para rascar */}
    <canvas
      ref={canvasRef}
      width={320}
      height={180}
      className="absolute inset-0 cursor-pointer"
      onMouseDown={startScratch}
      onMouseUp={stopScratch}
      onMouseMove={scratchMove}
      onTouchStart={startScratch}
      onTouchEnd={stopScratch}
      onTouchMove={scratchMove}
    />

    {/* Brillo animado */}
    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_40%,rgba(255,255,255,0)_70%)] animate-shine pointer-events-none"></div>

  </div>

  {scratchResult && (
    <button
      onClick={resetScratch}
      className="mt-5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-yellow-300 text-black font-semibold w-full hover:opacity-90"
    >
      Rascar otra vez (200 pts)
    </button>
  )}
</div>

        {/* SORTEO */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-3">🎟 Sorteo semanal</h2>

          <p className="text-gray-300 mb-3">Ticket = 50 pts</p>

          <p className="text-5xl font-bold text-emerald-400 mb-4 text-center">
            {tickets}
          </p>

          <button
            onClick={buyTicket}
            className="px-4 py-2 bg-emerald-400 text-black rounded-xl font-semibold w-full hover:opacity-90"
          >
            Comprar ticket
          </button>
        </div>

        {/* TIENDA */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-center">🛍 Tienda</h2>

          <div className="space-y-3">
            {storeItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icono}</span>
                  <p>{item.nombre}</p>
                </div>

                <button
                  onClick={() => canjear(item)}
                  className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-400 to-yellow-300 text-black text-sm font-semibold"
                >
                  {item.costo} pts
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
