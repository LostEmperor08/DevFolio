"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Full Stack Developer.",
  "Cybersecurity Enthusiast.",
  "Problem Solver.",
  "Open Source Builder.",
  "Tech Explorer."
];

export function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[1.5em] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 text-accent-blue font-mono font-medium tracking-tight"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
