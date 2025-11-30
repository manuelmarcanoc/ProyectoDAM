import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import BackArrow from "../common/BackArrow";
import "leaflet/dist/leaflet.css";

// ==== ICONOS ====
const vibbeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -38],
});

const userIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      width:16px;height:16px;border-radius:50%;
      background: radial-gradient(circle, #a6fff8, #00eaff);
      box-shadow: 0 0 18px #00eaff, 0 0 30px #00eaffaa;
      border:2px solid #00eaff;
    "></div>
  `,
});

// ======================= HELPERS ==========================
function haversineDistance(a1, o1, a2, o2) {
  const R = 6371e3;
  const toRad = (g) => (g * Math.PI) / 180;
  const dA = toRad(a2 - a1);
  const dO = toRad(o2 - o1);

  const A =
    Math.sin(dA / 2) ** 2 +
    Math.cos(toRad(a1)) * Math.cos(toRad(a2)) * Math.sin(dO / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
}

const formatDist = (d) =>
  !d ? "" : d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`;

function Fly({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 15, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

// ======================= COMPONENTE ==========================

export default function Locations() {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState("all");
  const [selected, setSelected] = useState(null);
  const [geoError, setGeoError] = useState(false);

  // ------- LOCALES --------
  // Barcelona centrado en zona Eixample / Rambla para que entren en el radio
  const locales = [
    // ---------- BARCELONA - COMIDA ----------
    {
      id: "b1",
      nombre: "Brunch & Coffee BCN",
      emoji: "☕",
      lat: 41.3865,
      lng: 2.1692,
      promo: "Café con leche gratis",
      categoria: "comida",
      direccion: "Carrer de Pelai, Barcelona",
      img: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    },
    {
      id: "b2",
      nombre: "Pizzería Rambla",
      emoji: "🍕",
      lat: 41.3848,
      lng: 2.1712,
      promo: "2x1 en pizzas martes",
      categoria: "comida",
      direccion: "La Rambla, Barcelona",
      img: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",
    },
    {
      id: "b3",
      nombre: "Taco Verde",
      emoji: "🌮",
      lat: 41.3892,
      lng: 2.1658,
      promo: "Nachos gratis con menú",
      categoria: "comida",
      direccion: "Carrer d'Aragó, Barcelona",
      img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
    {
      id: "b4",
      nombre: "Burgers del Born",
      emoji: "🍔",
      lat: 41.3859,
      lng: 2.1803,
      promo: "Refresco gratis",
      categoria: "comida",
      direccion: "El Born, Barcelona",
      img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    },
    {
      id: "b5",
      nombre: "Gelato Barceloneta",
      emoji: "🍨",
      lat: 41.3805,
      lng: 2.1902,
      promo: "2 bolas al precio de 1",
      categoria: "comida",
      direccion: "Passeig Joan de Borbó, Barcelona",
      img: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg",
    },
    {
      id: "b6",
      nombre: "Veggie Corner",
      emoji: "🥗",
      lat: 41.392,
      lng: 2.1655,
      promo: "Postre vegano gratis",
      categoria: "comida",
      direccion: "Carrer de València, Barcelona",
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },

    // ---------- BARCELONA - FITNESS ----------
    {
      id: "b7",
      nombre: "Fit Center BCN",
      emoji: "🏋️",
      lat: 41.3835,
      lng: 2.1765,
      promo: "1 día gratis",
      categoria: "fitness",
      direccion: "Rambla, Barcelona",
      img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    },
    {
      id: "b8",
      nombre: "CrossFit Eixample",
      emoji: "🏋️‍♀️",
      lat: 41.3928,
      lng: 2.1733,
      promo: "Primera clase gratis",
      categoria: "fitness",
      direccion: "Eixample, Barcelona",
      img: "https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg",
    },
    {
      id: "b9",
      nombre: "Yoga Urban Studio",
      emoji: "🧘",
      lat: 41.3896,
      lng: 2.1822,
      promo: "Clase de prueba sin coste",
      categoria: "fitness",
      direccion: "Ciutat Vella, Barcelona",
      img: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
    },

    // ---------- BARCELONA - COMPRAS ----------
    {
      id: "b10",
      nombre: "Tech Store BCN",
      emoji: "💻",
      lat: 41.3879,
      lng: 2.1703,
      promo: "10% en accesorios",
      categoria: "compras",
      direccion: "Plaça Catalunya, Barcelona",
      img: "https://images.pexels.com/photos/374679/pexels-photo-374679.jpeg",
    },
    {
      id: "b11",
      nombre: "Sneaker Shop Rambla",
      emoji: "👟",
      lat: 41.3844,
      lng: 2.1731,
      promo: "2ª unidad al 50%",
      categoria: "compras",
      direccion: "La Rambla, Barcelona",
      img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    },
    {
      id: "b12",
      nombre: "Book & Coffee",
      emoji: "📚",
      lat: 41.3907,
      lng: 2.1669,
      promo: "Café gratis con tu libro",
      categoria: "compras",
      direccion: "Carrer de Balmes, Barcelona",
      img: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg",
    },

    // ---------- OTROS (siguen existiendo, pero quedarán lejos en el radio) ----------
    {
      id: "p1",
      nombre: "Cafetería Paca",
      emoji: "☕",
      lat: 40.4168,
      lng: -3.7038,
      promo: "Croissant gratis",
      categoria: "comida",
      direccion: "Madrid centro",
      img: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    },
    {
      id: "p2",
      nombre: "Pizzería Bella",
      emoji: "🍕",
      lat: 40.4175,
      lng: -3.701,
      promo: "2x1 pizzas",
      categoria: "comida",
      direccion: "Plaza Italia, Madrid",
      img: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",
    },
    {
      id: "p4",
      nombre: "Horchatería María",
      emoji: "🥤",
      lat: 39.4702,
      lng: -0.3768,
      promo: "Horchata gratis",
      categoria: "comida",
      direccion: "Valencia",
      img: "https://images.pexels.com/photos/594697/pexels-photo-594697.jpeg",
    },
  ];

  // ------- GEO -------
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setUser([pos.coords.latitude, pos.coords.longitude]),
      () => setGeoError(true)
    );
  }, []);

  // Si falla la localización → usar centro de Barcelona (fallback)
  const finalUser = user || [41.3874, 2.1686];

  const withDist = useMemo(
    () =>
      locales.map((l) => ({
        ...l,
        dist: haversineDistance(finalUser[0], finalUser[1], l.lat, l.lng),
      })),
    [finalUser, locales]
  );

  // ------- FILTROS -------
  const filtered = withDist
    .filter((l) => (category === "all" ? true : l.categoria === category))
    .filter((l) =>
      search.trim()
        ? (l.nombre + l.direccion + l.promo)
            .toLowerCase()
            .includes(search.toLowerCase())
        : true
    )
    .filter((l) => {
      if (radius === "all") return true;
      return l.dist <= Number(radius);
    });

  const center = selected ? [selected.lat, selected.lng] : finalUser;

  const radiusOptions = [
    { v: "all", t: "∞" },
    { v: "500", t: "500m" },
    { v: "1000", t: "1km" },
    { v: "2000", t: "2km" },
  ];

  // ======================= UI ==========================
  return (
    <div className="w-full h-screen relative bg-[#020617] overflow-hidden text-white">
      {/* MAPA */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <Fly coords={center} />

          <TileLayer
            url="https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=Jigmtnsk39T7RV0uzSvT"
          />

          <Marker icon={userIcon} position={finalUser}>
            <Popup>
              Estás aquí {geoError ? "(ubicación aproximada en Barcelona)" : ""}
            </Popup>
          </Marker>

          {radius !== "all" && (
            <Circle
              center={finalUser}
              radius={Number(radius)}
              pathOptions={{
                color: "#00eaff",
                opacity: 0.5,
                weight: 2,
                fillColor: "#00eaff",
                fillOpacity: 0.1,
              }}
            />
          )}

          {filtered.map((loc) => (
            <Marker
              key={loc.id}
              icon={vibbeIcon}
              position={[loc.lat, loc.lng]}
              eventHandlers={{ click: () => setSelected(loc) }}
            >
              <Popup>{loc.nombre}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* AURA */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,234,255,0.08),transparent_60%)]" />
      </div>

      {/* BARRA SUPERIOR – layout arreglado para que no se corte a la derecha */}
      <div className="absolute top-3 left-0 right-0 z-20 px-4">
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          <BackArrow to="/home" />
          <div className="flex-1 backdrop-blur-xl bg-white/5 border border-cyan-400/30 px-4 py-2 rounded-2xl shadow-[0_0_20px_#00eaff55] flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="bg-transparent text-sm outline-none w-full"
            />
            🔍
          </div>
        </div>
      </div>

      {/* PANEL INFERIOR */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 z-20 p-4"
      >
        {/* FILTRO CATEGORÍAS */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
          {["all", "comida", "fitness", "compras"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1 rounded-full border backdrop-blur-xl whitespace-nowrap text-sm
              ${
                category === c
                  ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_15px_#00eaff99]"
                  : "border-cyan-400/40 bg-white/5"
              }`}
            >
              {c === "all" ? "Todo" : c}
            </button>
          ))}
        </div>

        {/* FILTRO RADIO */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {radiusOptions.map((r) => (
            <button
              key={r.v}
              onClick={() => setRadius(r.v)}
              className={`px-3 py-1 rounded-full text-xs border backdrop-blur-xl
              ${
                radius === r.v
                  ? "border-cyan-400 bg-cyan-400 text-black shadow-[0_0_12px_#00eaffaa]"
                  : "border-cyan-400/40 bg-white/5 text-cyan-100"
              }`}
            >
              {r.t}
            </button>
          ))}
        </div>

        {/* CARRUSEL */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {filtered.map((loc) => (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 1.04 }}
              onClick={() => setSelected(loc)}
              className="min-w-[270px] bg-white/5 backdrop-blur-xl border border-cyan-400/40 rounded-3xl shadow-[0_0_30px_#00eaff66] overflow-hidden cursor-pointer"
            >
              <img
                src={loc.img}
                alt={loc.nombre}
                className="h-36 w-full object-cover"
              />

              <div className="p-3">
                <p className="text-lg font-semibold text-cyan-300 flex items-center gap-1">
                  {loc.emoji} {loc.nombre}
                </p>
                <p className="text-xs text-cyan-100/80 mt-1">{loc.promo}</p>
                <p className="text-xs text-cyan-100/60">{loc.direccion}</p>
                {loc.dist && (
                  <p className="text-xs text-cyan-300 mt-1">
                    {formatDist(loc.dist)}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
