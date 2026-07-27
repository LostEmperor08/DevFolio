"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoItem = memo(function BentoItem({
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
        "glass-panel group/bento relative flex transform-gpu flex-col justify-between space-y-6 overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] md:p-8",
        className
      )}
    >
      {/* Ambient hover illumination inside card */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100" />

      {/* Visual Component Visualization Section */}
      <div className="relative z-10 flex w-full flex-1 flex-col justify-center">{header}</div>

      {/* Bottom Typography & Metadata Section */}
      <div className="relative z-10 border-t border-white/10 pt-4 transition-transform duration-300 group-hover/bento:translate-x-1">
        <div className="text-accent-blue mb-2 flex items-center gap-2.5">
          <div className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-cyan-400">
            {icon}
          </div>
          <h4 className="text-foreground text-base font-bold tracking-tight md:text-lg">{title}</h4>
        </div>
        <div className="text-muted-foreground font-sans text-xs leading-relaxed font-light md:text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
});
