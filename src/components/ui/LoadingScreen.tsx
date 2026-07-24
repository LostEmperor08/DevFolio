"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { designTokens } from "@/lib/design";

export function LoadingScreen() {
  const { isLoaded, setLoaded } = useAppStore();

  useEffect(() => {
    // Simulate premium loading delay (2 seconds)
    const timer = setTimeout(() => {
      setLoaded();
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: designTokens.animation.ease.inOutExpo }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Animated Logo */}
            <div className="w-20 h-20 rounded-2xl glass-panel border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-accent-blue/30 to-accent-purple/30 opacity-50"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="font-bold text-3xl tracking-tighter relative z-10 text-white">OS</span>
            </div>

            {/* Progress Indicator */}
            <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: designTokens.animation.ease.inOutExpo }}
              />
            </div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-mono text-muted-foreground/80 uppercase tracking-widest"
            >
              Initializing Core Systems...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
