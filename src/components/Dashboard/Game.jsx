import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import BackArrow from "../common/BackArrow";

// ------------------------------------------
// CONFIG GLOBAL
// ------------------------------------------

// Nivel del usuario (en una app real vendría del perfil / BD)
const USER_LEVEL = 6;

// Tiempo de animación de ataque/daño
const ATTACK_ANIM_TIME = 500;

// Probabilidad de activar carga especial (ataque buffado)
const SPECIAL_CHARGE_CHANCE = 0.15;

// Pokémon disponibles para que el usuario elija (ids concretos)
const CANDIDATE_IDS = [1, 4, 7, 25, 39, 52, 63, 94, 131, 143, 150];

// Pasos de la interfaz
const STEP = {
  CHOOSE_POKEMON: "CHOOSE_POKEMON",
  CHOOSE_MOVES: "CHOOSE_MOVES",
  BATTLE: "BATTLE",
};

// ------------------------------------------
// HELPERS
// ------------------------------------------

// Sprite oficial de cada Pokémon
function getOfficialSprite(pokemon) {
  return (
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    ""
  );
}

// Capitalizar nombres
function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Hash simple para generar un número a partir de un string
function hashString(str) {
  let hash = 0;
  for (const ch of str) {
    hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  }
  return Math.abs(hash);
}

// A partir del id de comercio, generamos un id de Pokémon estable
function getPokemonIdForCommerce(commerceId) {
  const h = hashString(commerceId || "default-commerce");
  // limitamos a primera generación (1–151)
  return (h % 151) + 1;
}

// Escala de porcentaje de vida
function hpPercent(current, max) {
  if (max <= 0) return 0;
  return (current / max) * 100;
}

// Selección de ataques según nivel del usuario
function buildMovesFromPokemon(pokemon) {
  if (!pokemon?.moves?.length) return [];

  const raw = pokemon.moves
    .map((m) => m.move?.name)
    .filter(Boolean)
    .slice(0, 60);

  const shuffled = [...raw].sort(() => Math.random() - 0.5);

  const moves = shuffled.slice(0, 20).map((name, idx) => {
    const basePower = 20 + Math.floor(Math.random() * 50);

    const levelMultiplier =
      USER_LEVEL <= 3 ? 0.7 : USER_LEVEL <= 6 ? 1.0 : 1.5;

    return {
      id: `${name}-${idx}-${pokemon.id}`,
      name: capitalize(name.replace(/-/g, " ")),
      power: Math.floor(basePower * levelMultiplier),
      accuracy: 80 + Math.floor(Math.random() * 20),
      type: ["fire", "electric", "impact"][
        Math.floor(Math.random() * 3)
      ], // solo para estilos si quisieras
    };
  });

  return moves;
}

// Daño simplificado
function calculateDamage(attacker, defender, move) {
  const base = move.power || 20;
  const atk = attacker.stats[1].base_stat; // Attack
  const def = defender.stats[2].base_stat; // Defense
  const variance = 0.85 + Math.random() * 0.3; // 0.85–1.15
  let dmg = Math.floor(((base * atk) / (def + 30)) * variance);
  if (dmg < 8) dmg = 8;
  return dmg;
}

// ------------------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------------------

export default function Game() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commerceId = searchParams.get("commerce") || "demo-commerce";

  // Paso actual
  const [step, setStep] = useState(STEP.CHOOSE_POKEMON);

  // Lista de Pokémon para elegir
  const [pokemonChoices, setPokemonChoices] = useState([]);
  const [loadingChoices, setLoadingChoices] = useState(true);
  const [choicesError, setChoicesError] = useState(null);

  // Pokémon jugador y enemigo
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);

  // Movimientos jugador y enemigo
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [enemyMoves, setEnemyMoves] = useState([]);

  // Vida
  const [playerHp, setPlayerHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(0);
  const [playerMaxHp, setPlayerMaxHp] = useState(0);
  const [enemyMaxHp, setEnemyMaxHp] = useState(0);

  // Combate
  const [turn, setTurn] = useState("PLAYER");
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [loadingBattle, setLoadingBattle] = useState(false);

  // Animaciones
  const [playerAnim, setPlayerAnim] = useState(null);
  const [enemyAnim, setEnemyAnim] = useState(null);

  // Carga especial
  const [specialCharge, setSpecialCharge] = useState(false);

  // Puntos y cofre diario
  const [points, setPoints] = useState(0);
  const [dailyChestOpened, setDailyChestOpened] = useState(false);
  const [lastChestReward, setLastChestReward] = useState(null);

  // ------------------------------------------
  // COFRE DIARIO (localStorage)
  // ------------------------------------------

  useEffect(() => {
    const storedPoints = localStorage.getItem("vibbe_run_points");
    if (storedPoints) {
      setPoints(parseInt(storedPoints, 10) || 0);
    }

    const chestDate = localStorage.getItem("vibbe_daily_chest_date");
    const today = new Date().toISOString().slice(0, 10);
    if (chestDate === today) {
      setDailyChestOpened(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vibbe_run_points", String(points));
  }, [points]);

  const handleOpenChest = () => {
    if (dailyChestOpened) return;
    const reward = 50 + Math.floor(Math.random() * 101); // 50–150
    setPoints((p) => p + reward);
    setLastChestReward(reward);
    setDailyChestOpened(true);
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("vibbe_daily_chest_date", today);
  };

  // ------------------------------------------
  // Carga de Pokémon base
  // ------------------------------------------

  useEffect(() => {
    const loadChoices = async () => {
      try {
        setLoadingChoices(true);
        setChoicesError(null);

        const promises = CANDIDATE_IDS.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) =>
            r.json()
          )
        );
        const results = await Promise.all(promises);
        setPokemonChoices(results);
      } catch (err) {
        console.error(err);
        setChoicesError(
          "No se pudieron cargar los Pokémon. Recarga la página."
        );
      } finally {
        setLoadingChoices(false);
      }
    };

    loadChoices();
  }, []);

  // ------------------------------------------
  // PASO 1: Elegir Pokémon del jugador
  // ------------------------------------------

  const handleSelectPokemon = (poke) => {
    setSelectedPokemon(poke);
    const moves = buildMovesFromPokemon(poke);
    setAvailableMoves(moves);
    setSelectedMoves([]);
    setStep(STEP.CHOOSE_MOVES);
  };

  // ------------------------------------------
  // PASO 2: Elegir movimientos
  // ------------------------------------------

  const toggleMove = (move) => {
    const already = selectedMoves.find((m) => m.id === move.id);
    if (already) {
      setSelectedMoves(selectedMoves.filter((m) => m.id !== move.id));
    } else {
      if (selectedMoves.length >= 4) return;
      setSelectedMoves([...selectedMoves, move]);
    }
  };

  const canConfirmMoves = selectedMoves.length === 4;

  const startBattle = async () => {
    if (!selectedPokemon || !canConfirmMoves) return;
    setLoadingBattle(true);
    setWinner(null);
    setBattleLog([]);
    setTurn("PLAYER");
    setSpecialCharge(false);

    try {
      const enemyId = getPokemonIdForCommerce(commerceId);
      const enemy = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${enemyId}`
      ).then((r) => r.json());

      const enemyMv = buildMovesFromPokemon(enemy).slice(0, 4);

      setEnemyPokemon(enemy);
      setEnemyMoves(enemyMv);

      const playerHpBase = selectedPokemon.stats[0].base_stat * 3;
      const enemyHpBase = enemy.stats[0].base_stat * 3;

      setPlayerHp(playerHpBase);
      setPlayerMaxHp(playerHpBase);
      setEnemyHp(enemyHpBase);
      setEnemyMaxHp(enemyHpBase);

      setBattleLog([
        `Te enfrentas a ${capitalize(enemy.name)} en el comercio "${commerceId}".`,
        "Elige tu ataque.",
      ]);

      setStep(STEP.BATTLE);
    } catch (err) {
      console.error(err);
      setBattleLog(["Error al iniciar la batalla."]);
    } finally {
      setLoadingBattle(false);
    }
  };

  // ------------------------------------------
  // Turno del jugador
  // ------------------------------------------

  const handlePlayerAttack = (move) => {
    if (winner || loadingBattle || turn !== "PLAYER") return;
    if (!enemyPokemon || !selectedPokemon) return;

    // animación ataque jugador
    setPlayerAnim("attack");
    setTimeout(() => setPlayerAnim(null), ATTACK_ANIM_TIME);

    // ¿Carga especial?
    if (!specialCharge && Math.random() < SPECIAL_CHARGE_CHANCE) {
      setSpecialCharge(true);
      setBattleLog((prev) => [
        "🟢 ¡Energía especial acumulada! Próximo ataque hará +70%",
        ...prev,
      ]);
    }

    const hitRoll = Math.random() * 100;
    const logEntries = [];

    if (hitRoll > move.accuracy) {
      logEntries.push(
        `Tu ${capitalize(selectedPokemon.name)} usa ${move.name}... ¡y falla!`
      );
      setBattleLog((prev) => [...logEntries, ...prev]);
      setTurn("ENEMY");
      setTimeout(enemyTurn, 700);
      return;
    }

    let damage = calculateDamage(selectedPokemon, enemyPokemon, move);

    if (specialCharge) {
      damage = Math.floor(damage * 1.7);
      setSpecialCharge(false);
      logEntries.push("💥 ¡Ataque potenciado por energía especial!");
    }

    // animación daño enemigo
    setEnemyAnim("hit");
    setTimeout(() => setEnemyAnim(null), ATTACK_ANIM_TIME);

    setEnemyHp((prev) => {
      const newHp = Math.max(0, prev - damage);
      logEntries.push(
        `Tu ${capitalize(selectedPokemon.name)} usa ${move.name} y hace ${damage} de daño.`
      );
      setBattleLog((prevLog) => [...logEntries, ...prevLog]);

      if (newHp <= 0) {
        setWinner("PLAYER");
        setBattleLog((prevLog) => [
          `🎉 ¡Has derrotado a ${capitalize(enemyPokemon.name)}! (aquí podrías dar un descuento del comercio)`,
          ...prevLog,
        ]);
        return 0;
      }

      setTurn("ENEMY");
      setTimeout(enemyTurn, 800);
      return newHp;
    });
  };

  // ------------------------------------------
  // Turno del enemigo
  // ------------------------------------------

  const enemyTurn = () => {
    if (winner || !enemyPokemon || !enemyMoves.length || !selectedPokemon)
      return;

    const move =
      enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
    if (!move) return;

    // animación ataque enemigo
    setEnemyAnim("attack");
    setTimeout(() => setEnemyAnim(null), ATTACK_ANIM_TIME);

    const hitRoll = Math.random() * 100;
    const logEntries = [];

    if (hitRoll > move.accuracy) {
      logEntries.push(
        `${capitalize(enemyPokemon.name)} intenta ${move.name}... ¡pero falla!`
      );
      setBattleLog((prev) => [...logEntries, ...prev]);
      setTurn("PLAYER");
      return;
    }

    const damage = calculateDamage(enemyPokemon, selectedPokemon, move);

    // animación daño jugador
    setPlayerAnim("hit");
    setTimeout(() => setPlayerAnim(null), ATTACK_ANIM_TIME);

    setPlayerHp((prev) => {
      const newHp = Math.max(0, prev - damage);
      logEntries.push(
        `${capitalize(enemyPokemon.name)} usa ${move.name} y te hace ${damage} de daño.`
      );
      setBattleLog((prevLog) => [...logEntries, ...prevLog]);

      if (newHp <= 0) {
        setWinner("ENEMY");
        setBattleLog((prevLog) => [
          `💀 Has sido derrotado por ${capitalize(enemyPokemon.name)}.`,
          ...prevLog,
        ]);
        return 0;
      }

      setTurn("PLAYER");
      return newHp;
    });
  };

  // ------------------------------------------
  // Reiniciar todo el flujo
  // ------------------------------------------

  const restartGameFlow = () => {
    setStep(STEP.CHOOSE_POKEMON);
    setSelectedPokemon(null);
    setEnemyPokemon(null);
    setAvailableMoves([]);
    setSelectedMoves([]);
    setEnemyMoves([]);
    setPlayerHp(0);
    setEnemyHp(0);
    setPlayerMaxHp(0);
    setEnemyMaxHp(0);
    setBattleLog([]);
    setWinner(null);
    setTurn("PLAYER");
    setSpecialCharge(false);
  };

  // ======================================================================
  // RENDER
  // ======================================================================

  return (
    <div
      className="min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#020617", color: "white" }}
    >
      <BackArrow to="/home" />

      {/* Fondo suave */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(34,197,94,0.2),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(56,189,248,0.2),transparent_55%)]" />

      {/* Header */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold mt-4 mb-2 text-center bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(52,211,153,0.6)]"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Vibbe Run · PokéDemo
      </motion.h1>

      <p className="text-xs sm:text-sm text-gray-300 mb-3 text-center">
        Comercio actual:{" "}
        <span className="text-emerald-300 font-semibold">
          {commerceId}
        </span>
      </p>

      {/* Cofre diario */}
      <motion.div
        className="w-full max-w-xl mb-4 rounded-2xl bg-slate-900/80 border border-yellow-400/40 shadow-[0_0_25px_rgba(250,204,21,0.3)] px-4 py-3 flex items-center justify-between gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎁</span>
          <div>
            <p className="text-sm font-semibold text-yellow-300">
              Cofre diario
            </p>
            <p className="text-xs text-gray-300">
              {dailyChestOpened
                ? "Ya has abierto el cofre hoy. ¡Vuelve mañana!"
                : "Ábrelo para conseguir puntos extra Vibbe."}
            </p>
            {lastChestReward && (
              <p className="text-xs text-emerald-300">
                Última recompensa: +{lastChestReward} pts
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            disabled={dailyChestOpened}
            onClick={handleOpenChest}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              dailyChestOpened
                ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-900 hover:opacity-90"
            }`}
          >
            {dailyChestOpened ? "Cofre abierto" : "Abrir cofre"}
          </button>
          <p className="text-[0.65rem] text-gray-300">
            Puntos Vibbe Run:{" "}
            <span className="text-emerald-300 font-semibold">
              {points}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Contenedor principal del juego */}
      <div className="w-full max-w-4xl bg-slate-950/80 border border-emerald-500/30 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.45)] backdrop-blur-2xl p-4 sm:p-6">
        {/* PASO 1: ELEGIR POKÉMON */}
        {step === STEP.CHOOSE_POKEMON && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-emerald-300 text-center">
              1 · Elige tu Pokémon
            </h2>

            {loadingChoices && (
              <p className="text-center text-gray-300">
                Cargando Pokémon...
              </p>
            )}
            {choicesError && (
              <p className="text-center text-red-400 text-sm mb-3">
                {choicesError}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pokemonChoices.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPokemon(p)}
                  className="bg-slate-900/80 border border-slate-700 rounded-2xl p-3 flex flex-col items-center hover:border-emerald-400 hover:bg-slate-900 transition shadow-md"
                >
                  <img
                    src={getOfficialSprite(p)}
                    alt={p.name}
                    className="w-20 h-20 object-contain mb-2 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                  />
                  <span className="font-semibold text-sm">
                    {capitalize(p.name)}
                  </span>
                  <span className="text-xs text-gray-400">
                    HP base: {p.stats[0].base_stat}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[0.7rem] text-gray-400 mt-4 text-center">
              En una versión real, tu Pokémon podría depender de tu nivel,
              logros o tipo de comercio que visitas.
            </p>
          </div>
        )}

        {/* PASO 2: ELEGIR MOVIMIENTOS */}
        {step === STEP.CHOOSE_MOVES && selectedPokemon && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-emerald-300 text-center">
              2 · Elige tus 4 ataques
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
              <img
                src={getOfficialSprite(selectedPokemon)}
                alt={selectedPokemon.name}
                className="w-24 h-24 object-contain drop-shadow-[0_0_18px_rgba(52,211,153,0.7)]"
              />
              <div>
                <p className="text-lg font-semibold">
                  {capitalize(selectedPokemon.name)}
                </p>
                <p className="text-sm text-gray-300">
                  Vida base: {selectedPokemon.stats[0].base_stat}
                </p>
                <p className="text-sm text-gray-400">
                  Ataque: {selectedPokemon.stats[1].base_stat} · Defensa:{" "}
                  {selectedPokemon.stats[2].base_stat}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Tu nivel de usuario ({USER_LEVEL}) hace que algunos ataques sean
                  más potentes.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-2">
              Haz clic para seleccionar/deseleccionar ataques (
              {selectedMoves.length}/4):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {availableMoves.map((m) => {
                const isSelected = selectedMoves.some(
                  (s) => s.id === m.id
                );
                const disabled =
                  !isSelected && selectedMoves.length >= 4;
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleMove(m)}
                    disabled={disabled}
                    className={`text-left p-3 rounded-2xl border text-sm transition
                      ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-400"
                          : "bg-slate-900/80 border-slate-700 hover:border-emerald-300"
                      }
                      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                  >
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-xs text-gray-300">
                      Potencia: {m.power} · Precisión: {m.accuracy}%
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setStep(STEP.CHOOSE_POKEMON)}
                className="px-4 py-2 rounded-xl text-sm border border-slate-500 text-gray-200 hover:bg-slate-800"
              >
                Volver a elegir Pokémon
              </button>
              <button
                onClick={startBattle}
                disabled={!canConfirmMoves || loadingBattle}
                className={`px-5 py-2 rounded-xl text-sm font-semibold 
                  ${
                    canConfirmMoves
                      ? "bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-gray-900 shadow-lg"
                      : "bg-slate-700 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {loadingBattle ? "Preparando batalla..." : "Empezar batalla"}
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: BATALLA */}
        {step === STEP.BATTLE &&
          selectedPokemon &&
          enemyPokemon && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-emerald-300">
                3 · Batalla en el comercio
              </h2>

              <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                {/* ENEMIGO */}
                <div className="flex-1 text-center">
                  <p className="text-sm text-red-300 mb-1">Enemigo</p>
                  <p className="text-lg font-semibold mb-1">
                    {capitalize(enemyPokemon.name)}
                  </p>
                  <motion.img
                    src={getOfficialSprite(enemyPokemon)}
                    alt={enemyPokemon.name}
                    className="w-28 h-28 mx-auto mb-2"
                    animate={
                      enemyAnim === "hit"
                        ? { x: [-8, 8, -8, 0], opacity: [1, 0.3, 1] }
                        : enemyAnim === "attack"
                        ? { x: [0, -20, 0] }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  />
                  <div className="w-40 mx-auto bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${hpPercent(enemyHp, enemyMaxHp)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    HP: {enemyHp} / {enemyMaxHp}
                  </p>
                </div>

                {/* JUGADOR */}
                <div className="flex-1 text-center">
                  <p className="text-sm text-emerald-300 mb-1">Tú</p>
                  <p className="text-lg font-semibold mb-1">
                    {capitalize(selectedPokemon.name)}
                  </p>
                  <motion.img
                    src={getOfficialSprite(selectedPokemon)}
                    alt={selectedPokemon.name}
                    className={`w-28 h-28 mx-auto mb-2 ${
                      specialCharge
                        ? "drop-shadow-[0_0_20px_#22c55e]"
                        : ""
                    }`}
                    animate={
                      playerAnim === "attack"
                        ? { x: [0, 20, 0] }
                        : playerAnim === "hit"
                        ? {
                            x: [-8, 8, -8, 0],
                            opacity: [1, 0.3, 1],
                          }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  />
                  <div className="w-40 mx-auto bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400"
                      style={{
                        width: `${hpPercent(playerHp, playerMaxHp)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    HP: {playerHp} / {playerMaxHp}
                  </p>
                </div>
              </div>

              {/* ESTADO / TURNO */}
              <div className="mb-3 text-center text-sm">
                {!winner ? (
                  <p className="text-gray-200">
                    Turno:{" "}
                    <span
                      className={
                        turn === "PLAYER"
                          ? "text-emerald-300"
                          : "text-red-300"
                      }
                    >
                      {turn === "PLAYER"
                        ? "Tu turno"
                        : "Turno enemigo"}
                    </span>
                  </p>
                ) : winner === "PLAYER" ? (
                  <p className="text-emerald-300 font-semibold text-lg">
                    🎉 ¡Has ganado la batalla!
                    <span className="block text-xs text-gray-300 mt-1">
                      (Aquí podrías desbloquear un descuento para este
                      comercio.)
                    </span>
                  </p>
                ) : (
                  <p className="text-red-300 font-semibold text-lg">
                    💀 Has perdido...
                  </p>
                )}
              </div>

              {/* CARGA ESPECIAL */}
              {specialCharge && (
                <p className="text-center text-emerald-300 text-sm mb-2 animate-pulse">
                  🟢 Energía acumulada: tu próximo ataque hará un 70%
                  más de daño.
                </p>
              )}

              {/* MOVIMIENTOS */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {selectedMoves.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handlePlayerAttack(m)}
                    disabled={
                      turn !== "PLAYER" ||
                      !!winner ||
                      loadingBattle ||
                      playerHp <= 0
                    }
                    className={`text-left px-3 py-2 rounded-xl text-xs sm:text-sm border transition
                      ${
                        turn === "PLAYER" && !winner
                          ? "bg-slate-900/70 border-emerald-400/60 hover:bg-emerald-500/15"
                          : "bg-slate-800/80 border-slate-600 opacity-70 cursor-not-allowed"
                      }
                    `}
                  >
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-[0.7rem] text-gray-300">
                      Potencia: {m.power} · Precisión: {m.accuracy}%
                    </p>
                  </button>
                ))}
              </div>

              {/* BOTÓN REINICIAR FLUJO */}
              {winner && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={restartGameFlow}
                    className="px-5 py-2 rounded-xl text-sm border border-slate-500 text-gray-200 hover:bg-slate-800"
                  >
                    Volver a elegir Pokémon
                  </button>
                </div>
              )}

              {/* LOG */}
              <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-3 h-44 overflow-auto text-xs">
                {battleLog.map((line, idx) => (
                  <p key={idx} className="text-gray-200 mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
