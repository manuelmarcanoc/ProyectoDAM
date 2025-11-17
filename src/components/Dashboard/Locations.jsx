// 💚💚💚  CÓDIGO PULIDO Y MEJORADO  💚💚💚

import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import BackArrow from "../common/BackArrow";
import "leaflet/dist/leaflet.css";

// ====================== NUEVO ICONO PROFESIONAL ======================
const vibbeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png", // icono redondo tipo Uber
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -40],
});

// Usuario con glow verde
const userIcon = new L.DivIcon({
  className: "user-marker",
  html: `<div style="
    width:16px;height:16px;background:#4ade80;
    border-radius:50%;
    box-shadow:0 0 15px #4ade80;
    border:2px solid #022c22;
  "></div>`,
});

// ====================== HELPERS ======================

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 16, { duration: 1.2 });
  }, [coords]);
  return null;
}

function FlyToUser({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 15, { duration: 1.3 });
  }, [coords]);
  return null;
}

// ====================== COMPONENTE ======================

export default function Locations() {
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  // 🔥 He añadido MUCHOS LOCALES NUEVOS y mejorado la variedad
  const locales = [
    // Madrid
    {
      id: "madrid-paca",
      nombre: "Cafetería Paca",
      emoji: "☕",
      lat: 40.4168,
      lng: -3.7038,
      promo: "Croissant gratis con tu café",
      categoria: "comida",
      direccion: "C/ Mayor 12, Madrid",
      imagen:
        "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?w=800",
      horario: "8:00 - 20:00",
    },
    {
      id: "madrid-bella",
      nombre: "Pizzería Bella",
      emoji: "🍕",
      lat: 40.4175,
      lng: -3.701,
      promo: "2x1 en pizzas medianas",
      categoria: "comida",
      direccion: "Plaza Italia 3, Madrid",
      imagen:
        "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?w=800",
      horario: "13:00 - 23:30",
    },

    // Barcelona
    {
      id: "bcn-gaudi",
      nombre: "Café Gaudí",
      emoji: "☕",
      lat: 41.387,
      lng: 2.1701,
      promo: "2x1 en capuccinos",
      categoria: "comida",
      direccion: "Passeig de Gràcia 22, Barcelona",
      imagen:
        "https://images.pexels.com/photos/3020918/pexels-photo-3020918.jpeg?w=800",
      horario: "9:00 - 19:00",
    },
    {
      id: "bcn-fitness",
      nombre: "Fit Center BCN",
      emoji: "🏋️",
      lat: 41.380,
      lng: 2.180,
      promo: "1 día gratuito",
      categoria: "fitness",
      direccion: "Rambla 55, Barcelona",
      imagen:
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?w=800",
      horario: "6:30 - 23:00",
    },

    // Valencia
    {
      id: "vlc-horchateria",
      nombre: "Horchatería María",
      emoji: "🥤",
      lat: 39.4702,
      lng: -0.3768,
      promo: "Horchata GRATIS en tu compra",
      categoria: "comida",
      direccion: "C/ San Vicente 44, Valencia",
      imagen:
        "https://images.pexels.com/photos/594697/pexels-photo-594697.jpeg?w=800",
      horario: "10:00 - 22:00",
    },
    {
      id: "vlc-sneakers",
      nombre: "Valencia Sneakers",
      emoji: "👟",
      lat: 39.472,
      lng: -0.378,
      promo: "-15% en zapatillas",
      categoria: "compras",
      direccion: "Colón 19, Valencia",
      imagen:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?w=800",
      horario: "10:00 - 21:00",
    },

    // Sevilla
    {
      id: "svq-tapas",
      nombre: "Tapas Flamenco",
      emoji: "🍢",
      lat: 37.389,
      lng: -5.984,
      promo: "Tapa especial GRATIS",
      categoria: "comida",
      direccion: "C/ Sierpes 88, Sevilla",
      imagen:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=800",
      horario: "12:00 - 00:00",
    },

    // Zaragoza
    {
      id: "zgz-burger",
      nombre: "BunBurger Zaragoza",
      emoji: "🍔",
      lat: 41.6528,
      lng: -0.8816,
      promo: "Bebida XL gratis",
      categoria: "comida",
      direccion: "Coso 17, Zaragoza",
      imagen:
        "https://images.pexels.com/photos/1639563/pexels-photo-1639563.jpeg?w=800",
      horario: "13:00 - 23:30",
    },

    // A Coruña
    {
      id: "crn-mariscos",
      nombre: "Mariscos Royal",
      emoji: "🦐",
      lat: 43.3623,
      lng: -8.4115,
      promo: "Pulpo a mitad de precio",
      categoria: "comida",
      direccion: "Plaza Lugo 10, A Coruña",
      imagen:
        "https://images.pexels.com/photos/1401413/pexels-photo-1401413.jpeg?w=800",
      horario: "13:00 - 23:00",
    },

    // Santander
    {
      id: "sndt-surf",
      nombre: "Santander Surf Rental",
      emoji: "🏄‍♂️",
      lat: 43.476,
      lng: -3.792,
      promo: "1h tabla GRATIS",
      categoria: "fitness",
      direccion: "Playa El Sardinero",
      imagen:
        "https://images.pexels.com/photos/1768781/pexels-photo-1768781.jpeg?w=800",
      horario: "10:00 - 19:00",
    },
  ];

  // ====================== GEOLOCALIZACIÓN ======================
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      () => console.warn("Ubicación denegada")
    );
  }, []);

  const localesConDistancia = useMemo(() => {
    if (!userCoords) return locales;
    return locales.map((l) => ({
      ...l,
      distancia: haversineDistance(userCoords[0], userCoords[1], l.lat, l.lng),
    }));
  }, [userCoords]);

  // ====================== FILTROS ======================
  const filtrados = localesConDistancia
    .filter((l) =>
      category === "all" ? true : l.categoria === category
    )
    .filter((l) =>
      search.trim()
        ? (l.nombre + l.promo + l.direccion)
            .toLowerCase()
            .includes(search.toLowerCase())
        : true
    )
    .sort((a, b) => (a.distancia || 0) - (b.distancia || 0));

  const selectedLocal =
    filtrados.find((l) => l.id === selectedId) || filtrados[0];

  const formatDistance = (d) =>
    !d ? "" : d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`;

  const handleOpenGame = (id) => navigate(`/game?commerce=${id}`);

  const handleOpenMaps = (lat, lng) =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      "_blank"
    );

  // ====================== RENDER ======================

  return (
    <div
      className="min-h-screen flex flex-col px-4 py-6 relative"
      style={{ backgroundColor: "#020617", color: "white" }}
    >
      <BackArrow to="/home" />

      {/* Fondo premium */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(34,197,94,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.18),transparent_50%)]" />

      {/* Header */}
      <h1 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-emerald-300 via-lime-300 to-cyan-300 bg-clip-text text-transparent">
        Explora locales Vibbe
      </h1>

      <p className="text-sm text-slate-300 mb-4">
        Descubre promociones cerca de ti 💚
      </p>

      {/* BUSCADOR Y FILTROS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="🔍 Buscar locales..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-400"
        />

        <div className="flex gap-2 text-xs">
          {[
            { id: "all", label: "Todos" },
            { id: "comida", label: "Comida" },
            { id: "fitness", label: "Fitness" },
            { id: "compras", label: "Compras" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-1 rounded-full border transition ${
                category === c.id
                  ? "bg-emerald-400 text-slate-900 border-emerald-300"
                  : "bg-slate-900/70 text-slate-200 border-slate-700 hover:border-emerald-400/60"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* LISTA */}
        <div className="max-h-[75vh] overflow-y-auto pr-1 lg:w-[40%] flex flex-col gap-3">
          {filtrados.map((loc) => {
            const selected = selectedLocal?.id === loc.id;
            return (
              <motion.div
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                whileHover={{ scale: 1.02 }}
                className={`flex gap-3 rounded-2xl bg-slate-900/80 border overflow-hidden cursor-pointer transition ${
                  selected
                    ? "border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "border-slate-700 hover:border-emerald-400/60"
                }`}
              >
                <img
                  src={loc.imagen}
                  className="w-24 h-24 object-cover"
                />

                <div className="flex-1 py-2">
                  <p className="font-semibold text-sm flex items-center gap-1">
                    {loc.emoji} {loc.nombre}
                  </p>
                  <p className="text-xs text-emerald-300">{loc.promo}</p>
                  <p className="text-xs text-slate-400">{loc.direccion}</p>
                  {loc.distancia && (
                    <p className="text-xs text-cyan-300 mt-1">
                      {formatDistance(loc.distancia)}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MAPA */}
        <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-[0_0_35px_rgba(15,23,42,0.9)] lg:w-[60%]">
          <MapContainer
            center={[40.4168, -3.7038]}
            zoom={13}
            style={{ height: "60vh", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/streets-v4/{z}/{x}/{y}.png?key=Jigmtnsk39T7RV0uzSvT"
              attribution="© MapTiler © OpenStreetMap"
            />

            {userCoords && <FlyToUser coords={userCoords} />}
            {selectedLocal && (
              <FlyTo coords={[selectedLocal.lat, selectedLocal.lng]} />
            )}

            {userCoords && (
              <Marker position={userCoords} icon={userIcon}>
                <Popup>Estás aquí 💚</Popup>
              </Marker>
            )}

            {locales.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                icon={vibbeIcon}
                eventHandlers={{ click: () => setSelectedId(loc.id) }}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-emerald-600">{loc.nombre}</p>
                    <p className="text-xs text-gray-700">{loc.promo}</p>
                    <button
                      onClick={() => handleOpenGame(loc.id)}
                      className="mt-2 px-3 py-1 rounded-lg bg-emerald-500 text-xs text-white"
                    >
                      Jugar batalla
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
