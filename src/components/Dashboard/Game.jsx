import React, { useEffect, useState } from "react";
import BackArrow from "../common/BackArrow";
import { motion } from "framer-motion";

export default function Game() {
  const [loading, setLoading] = useState(true);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [playerHp, setPlayerHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);

  // 🔥 Obtener Pokémon aleatorio
  const fetchRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 151) + 1; // Gen 1
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.json();
  };

  // 🔥 Cargar Pokémon del jugador y enemigo
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const poke1 = await fetchRandomPokemon();
      const poke2 = await fetchRandomPokemon();

      setPlayerPokemon(poke1);
      setEnemyPokemon(poke2);

      setPlayerHp(poke1.stats[0].base_stat * 2);
      setEnemyHp(poke2.stats[0].base_stat * 2);

      setBattleLog([]);
      setWinner(null);

      setLoading(false);
    };

    load();
  }, []);

  // 🎮 Atacar
  const attack = () => {
    if (winner) return;

    const dmgPlayer =
      Math.floor(Math.random() * 18) +
      Math.floor(playerPokemon.stats[1].base_stat / 10);

    const dmgEnemy =
      Math.floor(Math.random() * 15) +
      Math.floor(enemyPokemon.stats[1].base_stat / 12);

    setEnemyHp((hp) => Math.max(0, hp - dmgPlayer));
    setPlayerHp((hp) => Math.max(0, hp - dmgEnemy));

    setBattleLog((l) => [
      `Tu ${playerPokemon.name} inflige ${dmgPlayer} de daño.`,
      `${enemyPokemon.name} responde con ${dmgEnemy}.`,
      ...l,
    ]);

    // ¿Victoria?
    if (enemyHp - dmgPlayer <= 0) {
      setWinner("player");
    }

    // ¿Derrota?
    if (playerHp - dmgEnemy <= 0) {
      setWinner("enemy");
    }
  };

  // 🔄 Reiniciar partida
  const restart = () => {
    window.location.reload();
  };

  if (loading || !playerPokemon || !enemyPokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="text-xl"
        >
          🔄 Cargando Pokémon...
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white px-6 py-6"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #0f766e 0%, #082f49 60%, #020617 100%)",
      }}
    >
      <BackArrow to="/home" />

      <motion.h1
        className="text-center text-3xl mb-6 font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-300 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🟢 Batalla Pokémon Demo
      </motion.h1>

      {/* Campo de batalla */}
      <div className="max-w-3xl mx-auto p-4 bg-slate-900/60 rounded-3xl border border-emerald-400/30 backdrop-blur-xl shadow-xl">
        {/* Pokémon enemigo */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-red-300">{enemyPokemon.name.toUpperCase()}</p>
          
          <motion.img
            key={enemyPokemon.id}
            src={enemyPokemon.sprites.front_default}
            className="mx-auto w-32 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          />

          <div className="mt-2 w-60 mx-auto bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-red-500 h-full"
              animate={{ width: `${(enemyHp / (enemyPokemon.stats[0].base_stat * 2)) * 100}%` }}
            />
          </div>
        </div>

        {/* Pokémon del jugador */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-emerald-300">{playerPokemon.name.toUpperCase()}</p>

          <motion.img
            key={playerPokemon.id}
            src={playerPokemon.sprites.front_default}
            className="mx-auto w-32 drop-shadow-[0_0_20px_rgba(52,211,153,0.6)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          />

          <div className="mt-2 w-60 mx-auto bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-emerald-400 h-full"
              animate={{ width: `${(playerHp / (playerPokemon.stats[0].base_stat * 2)) * 100}%` }}
            />
          </div>
        </div>

        {/* Botón ATACAR */}
        {!winner && (
          <motion.button
            onClick={attack}
            whileTap={{ scale: 0.9 }}
            className="w-full py-3 mt-4 font-bold text-black bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 rounded-xl shadow-xl"
          >
            ⚔️ ATACAR
          </motion.button>
        )}

        {/* Resultado */}
        {winner && (
          <div className="text-center mt-6">
            {winner === "player" ? (
              <p className="text-2xl font-bold text-emerald-400">
                🎉 ¡Has ganado!
              </p>
            ) : (
              <p className="text-2xl font-bold text-red-400">
                💀 Has perdido...
              </p>
            )}

            <button
              onClick={restart}
              className="mt-4 px-6 py-2 bg-slate-800 border border-slate-600 rounded-xl"
            >
              Jugar otra vez
            </button>
          </div>
        )}

        {/* Log */}
        <div className="mt-6 bg-slate-950/50 p-4 rounded-xl h-40 overflow-auto text-sm border border-slate-700">
          {battleLog.map((line, idx) => (
            <p key={idx} className="text-gray-300">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
