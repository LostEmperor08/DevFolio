"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-black p-6 text-center z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="max-w-md"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          An unexpected error occurred. Please try again or return to the homepage if the problem persists.
        </p>
        
        <MagneticButton 
          onClick={() => reset()}
          className="px-8 py-4 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </MagneticButton>
      </motion.div>
    </main>
  );
}
