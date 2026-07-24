"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black p-6 text-center z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-[120px] md:text-[200px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 leading-none select-none mb-8">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        
        <Link href="/">
          <MagneticButton className="px-8 py-4 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </MagneticButton>
        </Link>
      </motion.div>
    </main>
  );
}
