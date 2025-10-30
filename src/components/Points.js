import React from "react";

export default function Points() {
  const puntos = 120; // Datos simulados

  return (
    <div>
      <h3>Tus puntos actuales</h3>
      <p className="points">{puntos}</p>
      <button>Canjear puntos</button>
    </div>
  );
}
