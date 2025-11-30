import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import { motion } from "framer-motion";
import BackArrow from "../common/BackArrow";
import Confetti from "../Confetti.jsx";



// ======================= DATOS RULETA =======================
const wheelData = [
  { option: "+50 pts", value: 50 },
  { option: "+150 pts", value: 150 },
  { option: "x2 puntos", value: "x2" },
  { option: "Sin premio", value: 0 },
  { option: "-20 pts", value: -20 },
  { option: "+300 pts", value: 300 },
];

// ======================= TIENDA =======================
const storeItems = [
  {
    id: 1,
    nombre: "Funda de móvil Vibbe",
    costo: 500,
    icono: "📱",
    img: "/assets/store/phonecase.jpg",
    recogida: "Cafetería Paca (Madrid / BCN pronto)"
  },
  {
    id: 2,
    nombre: "Camiseta Vibbe",
    costo: 900,
    icono: "👕",
    img: "/assets/store/tshirt.jpg",
    recogida: "Fit Center BCN"
  },
  {
    id: 3,
    nombre: "Tote Bag Vibbe",
    costo: 700,
    icono: "👜",
    img: "/assets/store/totebag.jpg",
    recogida: "Pizzería Bella"
  },
  {
    id: 4,
    nombre: "Gorra Vibbe",
    costo: 600,
    icono: "🧢",
    img: "/assets/store/cap.jpg",
    recogida: "Horchatería María"
  },
  {
    id: 5,
    nombre: "Botella reutilizable",
    costo: 400,
    icono: "🥤",
    img: "/assets/store/bottle.jpg",
    recogida: "Fit Center BCN"
  },
  {
    id: 6,
    nombre: "Libreta Vibbe edición limitada",
    costo: 350,
    icono: "📓",
    img: "/assets/store/notebook.jpg",
    recogida: "Cafetería Paca"
  }
];


export default function Rewards() {
  const [puntos, setPuntos] = useState(1000);

  // ======================= RULETA =======================
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ruletaResultado, setRuletaResultado] = useState(null);

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

  // ======================= RASCA PREMIUM =======================
  const canvasRef = useRef(null);
  const [scratchResult, setScratchResult] = useState(null);
  const [scratching, setScratching] = useState(false);

  useEffect(() => {
    resetScratch();
  }, []);

  const resetScratch = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Capa gris metálica
    const grad = ctx.createLinearGradient(0, 0, 300, 0);
    grad.addColorStop(0, "#777");
    grad.addColorStop(0.5, "#999");
    grad.addColorStop(1, "#777");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 330, 190);

    ctx.fillStyle = "#eee";
    ctx.font = "22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Rasca aquí", 165, 95);

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
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // porcentaje descubierto
    const pixels = ctx.getImageData(0, 0, 330, 190);
    let cleared = 0;
    for (let i = 3; i < pixels.data.length; i += 4)
      if (pixels.data[i] === 0) cleared++;

    if (cleared / (pixels.data.length / 4) > 0.60) {

      const premios = [
        { texto: "+100 pts", val: 100 },
        { texto: "+50 pts", val: 50 },
        { texto: "+300 pts", val: 300 },
        { texto: "0 pts", val: 0 },
      ];

      const r = premios[Math.floor(Math.random() * premios.length)];

      setScratchResult(r.texto);
      setPuntos(p => p + r.val);
    }
  };

  // ======================= SORTEO =======================
  const [tickets, setTickets] = useState(0);

  const buyTicket = () => {
    if (puntos < 50) return alert("No tienes suficientes puntos");
    setPuntos(p => p - 50);
    setTickets(t => t + 1);
  };

  // ======================= CANJEAR =======================
  const canjear = item => {
    if (puntos < item.costo)
      return alert("No tienes suficientes puntos");

    setPuntos(p => p - item.costo);
    alert(`🎉 Canjeado: ${item.nombre}`);
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-[#050505] text-white relative">

    {/* CONFETI */}
<Confetti trigger={ruletaResultado} />
<Confetti trigger={scratchResult} />



      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.35),transparent_60%)]"></div>



      <BackArrow to="/home" />

      {/* TITULO */}
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
        🎁 Recompensas Vibbe
      </h1>

      {/* PUNTOS */}
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

      {/* GRID */}
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
              backgroundColors={[
                "#34d399",
                "#fde047",
                "#f87171",
                "#818cf8"
              ]}
              textColors={["#000"]}
              fontSize={19}
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

        {/* RASCA PREMIUM */}
        <div className="backdrop-blur-xl bg-white/5 border border-yellow-300/20 rounded-3xl p-6 shadow-[0_0_40px_#00ffaa33] relative overflow-hidden">

          {/* Fondo suave */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.25),transparent_70%)] animate-pulse pointer-events-none"></div>

          <h2 className="text-xl font-semibold mb-4 relative z-10">
            ✨ Rasca premium
          </h2>

          <div className="relative w-[330px] h-[190px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-yellow-300/40">

            {/* Tarjeta Premio */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-emerald-400 flex items-center justify-center text-black text-4xl font-extrabold">
              {scratchResult || "🎁"}
            </div>

            {/* Capa rascar */}
            <canvas
              ref={canvasRef}
              width={330}
              height={190}
              className="absolute inset-0 cursor-pointer"
              onMouseDown={startScratch}
              onMouseUp={stopScratch}
              onMouseMove={scratchMove}
              onTouchStart={startScratch}
              onTouchEnd={stopScratch}
              onTouchMove={scratchMove}
              style={{
                background:
                  "repeating-linear-gradient(135deg, #777 0px, #666 4px, #777 8px)",
              }}
            />

            {/* Brillo */}
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)] animate-shine pointer-events-none"></div>

          </div>

          {scratchResult && (
            <button
              onClick={resetScratch}
              className="mt-5 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-300 to-emerald-400 text-black font-semibold w-full hover:opacity-90 shadow-lg"
            >
              Rascar otra vez (200 pts)
            </button>
          )}
        </div>

        {/* SORTEO PREMIUM */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-emerald-300/20 rounded-3xl p-6 shadow-[0_0_40px_#00ff9944] overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_70%)] animate-pulse pointer-events-none"></div>

          <h2 className="text-xl font-semibold mb-2 relative z-10">
            🎟 Sorteo mensual
          </h2>

          {/* Premio Bahamas */}
          <div className="bg-gradient-to-r from-yellow-300 to-emerald-400 text-black font-bold text-center py-3 px-4 rounded-xl shadow-xl border border-yellow-300/40 relative z-10">
            🌴 Este mes: Viaje para 2 personas a <b>Bahamas</b> 🏝️
          </div>

          {/* Ticket */}
          <div className="mt-5 mx-auto w-[260px] h-[150px] rounded-2xl bg-gradient-to-br from-emerald-500/50 to-cyan-300/40 border border-white/20 shadow-[0_0_25px_#00ffaa55] flex flex-col items-center justify-center relative overflow-hidden">

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0)_100%)] animate-shine"></div>

            <p className="text-white/80">Tickets acumulados</p>
            <p className="text-6xl font-extrabold text-emerald-300 drop-shadow-lg">
              {tickets}
            </p>
          </div>

          <button
            onClick={buyTicket}
            className="mt-5 px-4 py-3 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-yellow-300 text-black font-semibold hover:opacity-90 shadow-lg relative z-10"
          >
            Comprar ticket (50 pts)
          </button>
        </div>

{/* 🛍 TIENDA FÍSICA / MERCH OFICIAL */}
<div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl col-span-2">

  <h2 className="text-2xl font-semibold mb-5 text-center">🛍 Tienda Vibbe</h2>

  <p className="text-center text-gray-300 mb-6">
    Canjea tus puntos por productos físicos y recógelos en los locales asociados.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {storeItems.map(item => (
      <div
        key={item.id}
        className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md hover:bg-white/10 transition cursor-pointer flex flex-col"
      >
        {/* Imagen del producto */}
        <div className="w-full h-40 rounded-xl overflow-hidden bg-black/30 mb-3">
          <img
            src={item.img}
            alt={item.nombre}
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
          />
        </div>

        <div className="flex-1">
          <p className="text-xl font-semibold flex items-center gap-2 mb-1">
            {item.icono} {item.nombre}
          </p>

          <p className="text-sm text-gray-300">Recogida en: {item.recogida}</p>

          <p className="mt-3 text-emerald-300 text-lg font-bold">
            {item.costo} pts
          </p>
        </div>

        <button
          onClick={() => canjear(item)}
          className="mt-4 w-full px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-yellow-300 text-black font-semibold hover:opacity-90"
        >
          Canjear
        </button>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
  );
}
