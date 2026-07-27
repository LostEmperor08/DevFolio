"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { aboutContent } from "@/data/about";
import { BentoGrid } from "../ui/BentoGrid";
import { BentoItem } from "../ui/BentoItem";
import { Fingerprint, Terminal, Wrench, Flame } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "who-i-am": <Fingerprint className="h-5 w-5" />,
  "current-stack": <Terminal className="h-5 w-5" />,
  "favorite-tools": <Wrench className="h-5 w-5" />,
  "what-drives-me": <Flame className="h-5 w-5" />,
};

export function About() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:py-48" id="about">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        {/* Left Side: Editorial Story */}
        <motion.div
          variants={motionPresets.slideReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="sticky top-32 lg:col-span-5"
        >
          <SectionHeading
            title="Building My Future"
            subtitle={aboutContent.heading}
            kicker="01 // ORIGIN"
          />

          <div className="text-muted-foreground mt-8 space-y-6 text-lg leading-relaxed">
            <p>{aboutContent.story}</p>
            <div className="my-8 h-px w-12 bg-white/20" />
            <p className="text-foreground/80 border-accent-blue border-l-2 py-2 pl-6 font-serif text-xl italic">
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
                  <div className="relative mb-4 h-24 w-full overflow-hidden rounded-lg border border-white/5 bg-gradient-to-br from-white/5 to-white/0 transition-colors group-hover/bento:border-white/10">
                    {/* Subtle interior glow */}
                    <div className="bg-accent-blue/5 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100" />
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
