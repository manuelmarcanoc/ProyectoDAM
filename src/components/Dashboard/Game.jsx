import React, { useEffect, useRef, useState } from "react";
import BackArrow from "../common/BackArrow";

// -------- CONSTANTES -------- //
const PLAY_W = 360;
const PLAY_H = 640;
const PLAYER_SIZE = 44;

const GRAVITY = 0.8;
const JUMP_V = -12;

const STATES = {
  READY: "READY",
  RUNNING: "RUNNING",
  GAME_OVER: "GAME_OVER",
};

// -------- COMPONENTE PRINCIPAL -------- //
export default function ClimbRush() {
  const [state, setState] = useState(STATES.READY);

  const stateRef = useRef(STATES.READY);
  const setStateSafe = (s) => {
    stateRef.current = s;
    setState(s);
  };

  const [score, setScore] = useState(0);
  const [surfaces, setSurfaces] = useState(0);

  const [tick, setTick] = useState(0); // fuerza re-render inmediato

  const platforms = useRef([]);
  const player = useRef({ x: 150, y: PLAY_H - PLAYER_SIZE - 10, vy: 0 });
  const tilt = useRef(0);

  const loop = useRef(null);
  const invulnerableUntil = useRef(0);

  // -------- RESET -------- //
  function resetGame() {
    player.current = { x: 150, y: PLAY_H - PLAYER_SIZE - 10, vy: 0 };
    platforms.current = [];

    // plataforma suelo
    platforms.current.push({
      id: crypto.randomUUID(),
      x: 0,
      y: PLAY_H - 10,
      w: PLAY_W,
    });

    // plataformas iniciales
    let y = PLAY_H - 120;
    for (let i = 0; i < 7; i++) {
      const w = 100 + Math.random() * 60;
      const x = Math.random() * (PLAY_W - w);
      platforms.current.push({
        id: crypto.randomUUID(),
        x,
        y,
        w,
      });
      y -= 100;
    }

    setScore(0);
    setSurfaces(0);
    setTick((t) => t + 1);
  }

  // -------- START -------- //
  function startGame() {
    resetGame();
    setStateSafe(STATES.RUNNING);
    // short invulnerability to avoid instant frame death
    invulnerableUntil.current = Date.now() + 250;
    startLoop();
  }

  // -------- LOOP -------- //
  function startLoop() {
    if (loop.current) cancelAnimationFrame(loop.current);

    const step = () => {
      if (stateRef.current !== STATES.RUNNING) return;

      updatePhysics();
      loop.current = requestAnimationFrame(step);
    };

    loop.current = requestAnimationFrame(step);
  }

  // -------- PHYSICS -------- //
  function updatePhysics() {
    const p = player.current;

    // mover horizontal por inclinación
    p.x += tilt.current * 4;
    if (p.x < 0) p.x = 0;
    if (p.x > PLAY_W - PLAYER_SIZE) p.x = PLAY_W - PLAYER_SIZE;

    // gravedad
    p.vy += GRAVITY;
    p.y += p.vy;

    // colisiones
    if (p.vy > 0) {
      for (const pf of platforms.current) {
        const top = pf.y;
        const left = pf.x;
        const right = pf.x + pf.w;

        const playerBottom = p.y + PLAYER_SIZE;
        const playerPrevBottom = playerBottom - p.vy;

        const horizontallyInside = p.x + PLAYER_SIZE > left + 5 && p.x < right - 5;

        if (
          horizontallyInside &&
          playerPrevBottom <= top &&
          playerBottom >= top
        ) {
          // aterriza
          p.y = top - PLAYER_SIZE;
          p.vy = JUMP_V;

          setSurfaces((s) => {
            const ns = s + 1;
            setScore(Math.floor(ns / 10));
            shiftWorld(90);
            return ns;
          });
          break;
        }
      }
    }

    // muerte (respetar ventana de invulnerabilidad inicial)
    if (Date.now() > invulnerableUntil.current && p.y > PLAY_H + 80) {
      setStateSafe(STATES.GAME_OVER);
      return;
    }

    setTick((t) => t + 1);
  }

  // -------- SHIFT WORLD -------- //
  function shiftWorld(amount) {
    platforms.current = platforms.current.map((pf) => ({
      ...pf,
      y: pf.y + amount,
    }));

    player.current.y -= amount;

    // eliminar + añadir nuevas
    platforms.current = platforms.current.filter((pf) => pf.y < PLAY_H + 40);

    while (platforms.current.length < 8) {
      const w = 90 + Math.random() * 60;
      const x = Math.random() * (PLAY_W - w);
      platforms.current.unshift({
        id: crypto.randomUUID(),
        x,
        y: -40 - Math.random() * 80,
        w,
      });
    }
  }

  // -------- CONTROLES -------- //
  useEffect(() => {
    const onTilt = (e) => {
      tilt.current = Math.max(-1, Math.min(1, (e.gamma || 0) / 25));
    };
    window.addEventListener("deviceorientation", onTilt);

    const onKey = (e) => {
      if (e.code === "ArrowLeft") tilt.current = -1;
      if (e.code === "ArrowRight") tilt.current = 1;
    };
    const onKeyUp = () => (tilt.current = 0);

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("deviceorientation", onTilt);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // -------- RENDER -------- //
  return (
    <div className="min-h-screen flex flex-col items-center py-5" style={{ background: "#02121a" }}>
      <div style={{ position: "absolute", left: 12, top: 12 }}>
        <BackArrow to="/home" />
      </div>

      <h1 className="text-lg text-white font-bold mb-2">Climb Rush</h1>
      <p className="text-emerald-200 text-sm mb-4">
        Sube saltando de plataforma en plataforma
      </p>

      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: PLAY_W,
          height: PLAY_H,
          background: "#04212a",
        }}
      >
        {/* DEBUG OVERLAY */}
        <div style={{ position: "absolute", right: 8, top: 8, zIndex: 40, background: "rgba(0,0,0,0.5)", color: "#d1fae5", padding: 8, borderRadius: 8, fontSize: 12 }}>
          <div>state: {state}</div>
          <div>player: x={Math.round(player.current.x)} y={Math.round(player.current.y)}</div>
          <div>vy={player.current.vy.toFixed(2)}</div>
          <div>platforms: {platforms.current.length}</div>
          <div>surfaces: {surfaces}</div>
        </div>
        {/* PLATAFORMAS */}
        {platforms.current.map((pf) => (
          <div
            key={pf.id}
            style={{
              position: "absolute",
              left: pf.x,
              top: pf.y,
              width: pf.w,
              height: 10,
              background: "linear-gradient(90deg,#065f46,#10b981)",
              borderRadius: 4,
            }}
          />
        ))}

        {/* PLAYER */}
        <div
          style={{
            position: "absolute",
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            transform: `translate(${player.current.x}px, ${player.current.y}px)`,
            background: "#34d399",
            borderRadius: 10,
            boxShadow: "0 8px 20px rgba(16,185,129,0.25)",
          }}
        />

        {/* UI STATES */}
        {state === STATES.READY && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <button
              onClick={startGame}
              className="px-6 py-2 bg-emerald-400 text-black rounded-full font-bold"
            >
              Comenzar
            </button>
          </div>
        )}

        {state === STATES.GAME_OVER && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
            <p className="mb-2">Has caído</p>
            <p className="mb-4">Puntos: {score}</p>

            <button
              onClick={() => {
                setState(STATES.READY);
                resetGame();
              }}
              className="px-4 py-2 bg-emerald-300 text-black rounded-full"
            >
              Reiniciar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
