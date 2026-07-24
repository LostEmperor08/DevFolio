"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

export function BentoItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={motionPresets.cardHover}
      whileHover="whileHover"
      className={cn(
        "row-span-1 rounded-2xl glass-panel group/bento transition duration-300 p-6 flex flex-col space-y-4 border border-white/10 overflow-hidden relative shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)] hover:border-white/20",
        className
      )}
    >
      {/* Subtle hover gradient inside card */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex-1 w-full relative z-10">{header}</div>
      <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
        <div className="mb-4 text-accent-blue">{icon}</div>
        <div className="font-bold text-foreground mb-2 tracking-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-muted-foreground text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
