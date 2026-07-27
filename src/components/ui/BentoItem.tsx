"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      className={cn(
        "glass-panel group/bento relative row-span-1 flex transform-gpu flex-col space-y-4 overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {/* Subtle hover gradient inside card */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100" />

      <div className="relative z-10 w-full flex-1">{header}</div>
      <div className="relative z-10 transition duration-300 group-hover/bento:translate-x-2">
        <div className="text-accent-blue mb-4">{icon}</div>
        <div className="text-foreground mb-2 font-bold tracking-tight">{title}</div>
        <div className="text-muted-foreground font-sans text-sm leading-relaxed font-normal">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
