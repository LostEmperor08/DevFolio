"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { motionPresets } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects as allProjects } from "@/data/projects";

function SectionBlock({ title, content, isMono = false }: { title: string, content: string | string[], isMono?: boolean }) {
  if (!content || content.length === 0) return null;
  
  return (
    <motion.div 
      variants={motionPresets.fadeUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-t border-white/5"
    >
      <div className="md:col-span-4">
        <h3 className="text-xl font-bold tracking-tight text-white/90">{title}</h3>
      </div>
      <div className="md:col-span-8">
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside space-y-4">
            {content.map((item, i) => (
              <li key={i} className="text-lg text-muted-foreground leading-relaxed">{item}</li>
            ))}
          </ul>
        ) : (
          <p className={`text-lg text-muted-foreground leading-relaxed ${isMono ? "font-mono text-sm" : ""}`}>
            {content}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function CaseStudyContent({ project }: { project: Project }) {
  if (!project.caseStudy) return null;
  const cs = project.caseStudy;

  // Find related projects data
  const related = allProjects.filter(p => project.relatedProjects?.includes(p.slug));

  return (
    <section className="w-full max-w-[1000px] px-6 py-20 relative z-10 mx-auto">
      <SectionBlock title="Overview" content={cs.overview} />
      <SectionBlock title="The Problem" content={cs.problem} />
      <SectionBlock title="Project Goals" content={cs.goals} />
      
      {/* Visual Break / Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <motion.div 
          variants={motionPresets.scaleIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="my-24 p-12 rounded-3xl glass-panel border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex flex-wrap justify-around gap-8"
        >
          {project.metrics.map(m => (
            <div key={m.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">{m.value}</div>
              <div className="text-sm font-mono text-accent-blue uppercase tracking-widest">{m.label}</div>
            </div>
          ))}
        </motion.div>
      )}

      <SectionBlock title="Research & Planning" content={cs.research} />
      <SectionBlock title="Architecture" content={cs.architecture} />
      <SectionBlock title="Development Process" content={cs.developmentProcess} />
      <SectionBlock title="Technical Challenges" content={cs.technicalChallenges} />
      <SectionBlock title="Key Engineering Decisions" content={cs.keyDecisions} />
      <SectionBlock title="Results & Impact" content={cs.results} />
      <SectionBlock title="Lessons Learned" content={cs.lessonsLearned} />
      <SectionBlock title="Future Improvements" content={cs.futureImprovements} />

      {/* Related Projects */}
      {related.length > 0 && (
        <motion.div 
          variants={motionPresets.fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-white/10"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="w-12 h-px bg-accent-blue/50" />
            <span className="font-mono text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
              CONTINUE EXPLORING
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map(r => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="group block p-8 rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-all">
                <div className="text-xs font-mono text-muted-foreground mb-4">{r.category}</div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">{r.title}</h4>
                <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                  View Case Study <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
