"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { profile } from "@/config/profile";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export function AvailabilityStatus() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      // Create formatter for Pacific Time
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      setTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-[1200px] px-6 pb-12 relative z-10 mx-auto flex justify-center">
      <motion.div 
        variants={motionPresets.scaleIn}
        initial="initial"
        animate="animate"
        className="flex flex-col sm:flex-row items-center gap-6 p-4 md:p-6 rounded-2xl glass-panel border border-white/10 max-w-3xl w-full"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="absolute w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <div className="relative w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div>
            <h3 className="text-white font-medium">{profile.personal.availability}</h3>
            <p className="text-sm text-muted-foreground">{profile.personal.responseTime}</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-white/10" />

        <div className="flex items-center gap-4 flex-1 sm:justify-end">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/20">
             <Clock className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h3 className="text-white font-medium font-mono">{time || "---"}</h3>
            <p className="text-sm text-muted-foreground">{profile.personal.location} ({profile.personal.timezone})</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
