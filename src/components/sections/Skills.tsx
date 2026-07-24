"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { skillCategories } from "@/data/skills";
import { BentoGrid } from "../ui/BentoGrid";
import { BentoItem } from "../ui/BentoItem";

export function Skills() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="skills">
      <SectionHeading 
        title="Technical Arsenal" 
        subtitle="A comprehensive overview of my capabilities and the technologies I use to build."
        kicker="03 // CAPABILITIES"
      />

      <BentoGrid className="mt-16">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <BentoItem
              key={category.id}
              title={category.title}
              description={category.description}
              className={category.colSpan}
              icon={<Icon className="w-6 h-6" />}
              header={
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              }
            />
          );
        })}
      </BentoGrid>
    </section>
  );
}
