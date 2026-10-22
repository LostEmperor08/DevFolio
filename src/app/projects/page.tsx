import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";
import { ProjectXRayCard } from "@/components/projects/ProjectXRayCard";
import { Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects & Systems | Samarth Patil",
  description: "Interactive architecture inspection stage for scalable systems, C++, and Web3 tools.",
};

export default async function ProjectsPage() {
  const { projects } = await getSiteData();

  return (
    <main className="pb-20 space-y-8">
      <header className="border-b border-zinc-800/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400">
          <Layers className="w-4 h-4" />
          <span>The &quot;X-Ray&quot; Blueprint Stage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Systems Built & Engineered
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Interactive project showcases. Drag the vertical divider on each card to peel back the frontend and inspect the internal data flow, or execute embedded micro-demos.
        </p>
      </header>

      {/* Projects List */}
      <section className="space-y-8">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectXRayCard key={project.slug} project={project} />
          ))
        ) : (
          <p className="text-zinc-500 font-mono text-sm">No projects published yet.</p>
        )}
      </section>
    </main>
  );
}
