// src/components/Dashboard/Game.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BackArrow from "../common/BackArrow";

// ⭐ Importar sprites reales
import jugador from "../../assets/jugador.gif";
import enemigoGif from "../../assets/enemigo.gif";
import fondo from "../../assets/fondojuego.jpg";

// -------------------------------------------------------
// CONFIGURACIÓN DEL JUEGO
// -------------------------------------------------------

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 420;

const PLAYER_WIDTH = 110;
const PLAYER_HEIGHT = 130;
const PLAYER_SPEED = 5;
const JUMP_FORCE = 12;
const GRAVITY = 0.55;

const ENEMY_SIZE = 100;
const ENEMY_SPEED = 6.5; // MUCHO MÁS RÁPIDOS

export default function Game() {
  const [player, setPlayer] = useState({
    x: 200,
    y: 200,
    velY: 0,
    grounded: false,
  });

  const [enemies, setEnemies] = useState([]);
  const [platforms, setPlatforms] = useState([
    { x: 80, y: 330, w: 220, h: 30 },
    { x: 350, y: 270, w: 200, h: 30 },
    { x: 600, y: 320, w: 240, h: 30 },
    { x: 450, y: 180, w: 180, h: 30 },
  ]);

  const [timeSurvived, setTimeSurvived] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const keys = useRef({
    left: false,
    right: false,
    up: false,
  });

  // -------------------------------------------------------
  // CONTROLES
  // -------------------------------------------------------
  useEffect(() => {
    const handleDown = (e) => {
      if (e.code === "ArrowLeft") keys.current.left = true;
      if (e.code === "ArrowRight") keys.current.right = true;
      if (e.code === "ArrowUp") keys.current.up = true;
    };
    const handleUp = (e) => {
      if (e.code === "ArrowLeft") keys.current.left = false;
      if (e.code === "ArrowRight") keys.current.right = false;
      if (e.code === "ArrowUp") keys.current.up = false;
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // -------------------------------------------------------
  // GENERAR ENEMIGOS PERIÓDICAMENTE
  // -------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setEnemies((prev) => [
          ...prev,
          {
            x: Math.random() > 0.5 ? -50 : CANVAS_WIDTH + 50,
            y: 320,
            velX: 0,
            velY: 0,
          },
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // -------------------------------------------------------
  // SUMAR PUNTOS CADA SEGUNDO
  // -------------------------------------------------------
  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeSurvived((t) => t + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  // -------------------------------------------------------
  // LOOP PRINCIPAL
  // -------------------------------------------------------
  useEffect(() => {
    const loop = setInterval(() => {
      if (gameOver) return;

      updatePlayer();
      updateEnemies();
      checkCollisions();
    }, 16);

    return () => clearInterval(loop);
  }, [player, enemies, gameOver]);

  // -------------------------------------------------------
  // MOVIMIENTO JUGADOR
  // -------------------------------------------------------
  const updatePlayer = () => {
    let { x, y, velY, grounded } = player;

    if (keys.current.left) x -= PLAYER_SPEED;
    if (keys.current.right) x += PLAYER_SPEED;

    // SALTO
    if (keys.current.up && grounded) {
      velY = -JUMP_FORCE;
      grounded = false;
    }

    // GRAVEDAD
    velY += GRAVITY;
    y += velY;

    // LÍMITE INFERIOR
    if (y + PLAYER_HEIGHT >= CANVAS_HEIGHT) {
      y = CANVAS_HEIGHT - PLAYER_HEIGHT;
      grounded = true;
      velY = 0;
    }

    // COLISIONES CON PLATAFORMAS
    platforms.forEach((p) => {
      const isAbove =
        x + PLAYER_WIDTH > p.x &&
        x < p.x + p.w &&
        y + PLAYER_HEIGHT >= p.y &&
        y + PLAYER_HEIGHT <= p.y + 20;

      if (isAbove && velY > 0) {
        y = p.y - PLAYER_HEIGHT;
        grounded = true;
        velY = 0;
      }
    });

    setPlayer({ x, y, velY, grounded });
  };

  // -------------------------------------------------------
  // IA ENEMIGOS — PERSIGUEN AL JUGADOR
  // -------------------------------------------------------
  const updateEnemies = () => {
    setEnemies((prev) =>
      prev.map((e) => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;

        const dirX = Math.sign(dx);
        const dirY = Math.sign(dy);

        return {
          ...e,
          x: e.x + dirX * ENEMY_SPEED,
          y: e.y + dirY * 2.5,
        };
      })
    );
  };

  // -------------------------------------------------------
  // COLISIÓN JUGADOR - ENEMIGO
  // -------------------------------------------------------
  const checkCollisions = () => {
    enemies.forEach((e) => {
      const hit =
        player.x < e.x + ENEMY_SIZE &&
        player.x + PLAYER_WIDTH > e.x &&
        player.y < e.y + ENEMY_SIZE &&
        player.y + PLAYER_HEIGHT > e.y;

      if (hit) setGameOver(true);
    });
  };

  // -------------------------------------------------------
  // RESET
  // -------------------------------------------------------
  const reset = () => {
    setPlayer({ x: 200, y: 200, velY: 0, grounded: false });
    setEnemies([]);
    setTimeSurvived(0);
    setGameOver(false);
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    <div
      className="min-h-screen flex flex-col items-center py-8"
      style={{ backgroundColor: "#082129", color: "white" }}
    >
      <BackArrow to="/home" />

      <motion.h1 className="text-3xl font-bold text-emerald-400 mb-4">
        Tiempo sobrevivido: {timeSurvived}s
      </motion.h1>

      <div
        className="relative border border-white/20 rounded-3xl overflow-hidden"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
        }}
      >
        {/* Plataformas */}
        {platforms.map((p, i) => (
          <div
            key={i}
            className="absolute bg-emerald-500/70 rounded-xl"
            style={{
              left: p.x,
              top: p.y,
              width: p.w,
              height: p.h,
            }}
          />
        ))}

        {/* Jugador */}
        <img
          src={jugador}
          alt="player"
          className="absolute"
          style={{
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
            left: player.x,
            top: player.y,
            imageRendering: "pixelated",
          }}
        />

        {/* Enemigos */}
        {enemies.map((e, idx) => (
          <img
            key={idx}
            src={enemigoGif}
            alt="enemigo"
            className="absolute"
            style={{
              width: ENEMY_SIZE,
              height: ENEMY_SIZE,
              left: e.x,
              top: e.y,
              imageRendering: "pixelated",
            }}
          />
        ))}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <p className="text-white text-3xl font-bold">💀 Game Over</p>
            <p className="text-gray-200 mb-4">
              Has sobrevivido {timeSurvived}s
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-emerald-400 text-black rounded-xl font-bold"
            >
              Jugar otra vez 🔁
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
