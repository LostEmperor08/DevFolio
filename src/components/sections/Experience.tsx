"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { Timeline } from "../ui/Timeline";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="experience">
      <SectionHeading 
        title="Experience" 
        subtitle="A chronological journey of my professional engineering roles."
        kicker="04 // TIMELINE"
      />
      <Timeline items={experiences} />
    </section>
  );
}
