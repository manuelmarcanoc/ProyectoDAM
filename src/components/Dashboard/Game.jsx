import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackArrow from "../common/BackArrow";

const TILE_SIZE_PX = 42;

const GAME_STATE = {
  MENU: "MENU",
  PLAYING: "PLAYING",
  LEVEL_COMPLETE: "LEVEL_COMPLETE",
  GAME_COMPLETE: "GAME_COMPLETE",
  GAME_OVER: "GAME_OVER",
};

const TILE = {
  EMPTY: ".",
  WALL: "#",
  PLAYER: "P",
  ENEMY: "E",
  GEM: "G",
  HEART: "H",
  EXIT: "X",
};

const LEVELS = [
  [
    "###########",
    "#P..G....X#",
    "#..###....#",
    "#..G......#",
    "#......E..#",
    "#....###..#",
    "#..H......#",
    "#......G..#",
    "###########",
  ],
  [
    "###########",
    "#P....G..X#",
    "#.###.###.#",
    "#..E...G..#",
    "#..###....#",
    "#G....H...#",
    "#..E..G...#",
    "#.....###.#",
    "###########",
  ],
  [
    "###########",
    "#P....G..X#",
    "#.###.###.#",
    "#..E..G..E#",
    "#..###....#",
    "#G....H..G#",
    "#..E..G..E#",
    "#.....###.#",
    "###########",
  ],
];

function parseLevel(levelData) {
  const rows = levelData.length;
  const cols = levelData[0].length;

  const walls = new Set();
  const enemies = [];
  let gems = [];
  let hearts = [];
  let exit = null;
  let player = null;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = levelData[y][x];
      const key = `${x},${y}`;

      if (ch === TILE.WALL) walls.add(key);
      if (ch === TILE.PLAYER) player = { x, y };
      if (ch === TILE.ENEMY) enemies.push({ id: `${x}-${y}-${Math.random()}`, x, y });
      if (ch === TILE.GEM) gems.push({ id: `${x}-${y}-${Math.random()}`, x, y });
      if (ch === TILE.HEART) hearts.push({ id: `${x}-${y}-${Math.random()}`, x, y });
      if (ch === TILE.EXIT) exit = { x, y };
    }
  }

  return {
    rows,
    cols,
    walls,
    enemies,
    gems,
    hearts,
    exit,
    player,
  };
}

export default function Game() {
  const [gameState, setGameState] = useState(GAME_STATE.MENU);
  const [levelIndex, setLevelIndex] = useState(0);

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [walls, setWalls] = useState(new Set());
  const [enemies, setEnemies] = useState([]);
  const [gems, setGems] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [exit, setExit] = useState(null);
  const [player, setPlayer] = useState({ x: 0, y: 0 });

  const [hp, setHp] = useState(5);
  const [maxHp] = useState(5);
  const [collectedGems, setCollectedGems] = useState(0);
  const [totalGems, setTotalGems] = useState(0);
  const [moves, setMoves] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // 🟢 **CARGAR NIVEL AUTOMÁTICAMENTE AL MONTAR EL COMPONENTE**
  useEffect(() => {
    loadLevel(0);
  }, []);

  const loadLevel = (index) => {
    const parsed = parseLevel(LEVELS[index]);
    setRows(parsed.rows);
    setCols(parsed.cols);
    setWalls(parsed.walls);
    setEnemies(parsed.enemies);
    setGems(parsed.gems);
    setHearts(parsed.hearts);
    setExit(parsed.exit);
    setPlayer(parsed.player || { x: 1, y: 1 });

    setCollectedGems(0);
    setTotalGems(parsed.gems.length);
    setMoves(0);
    setHp(maxHp);
  };

  const startGame = () => {
    setLevelIndex(0);
    loadLevel(0);
    setTotalScore(0);
    setGameState(GAME_STATE.PLAYING);
  };

  const startNextLevel = () => {
    const next = levelIndex + 1;
    if (next >= LEVELS.length) {
      setGameState(GAME_STATE.GAME_COMPLETE);
    } else {
      setLevelIndex(next);
      loadLevel(next);
      setGameState(GAME_STATE.PLAYING);
    }
  };

  const restartCurrentLevel = () => {
    loadLevel(levelIndex);
    setGameState(GAME_STATE.PLAYING);
  };

  const handleGameOver = () => {
    setGameState(GAME_STATE.GAME_OVER);
  };

  const tryMovePlayer = (dx, dy) => {
    if (gameState !== GAME_STATE.PLAYING) return;
    if (dx === 0 && dy === 0) return;

    const targetX = player.x + dx;
    const targetY = player.y + dy;
    const key = `${targetX},${targetY}`;

    if (targetX < 0 || targetX >= cols || targetY < 0 || targetY >= rows) return;
    if (walls.has(key)) return;

    let newPlayer = { x: targetX, y: targetY };
    let newGems = [...gems];
    let newHearts = [...hearts];
    let gainedGems = 0;
    let gainedHp = 0;
    let reachedExit = false;

    if (gems.some((g) => g.x === targetX && g.y === targetY)) {
      newGems = newGems.filter((g) => !(g.x === targetX && g.y === targetY));
      gainedGems = 1;
    }

    if (hearts.some((h) => h.x === targetX && h.y === targetY)) {
      newHearts = newHearts.filter((h) => !(h.x === targetX && h.y === targetY));
      gainedHp = 1;
    }

    if (exit && exit.x === targetX && exit.y === targetY) {
      reachedExit = true;
    }

    setPlayer(newPlayer);
    setGems(newGems);
    setHearts(newHearts);
    setMoves((m) => m + 1);

    if (gainedGems > 0) {
      setCollectedGems((c) => c + gainedGems);
      setTotalScore((s) => s + 50);
    }

    if (gainedHp > 0) {
      setHp((h) => Math.min(maxHp, h + gainedHp));
    }

    resolveEnemyTurn(newPlayer, newGems, reachedExit);
  };

  const resolveEnemyTurn = (playerPosAfterMove, gemsAfterMove, reachedExit) => {
    setEnemies((prevEnemies) => {
      const updatedEnemies = prevEnemies.map((e) => {
        const dx = playerPosAfterMove.x - e.x;
        const dy = playerPosAfterMove.y - e.y;

        let stepX = 0;
        let stepY = 0;

        if (Math.abs(dx) > Math.abs(dy)) {
          stepX = dx > 0 ? 1 : -1;
        } else if (Math.abs(dy) > 0) {
          stepY = dy > 0 ? 1 : -1;
        }

        const tx = e.x + stepX;
        const ty = e.y + stepY;
        const key = `${tx},${ty}`;

        if (walls.has(key)) return { ...e };

        return { ...e, x: tx, y: ty };
      });

      // Daño
      let damage = 0;
      updatedEnemies.forEach((e) => {
        if (e.x === playerPosAfterMove.x && e.y === playerPosAfterMove.y) {
          damage += 1;
        }
      });

      if (damage > 0) {
        setHp((oldHp) => {
          const newHp = oldHp - damage;
          if (newHp <= 0) handleGameOver();
          return newHp;
        });
      }

      // Fin del nivel
      const noGemsLeft = gemsAfterMove.length === 0;
      if (reachedExit && noGemsLeft) {
        setTotalScore((s) => s + 200);
        setGameState(GAME_STATE.LEVEL_COMPLETE);
      }

      return updatedEnemies;
    });
  };

  // Controles teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState === GAME_STATE.MENU && e.code === "Enter") {
        startGame();
        return;
      }

      if (
        (gameState === GAME_STATE.GAME_OVER ||
          gameState === GAME_STATE.GAME_COMPLETE ||
          gameState === GAME_STATE.LEVEL_COMPLETE) &&
        e.code === "Enter"
      ) {
        if (gameState === GAME_STATE.LEVEL_COMPLETE) {
          startNextLevel();
        } else {
          startGame();
        }
        return;
      }

      if (gameState !== GAME_STATE.PLAYING) return;

      if (e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        tryMovePlayer(0, -1);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        tryMovePlayer(0, 1);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        e.preventDefault();
        tryMovePlayer(-1, 0);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        tryMovePlayer(1, 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Render tile
  const renderTileContent = (x, y) => {
    const isWall = walls.has(`${x},${y}`);
    if (isWall) {
      return (
        <div className="w-full h-full bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-500 text-xs">
          ■
        </div>
      );
    }

    if (player.x === x && player.y === y) {
      return (
        <motion.div
          className="w-full h-full flex items-center justify-center rounded-lg bg-emerald-400 text-slate-900 font-bold"
          layoutId="player"
        >
          🙂
        </motion.div>
      );
    }

    if (exit && exit.x === x && exit.y === y) {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-lg bg-indigo-500/70 text-white text-lg">
          ⛩️
        </div>
      );
    }

    if (gems.some((g) => g.x === x && g.y === y)) {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-lg bg-yellow-300/80 text-yellow-900">
          💎
        </div>
      );
    }

    if (hearts.some((h) => h.x === x && h.y === y)) {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-lg bg-rose-400/80 text-rose-950">
          ❤
        </div>
      );
    }

    if (enemies.some((e) => e.x === x && e.y === y)) {
      return (
        <div className="w-full h-full flex items-center justify-center rounded-lg bg-red-500/80 text-red-50">
          👾
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-slate-900/80 border border-slate-800/60" />
    );
  };

  const hpHearts = [];
  for (let i = 0; i < maxHp; i++) {
    hpHearts.push(
      <span key={i} className={i < hp ? "text-rose-400" : "text-slate-700"}>
        ❤
      </span>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center py-6 px-3"
      style={{ backgroundColor: "#020617", color: "white" }}
    >
      <BackArrow to="/home" />

      <motion.h1
        className="text-3xl font-extrabold mt-4 mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-center"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Crystal Dungeons
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
        <div className="px-3 py-1 bg-slate-900/70 rounded-full border border-slate-700/70">
          Nivel:{" "}
          <span className="font-semibold text-emerald-400">
            {levelIndex + 1}/{LEVELS.length}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-900/70 rounded-full border border-slate-700/70">
          Vida: <span className="ml-1">{hpHearts}</span>
        </div>
        <div className="px-3 py-1 bg-slate-900/70 rounded-full border border-slate-700/70">
          Gemas:{" "}
          <span className="font-semibold text-yellow-300">
            {collectedGems}/{totalGems}
          </span>
        </div>
        <div className="px-3 py-1 bg-slate-900/70 rounded-full border border-slate-700/70">
          Movimientos: <span className="font-semibold">{moves}</span>
        </div>
        <div className="px-3 py-1 bg-slate-900/70 rounded-full border border-slate-700/70">
          Puntos totales:{" "}
          <span className="font-semibold text-cyan-300">
            {Math.round(totalScore)}
          </span>
        </div>
      </div>

      {/* SOLO RENDERIZAR TABLERO SI rows > 0 */}
      {rows > 0 && cols > 0 && (
        <div
          className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.35)] border border-emerald-500/30 bg-slate-950/80"
          style={{
            width: cols * TILE_SIZE_PX,
            maxWidth: "100%",
          }}
        >
          {/* Grid */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: rows }).map((_, y) =>
              Array.from({ length: cols }).map((_, x) => (
                <div
                  key={`${x}-${y}`}
                  style={{ width: TILE_SIZE_PX, height: TILE_SIZE_PX }}
                  className="relative"
                >
                  {renderTileContent(x, y)}
                </div>
              ))
            )}
          </div>

          {/* MENU */}
          {gameState === GAME_STATE.MENU && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm text-center px-6">
              <h2 className="text-2xl font-bold mb-2 text-emerald-400">
                Bienvenido al calabozo
              </h2>
              <p className="text-sm text-gray-200 mb-2">
                Muévete por el tablero, recoge todas las gemas 💎 y llega a la salida ⛩️.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Controles: WASD o flechas · En móvil usa los botones de abajo.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-emerald-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-emerald-300"
              >
                Empezar partida
              </button>
            </div>
          )}

          {/* NIVEL COMPLETADO */}
          {gameState === GAME_STATE.LEVEL_COMPLETE && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm text-center px-6">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                ¡Nivel completado!
              </h2>
              <p className="text-sm text-gray-200 mb-3">
                Puntos actuales:{" "}
                <span className="font-semibold text-cyan-300">
                  {Math.round(totalScore)}
                </span>
              </p>
              <button
                onClick={startNextLevel}
                className="px-6 py-2 bg-emerald-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-emerald-300"
              >
                Siguiente nivel
              </button>
            </div>
          )}

          {/* JUEGO COMPLETADO */}
          {gameState === GAME_STATE.GAME_COMPLETE && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm text-center px-6">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                ¡Has completado todos los niveles! 🎉
              </h2>
              <p className="text-sm text-gray-200 mb-3">
                Puntuación final:{" "}
                <span className="font-semibold text-cyan-300">
                  {Math.round(totalScore)}
                </span>
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-emerald-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-emerald-300"
              >
                Volver a jugar
              </button>
            </div>
          )}

          {/* GAME OVER */}
          {gameState === GAME_STATE.GAME_OVER && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm text-center px-6">
              <h2 className="text-2xl font-bold text-rose-400 mb-2">
                Game Over
              </h2>
              <p className="text-sm text-gray-200 mb-3">
                Te han cazado en el nivel {levelIndex + 1}.
              </p>
              <p className="text-sm text-gray-200 mb-4">
                Puntuación:{" "}
                <span className="font-semibold text-cyan-300">
                  {Math.round(totalScore)}
                </span>
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={restartCurrentLevel}
                  className="px-5 py-2 bg-emerald-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-emerald-300"
                >
                  Reintentar nivel
                </button>
                <button
                  onClick={startGame}
                  className="px-5 py-2 border border-gray-500 text-gray-100 rounded-full font-semibold text-sm hover:bg-slate-800"
                >
                  Empezar desde el principio
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BOTONES táctiles */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => tryMovePlayer(0, -1)}
            className="px-8 py-2 rounded-xl bg-slate-800 text-gray-100 text-sm border border-slate-600 active:scale-95"
          >
            ↑
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => tryMovePlayer(-1, 0)}
            className="px-6 py-2 rounded-xl bg-slate-800 text-gray-100 text-sm border border-slate-600 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => tryMovePlayer(1, 0)}
            className="px-6 py-2 rounded-xl bg-slate-800 text-gray-100 text-sm border border-slate-600 active:scale-95"
          >
            →
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => tryMovePlayer(0, 1)}
            className="px-8 py-2 rounded-xl bg-slate-800 text-gray-100 text-sm border border-slate-600 active:scale-95"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}
