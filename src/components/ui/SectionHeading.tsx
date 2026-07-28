"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  kicker,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  kicker?: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      variants={motionPresets.slideReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("mb-20 flex flex-col", centered ? "items-center text-center" : "items-start")}
    >
      {kicker && (
        <div className={cn("mb-6 flex items-center gap-4", centered && "justify-center")}>
          <span className="bg-accent-blue/50 h-px w-12" />
          <span className="text-accent-blue font-mono text-xs font-semibold tracking-[0.3em] uppercase md:text-sm">
            {kicker}
          </span>
          {centered && <span className="bg-accent-blue/50 h-px w-12" />}
        </div>
      )}
      <h2 className="from-foreground via-foreground to-foreground/50 mb-6 bg-gradient-to-br bg-clip-text pb-2 text-5xl font-bold tracking-tighter text-transparent md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground max-w-2xl text-lg leading-relaxed font-light md:text-xl",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
