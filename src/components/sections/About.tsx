"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { aboutContent } from "@/data/about";
import { BentoGrid } from "../ui/BentoGrid";
import { BentoItem } from "../ui/BentoItem";
import { Fingerprint, Terminal, Wrench, Flame } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "who-i-am": <Fingerprint className="w-5 h-5" />,
  "current-stack": <Terminal className="w-5 h-5" />,
  "favorite-tools": <Wrench className="w-5 h-5" />,
  "what-drives-me": <Flame className="w-5 h-5" />,
};

export function About() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Side: Editorial Story */}
        <motion.div 
          variants={motionPresets.slideReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 sticky top-32"
        >
          <SectionHeading title="System Architecture" subtitle={aboutContent.heading} kicker="01 // ORIGIN" />
          
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mt-8">
            <p>{aboutContent.story}</p>
            <div className="w-12 h-px bg-white/20 my-8" />
            <p className="italic text-foreground/80 font-serif text-xl border-l-2 border-accent-blue pl-6 py-2">
              "{aboutContent.mission}"
            </p>
          </div>
        </motion.div>

        {/* Right Side: Interactive Bento */}
        <motion.div 
          variants={motionPresets.staggerChildren(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-7"
        >
          <BentoGrid className="md:grid-cols-3">
            {aboutContent.bento.map((item) => (
              <BentoItem
                key={item.id}
                title={item.title}
                description={item.description}
                icon={iconMap[item.id]}
                className={item.colSpan}
                header={
                  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/5 mb-4 overflow-hidden relative group-hover/bento:border-white/10 transition-colors">
                     {/* Subtle interior glow */}
                     <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500" />
                  </div>
                }
              />
            ))}
          </BentoGrid>
        </motion.div>
        
      </div>
    </section>
  );
}
