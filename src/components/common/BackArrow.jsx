import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackArrow({ to = "/home" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(to)}
      className="absolute top-5 left-5 z-20 flex items-center justify-center 
                 w-10 h-10 rounded-full bg-white/10 border border-white/20 
                 text-emerald-400 hover:bg-emerald-400/20 hover:shadow-[0_0_10px_#34d399]
                 backdrop-blur-md transition-all duration-200"
      whileHover={{ scale: 1.15, rotate: -10 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Volver"
    >
      <ArrowLeft size={22} strokeWidth={2.5} />
    </motion.button>
  );
}
