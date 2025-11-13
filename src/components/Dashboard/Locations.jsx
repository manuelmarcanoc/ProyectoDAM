import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import BackArrow from "../common/BackArrow"; 

const vibbeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function Locations() {
  const locales = [
    {
      id: 1,
      nombre: "☕ Cafetería Paca",
      lat: 40.4168,
      lng: -3.7038,
      promo: "Croissant gratis con tu café",
    },
    {
      id: 2,
      nombre: "✂️ Peluquería Chelo",
      lat: 40.415,
      lng: -3.705,
      promo: "1 corte gratis por 500 puntos",
    },
    {
      id: 3,
      nombre: "🍕 Pizzería Bella",
      lat: 40.4175,
      lng: -3.701,
      promo: "2x1 en pizzas medianas",
    },
    {
      id: 4,
      nombre: "🏋️ Gimnasio FitZone",
      lat: 40.419,
      lng: -3.704,
      promo: "Primera clase gratuita",
    },
    {
      id: 5,
      nombre: "👟 Tienda UrbanStep",
      lat: 40.418,
      lng: -3.706,
      promo: "10% de descuento en sneakers",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 relative"
      style={{ backgroundColor: "#082129", color: "white" }}
    >
      {/* 🔙 Flecha de volver */}
      <BackArrow to="/home" />

      <motion.h1
        className="text-3xl font-bold text-emerald-400 mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Locales con promociones Vibbe 💚
      </motion.h1>

      <p className="text-gray-400 text-sm mb-6 text-center">
        Descubre los descuentos cercanos y canjea tus puntos por beneficios.
      </p>

      {/* 🗺️ MAPA INTERACTIVO */}
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={15}
        style={{
          height: "70vh",
          width: "90%",
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> colaboradores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locales.map((local) => (
          <Marker key={local.id} position={[local.lat, local.lng]} icon={vibbeIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-emerald-600">{local.nombre}</h3>
                <p className="text-sm text-gray-700 mt-1">{local.promo}</p>
                <button
                  className="mt-2 px-3 py-1 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                  onClick={() => alert(`Has seleccionado ${local.nombre}`)}
                >
                  Ver promoción
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
