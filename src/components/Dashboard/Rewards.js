import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Wheel } from "react-custom-roulette";
import BackArrow from "../common/BackArrow"; // 👈 AÑADIDO

export default function Rewards() {
  const [puntos, setPuntos] = useState(1250);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [premioRasca, setPremioRasca] = useState(null);
  const [descubierto, setDescubierto] = useState(false);
  const [rascando, setRascando] = useState(false);

  const canvasRef = useRef(null);

  // --- DATOS DE LA RULETA ---
  const data = [
    { option: "💎 +50 pts", value: 50 },
    { option: "🎁 10% Descuento", value: 100 },
    { option: "😢 Pierdes 20 pts", value: -20 },
    { option: "🎉 +200 pts", value: 200 },
    { option: "💀 Sin premio", value: 0 },
    { option: "🔥 x2 puntos", value: "x2" },
  ];

  const canjeables = [
    { id: 1, nombre: "Café Gratis", costo: 200, icono: "☕" },
    { id: 2, nombre: "Descuento 10€", costo: 400, icono: "💸" },
    { id: 3, nombre: "Sorteo Especial", costo: 300, icono: "🎟️" },
    { id: 4, nombre: "Camiseta Vibbe", costo: 800, icono: "👕" },
  ];

  // --- 🎡 FUNCIONALIDAD DE LA RULETA ---
  const girarRuleta = () => {
    if (puntos < 10 || mustSpin) return;
    setPuntos((prev) => prev - 10);
    setMensaje("");
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const aplicarPremio = (premio) => {
    let nuevoPuntaje = puntos;
    if (premio.value === "x2") nuevoPuntaje *= 2;
    else nuevoPuntaje += premio.value;
    setPuntos(nuevoPuntaje);
    setMensaje(`Resultado: ${premio.option}`);
  };

  const canjearPremio = (premio) => {
    if (puntos >= premio.costo) {
      setPuntos(puntos - premio.costo);
      alert(`🎉 Has canjeado ${premio.nombre}!`);
    } else {
      alert("❌ No tienes suficientes puntos para este premio.");
    }
  };

  // --- 🎯 RASCA Y GANA ---
  useEffect(() => {
    inicializarCanvas();
  }, []);

  const inicializarCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#ccc";
    ctx.font = "bold 20px Inter";
    ctx.textAlign = "center";
    ctx.fillText("Rasca aquí 🎯", width / 2, height / 2 + 7);

    setDescubierto(false);
    setPremioRasca(null);
  };

  const startRascar = () => setRascando(true);
  const stopRascar = () => setRascando(false);

  const rascar = (e) => {
    if (!rascando || descubierto) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left || e.touches?.[0]?.clientX - rect.left;
    const y = e.clientY - rect.top || e.touches?.[0]?.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < pixels.data.length; i += 4) {
      if (pixels.data[i] === 0) cleared++;
    }
    const porcentaje = (cleared / (pixels.data.length / 4)) * 100;

    if (porcentaje > 60 && !descubierto) {
      setDescubierto(true);
      const resultados = [
        { texto: "🎉 ¡Ganaste 100 puntos!", valor: 100 },
        { texto: "💎 ¡50 puntos extra!", valor: 50 },
        { texto: "😢 Sin premio", valor: 0 },
        { texto: "🎁 Descuento especial", valor: 0 },
      ];
      const resultado = resultados[Math.floor(Math.random() * resultados.length)];
      setPremioRasca(resultado.texto);
      setPuntos((prev) => prev + resultado.valor);
    }
  };

  const volverARascar = () => {
    if (puntos < 200) {
      alert("❌ Necesitas al menos 200 puntos para volver a rascar.");
      return;
    }
    setPuntos((prev) => prev - 200);
    inicializarCanvas();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10 relative"
      style={{ backgroundColor: "#082129", color: "white" }}
    >
      {/* 🔙 Flecha BACK */}
      <BackArrow to="/home" />

      {/* TÍTULO */}
      <motion.h1
        className="text-3xl font-bold text-emerald-400 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🎁 Premios y Sorteos
      </motion.h1>

      <p className="text-gray-300 mb-6">¡Gira la ruleta, rasca o canjea tus puntos!</p>

      {/* TARJETA DE PUNTOS */}
      <div className="bg-white/10 rounded-2xl border border-white/20 p-4 mb-8 w-full max-w-sm text-center">
        <p className="text-gray-300">Puntos disponibles</p>
        <h2 className="text-5xl font-bold text-emerald-400">{puntos}</h2>
      </div>

      {/* RULETA */}
      <div className="flex flex-col items-center mb-10">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={[
            "#34d399",
            "#fde047",
            "#f87171",
            "#a78bfa",
            "#4ade80",
            "#fbbf24",
          ]}
          textColors={["#082129"]}
          fontSize={16}
          outerBorderColor="#082129"
          radiusLineWidth={1}
          innerRadius={15}
          spinDuration={0.8}
          onStopSpinning={() => {
            setMustSpin(false);
            aplicarPremio(data[prizeNumber]);
          }}
        />

        <motion.button
          onClick={girarRuleta}
          disabled={mustSpin || puntos < 10}
          className={`mt-6 px-8 py-3 rounded-xl font-bold text-gray-900 ${
            puntos < 10
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-400 to-yellow-300 hover:opacity-90"
          }`}
          whileTap={{ scale: puntos >= 10 ? 0.95 : 1 }}
        >
          {mustSpin ? "Girando..." : "¡GIRAR!"}
        </motion.button>
      </div>

      {mensaje && (
        <motion.p
          className="mt-4 text-lg text-emerald-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {mensaje}
        </motion.p>
      )}

      {/* RASCA Y GANA */}
      <div className="mt-12 mb-10 w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-emerald-400 mb-4">🎯 Rasca y Gana</h2>

        <div className="relative w-[300px] h-[150px] mx-auto flex items-center justify-center bg-gradient-to-r from-emerald-400 to-yellow-300 text-gray-900 rounded-xl mb-4 font-bold text-xl">
          {premioRasca ? premioRasca : "?"}

          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="absolute top-0 left-0 rounded-xl"
            onMouseDown={startRascar}
            onMouseUp={stopRascar}
            onMouseMove={rascar}
            onTouchStart={startRascar}
            onTouchEnd={stopRascar}
            onTouchMove={rascar}
          />
        </div>

        {!descubierto ? (
          <p className="text-gray-300 text-sm">
            Rasca con el ratón o el dedo para descubrir si hay premio 🎁
          </p>
        ) : (
          <>
            <motion.p
              className="text-emerald-300 font-semibold text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {premioRasca?.includes("Ganaste") || premioRasca?.includes("puntos")
                ? "🎉 ¡Felicidades!"
                : "😢 ¡Otra vez será!"}
            </motion.p>

            <motion.button
              onClick={volverARascar}
              className="bg-gradient-to-r from-emerald-400 to-yellow-300 text-gray-900 font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition"
              whileTap={{ scale: 0.95 }}
            >
              🔁 Volver a rascar (200 pts)
            </motion.button>
          </>
        )}
      </div>

      {/* LISTADO DE PREMIOS */}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-emerald-400 mb-4 text-center">
          🎯 Premios disponibles
        </h2>

        <div className="flex flex-col gap-3">
          {canjeables.map((premio) => (
            <motion.div
              key={premio.id}
              className="flex justify-between items-center bg-white/10 border border-white/20 rounded-2xl px-5 py-3 hover:bg-emerald-400/10 transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{premio.icono}</span>
                <span className="text-white font-medium">{premio.nombre}</span>
              </div>

              <button
                onClick={() => canjearPremio(premio)}
                className="bg-gradient-to-r from-emerald-400 to-yellow-300 text-gray-900 font-semibold px-4 py-1 rounded-xl text-sm hover:opacity-90"
              >
                {premio.costo} pts
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
