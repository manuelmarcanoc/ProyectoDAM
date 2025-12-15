import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BackArrow from "../common/BackArrow";

// -------- CONFIGURACIÓN DEL JUEGO -------- //
const COLORS = {
  bg: "#020617", // Slate 950
  player: "#34d399", // Emerald 400
  enemyChase: "#f87171", // Red 400
  enemyDash: "#fbbf24", // Amber 400
  orb: "#22d3ee", // Cyan 400
  text: "#e2e8f0",
};

export default function VibbeCore() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Estado React para UI (Game Over, Puntos)
  const [gameState, setGameState] = useState("READY"); // READY, PLAYING, GAME_OVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Referencias mutables para el motor del juego (Sin Re-renders)
  const game = useRef({
    width: 0,
    height: 0,
    running: false,
    score: 0,
    frames: 0,
    player: { x: 0, y: 0, radius: 8, speed: 0.15, dead: false },
    input: { x: 0, y: 0, active: false },
    enemies: [],
    particles: [],
    orbs: [],
    spawner: {
      nextEnemy: 0,
      nextOrb: 100, // Frames hasta el primer orbe
      difficulty: 1,
    }
  });

  const requestRef = useRef();

  // -------- SISTEMA DE REDIMENSIONADO -------- //
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        canvasRef.current.width = clientWidth;
        canvasRef.current.height = clientHeight;
        game.current.width = clientWidth;
        game.current.height = clientHeight;

        // Centrar jugador si está en READY
        if (gameState === "READY") {
          game.current.player.x = clientWidth / 2;
          game.current.player.y = clientHeight / 2;
          game.current.input.x = clientWidth / 2;
          game.current.input.y = clientHeight / 2;
          renderParams(canvasRef.current.getContext("2d"));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init

    return () => window.removeEventListener("resize", handleResize);
  }, [gameState]);

  // -------- MOTOR DEL JUEGO -------- //
  const startGame = () => {
    setGameState("PLAYING");
    setScore(0);

    // Reset Game State
    game.current.running = true;
    game.current.score = 0;
    game.current.frames = 0;
    game.current.enemies = [];
    game.current.particles = [];
    game.current.orbs = [];
    game.current.player.dead = false;
    game.current.player.x = game.current.width / 2;
    game.current.player.y = game.current.height / 2;
    game.current.input.x = game.current.width / 2;
    game.current.input.y = game.current.height / 2;

    // Reset Spawner
    game.current.spawner = {
      nextEnemy: 60,
      nextOrb: 120,
      difficulty: 1
    };

    // Loop
    cancelAnimationFrame(requestRef.current);
    loop();
  };

  const loop = () => {
    if (!game.current.running) return;

    update();
    draw();

    game.current.frames++;
    requestRef.current = requestAnimationFrame(loop);
  };

  const update = () => {
    const g = game.current;
    const ctx = canvasRef.current.getContext("2d");

    // 1. Player Movement (Lerp hacia el input)
    // El jugador sigue al dedo/ratón con un poco de retraso (peso)
    const dx = g.input.x - g.player.x;
    const dy = g.input.y - g.player.y;
    g.player.x += dx * g.player.speed;
    g.player.y += dy * g.player.speed;

    // Mantener dentro de bordes
    g.player.x = Math.max(g.player.radius, Math.min(g.width - g.player.radius, g.player.x));
    g.player.y = Math.max(g.player.radius, Math.min(g.height - g.player.radius, g.player.y));

    // 2. Spawn Logic
    g.spawner.nextEnemy--;
    if (g.spawner.nextEnemy <= 0) {
      spawnEnemy();
      // Dificultad incremental: cada vez spawnean más rápido
      const rate = Math.max(10, 60 - Math.floor(g.frames / 600));
      g.spawner.nextEnemy = rate;
    }

    g.spawner.nextOrb--;
    if (g.spawner.nextOrb <= 0 && g.orbs.length < 3) { // Max 3 orbes a la vez
      spawnOrb();
      g.spawner.nextOrb = 180 + Math.random() * 200; // 3-6 segundos
    }

    // 3. Updates de Entidades

    // ENEMIGOS
    g.enemies.forEach(e => {
      // Chase Behavior
      const angle = Math.atan2(g.player.y - e.y, g.player.x - e.x);
      e.vx += Math.cos(angle) * e.accel;
      e.vy += Math.sin(angle) * e.accel;

      // Fricción para que no aceleren infinitamente
      e.vx *= 0.96;
      e.vy *= 0.96;

      e.x += e.vx;
      e.y += e.vy;
      e.angle += 0.05; // Rotación visual

      // Check Colisión con Jugador
      const dist = Math.hypot(g.player.x - e.x, g.player.y - e.y);
      if (dist < g.player.radius + e.size) {
        gameOver();
      }
    });

    // ORBES
    for (let i = g.orbs.length - 1; i >= 0; i--) {
      const o = g.orbs[i];
      o.life--;
      o.scale = 1 + Math.sin(g.frames * 0.1) * 0.2; // Pulsación

      // Check Pickup
      const dist = Math.hypot(g.player.x - o.x, g.player.y - o.y);
      if (dist < g.player.radius + o.size + 10) { // +10 imán
        // Collect!
        g.score += 1;
        setScore(g.score);
        createParticles(o.x, o.y, COLORS.orb, 8);
        g.orbs.splice(i, 1);
      } else if (o.life <= 0) {
        g.orbs.splice(i, 1); // Desaparece por tiempo
      }
    }

    // PARTÍCULAS
    for (let i = g.particles.length - 1; i >= 0; i--) {
      const p = g.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.05;
      if (p.life <= 0) g.particles.splice(i, 1);
    }
  };

  const draw = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const g = game.current;

    // Clear con trail effect (fondo semi-transparente)
    ctx.fillStyle = "rgba(2, 6, 23, 0.3)";
    ctx.fillRect(0, 0, g.width, g.height);

    // Grid Effect
    drawGrid(ctx);

    // Orbes
    g.orbs.forEach(o => {
      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.scale(o.scale, o.scale);
      ctx.beginPath();
      ctx.arc(0, 0, o.size, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.orb;
      ctx.shadowBlur = 15;
      ctx.shadowColor = COLORS.orb;
      ctx.fill();
      ctx.restore();
    });

    // Player
    ctx.beginPath();
    ctx.arc(g.player.x, g.player.y, g.player.radius, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.player;
    ctx.shadowBlur = 20;
    ctx.shadowColor = COLORS.player;
    ctx.fill();

    // Línea al input (feedback visual del 'Follow')
    if (g.input.active) {
      ctx.beginPath();
      ctx.moveTo(g.player.x, g.player.y);
      ctx.lineTo(g.input.x, g.input.y);
      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)";
      ctx.stroke();
    }

    // Enemigos
    g.enemies.forEach(e => {
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.angle);

      ctx.fillStyle = e.type === 0 ? COLORS.enemyChase : COLORS.enemyDash;
      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.fillStyle;

      // Triángulo
      ctx.beginPath();
      ctx.moveTo(e.size, 0);
      ctx.lineTo(-e.size, -e.size);
      ctx.lineTo(-e.size, e.size);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    });

    // Partículas
    g.particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  };

  // Fun helper para pintar solo el fondo en READY
  const renderParams = (ctx) => {
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, game.current.width, game.current.height);
    drawGrid(ctx);
  };

  const drawGrid = (ctx) => {
    ctx.strokeStyle = "rgba(30, 41, 59, 0.5)";
    ctx.lineWidth = 1;
    const step = 40;
    // Movimiento del grid basado en frames para sensación de velocidad/vida
    const offset = (game.current.frames * 0.5) % step;

    ctx.beginPath();
    for (let x = 0; x < game.current.width; x += step) {
      ctx.moveTo(x, 0); ctx.lineTo(x, game.current.height);
    }
    for (let y = offset; y < game.current.height; y += step) {
      ctx.moveTo(0, y); ctx.lineTo(game.current.width, y);
    }
    ctx.stroke();
  };

  const spawnEnemy = () => {
    const g = game.current;
    // Aparecer en bordes random
    let x, y;
    if (Math.random() > 0.5) {
      x = Math.random() > 0.5 ? -20 : g.width + 20;
      y = Math.random() * g.height;
    } else {
      x = Math.random() * g.width;
      y = Math.random() > 0.5 ? -20 : g.height + 20;
    }

    g.enemies.push({
      x, y,
      vx: 0, vy: 0,
      angle: 0,
      size: 10 + Math.random() * 5,
      accel: 0.1 + Math.random() * 0.1, // Velocidad variable
      type: Math.random() > 0.8 ? 1 : 0 // 20% especiales
    });
  };

  const spawnOrb = () => {
    const g = game.current;
    // Aparecer lejos del jugador para forzarle a moverse
    const margin = 50;
    const x = margin + Math.random() * (g.width - margin * 2);
    const y = margin + Math.random() * (g.height - margin * 2);

    g.orbs.push({
      x, y,
      size: 6,
      life: 300, // 5 segundos
      scale: 1,
    });
  };

  const createParticles = (x, y, color, count) => {
    for (let i = 0; i < count; i++) {
      game.current.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        color,
        size: Math.random() * 3
      });
    }
  };

  const gameOver = () => {
    game.current.running = false;
    cancelAnimationFrame(requestRef.current);
    setGameState("GAME_OVER");
    if (game.current.score > highScore) setHighScore(game.current.score);
    createParticles(game.current.player.x, game.current.player.y, COLORS.player, 50);

    // Dibujar último frame estático con explosión
    draw();
  };

  // -------- INPUT HANDLERS -------- //
  const handlePointerMove = (e) => {
    if (gameState !== "PLAYING") return;
    const rect = canvasRef.current.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    game.current.input.x = x;
    game.current.input.y = y;
    game.current.input.active = true;
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex justify-center items-center overflow-hidden touch-none no-select">

      {/* HEADER UI */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
        <span className="text-slate-500 font-mono text-xs block">VIBBE CORE v1.0</span>
        <span className="text-white font-black text-2xl tracking-widest">{score.toString().padStart(3, '0')}</span>
      </div>

      <div className="absolute top-4 right-4 z-50 pointer-events-auto">
        <BackArrow to="/home" />
      </div>

      {/* GAME CONTAINER */}
      <div
        ref={containerRef}
        className="w-full h-full relative"
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerMove}
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
        />

        {/* OVERLAYS HTML (Más fácil de maquetar que Canvas) */}
        {gameState === "READY" && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm animate-fade-in z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400 mb-2 filter drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                CORE
              </h1>
              <p className="text-slate-400 text-sm mb-8 tracking-widest uppercase">Survival Protocol</p>

              <button
                onClick={startGame}
                className="group relative px-8 py-3 bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold rounded-sm transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-emerald-400/20 blur-lg group-hover:blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                INICIAR SECUENCIA
              </button>

              <div className="mt-8 text-xs text-slate-500 max-w-xs mx-auto">
                <p className="mb-2">OBJETIVO: Recolectar ORBES cian</p>
                <p>AMENAZA: Evitar CONTACTO rojo</p>
                <p className="mt-4 text-emerald-500/50">"Mueve el cursor/dedo para guiar el núcleo"</p>
              </div>
            </div>
          </div>
        )}

        {gameState === "GAME_OVER" && (
          <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center text-center backdrop-blur-md z-20 animate-pulse-soft">
            <h2 className="text-4xl font-bold text-red-500 mb-2 tracking-tighter">SEÑAL PERDIDA</h2>
            <div className="text-7xl font-black text-white mb-1 drop-shadow-xl">{score}</div>
            <p className="text-red-300/50 text-xs mb-8 uppercase">Orbes Recolectados</p>

            {highScore > 0 && <p className="text-slate-400 text-xs mb-6">MEJOR PUNTUACIÓN: {highScore}</p>}

            <button
              onClick={startGame}
              className="px-10 py-3 bg-white text-black font-bold rounded-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              REINTENTAR
            </button>

            <Link
              to="/home"
              className="mt-6 text-slate-400 text-xs hover:text-white transition-colors uppercase tracking-widest border-b border-transparent hover:border-white pb-1"
            >
              Volver al Menú
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
