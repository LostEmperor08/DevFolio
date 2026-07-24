"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

const testimonials = [
  {
    quote: "Samarth didn't just build a website, he engineered a full digital experience. The attention to detail in the physics and micro-interactions is unparalleled.",
    name: "Alex Rivera",
    title: "Founder, TechVision",
  },
  {
    quote: "His ability to seamlessly bridge the gap between high-end design aesthetics and robust backend architecture makes him a rare talent.",
    name: "Sarah Chen",
    title: "Engineering Manager",
  }
];

export function Testimonials() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 relative z-10 mx-auto" id="testimonials">
      <SectionHeading 
        title="System Logs" 
        subtitle="Endorsements from founders and engineering leaders."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i}
            variants={motionPresets.fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-8 rounded-3xl glass-panel border border-white/5 relative group hover:border-white/10 transition-colors"
          >
            <div className="text-6xl text-accent-blue/10 font-serif absolute top-4 left-6 leading-none">"</div>
            <p className="text-lg text-muted-foreground leading-relaxed relative z-10 pt-6 mb-8">
              {t.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t.name}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
