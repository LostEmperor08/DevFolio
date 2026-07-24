"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { BentoGrid } from "../ui/BentoGrid";
import { BentoItem } from "../ui/BentoItem";
import { GitBranch, Activity, GitCommit, GitPullRequest, Code2, Star } from "lucide-react";

export function GithubDashboard() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="github">
      <SectionHeading 
        title="Developer Telemetry" 
        subtitle="Real-time insights from my engineering environment."
      />

      <BentoGrid className="mt-16 md:grid-cols-4 md:auto-rows-[16rem]">
        {/* Contribution Graph (Wide) */}
        <BentoItem
          className="md:col-span-3"
          title="Contribution Activity"
          description="1,432 contributions in the last year."
          icon={<Activity className="w-5 h-5" />}
          header={
            <div className="w-full h-full min-h-[120px] rounded-lg bg-white/5 border border-white/5 flex flex-col justify-end p-4 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="flex gap-1.5 items-end h-[80px] w-full overflow-hidden opacity-50 relative z-10">
                  {Array.from({ length: 45 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-full rounded-sm bg-accent-blue"
                      style={{ height: `${Math.max(10, ((i * 17) % 100))}%`, opacity: Math.max(0.3, ((i * 13) % 100) / 100) }}
                    />
                  ))}
               </div>
            </div>
          }
        />

        {/* Global Stats */}
        <BentoItem
          className="md:col-span-1"
          title="Global Stats"
          description="Total impact across repositories."
          icon={<GitBranch className="w-5 h-5" />}
          header={
            <div className="flex flex-col gap-4 mt-4 w-full">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Star className="w-3.5 h-3.5 text-yellow-500"/> Stars</span>
                <span className="font-mono text-white">4.2k</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><GitPullRequest className="w-3.5 h-3.5 text-accent-purple"/> PRs</span>
                <span className="font-mono text-white">342</span>
              </div>
            </div>
          }
        />

        {/* Latest Commit */}
        <BentoItem
          className="md:col-span-2"
          title="Latest Commit"
          description="samarth/nexus-api"
          icon={<GitCommit className="w-5 h-5" />}
          header={
            <div className="w-full p-5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-muted-foreground h-full flex flex-col justify-center">
              <div className="text-accent-blue mb-3 text-sm">feat(core): implement zero-copy deserialization</div>
              <div className="opacity-50">5d4f9a2 • 2 hours ago</div>
            </div>
          }
        />

        {/* Languages */}
        <BentoItem
          className="md:col-span-2"
          title="Top Languages"
          description="Most utilized in the past 30 days."
          icon={<Code2 className="w-5 h-5" />}
          header={
            <div className="flex flex-col justify-center gap-4 w-full h-full mt-2">
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono text-muted-foreground">Rust</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-orange-500 w-[60%]" /></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono text-muted-foreground">TypeScript</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-blue-500 w-[30%]" /></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono text-muted-foreground">Python</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-yellow-500 w-[10%]" /></div>
              </div>
            </div>
          }
        />
      </BentoGrid>
    </section>
  );
}
