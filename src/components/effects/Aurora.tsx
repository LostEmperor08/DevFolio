"use client";

import { motion } from "framer-motion";
import { designTokens } from "@/lib/design";

export function Aurora() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[120px] opacity-30"
        style={{ backgroundColor: designTokens.colors.accentBlue }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen blur-[120px] opacity-20"
        style={{ backgroundColor: designTokens.colors.accentPurple }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
