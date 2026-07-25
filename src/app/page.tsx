import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ProjectService } from "@/services/project.service";
import { BlogService } from "@/services/blog.service";

// Dynamically import below-the-fold sections for optimal performance (Phase 17)
const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects").then((mod) => mod.FeaturedProjects),
  { ssr: true }
);
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills), {
  ssr: true,
});
const Experience = dynamic(
  () => import("@/components/sections/Experience").then((mod) => mod.Experience),
  { ssr: true }
);
const GithubDashboard = dynamic(
  () => import("@/components/sections/GithubDashboard").then((mod) => mod.GithubDashboard),
  { ssr: true }
);
const BlogPreview = dynamic(
  () => import("@/components/sections/BlogPreview").then((mod) => mod.BlogPreview),
  { ssr: true }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials),
  { ssr: true }
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA),
  { ssr: true }
);

export default async function Home() {
  const projects = await ProjectService.getAllProjects();
  const blogs = await BlogService.getPublishedBlogs();

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden pb-0">
      <Hero />
      <About />
      <FeaturedProjects projects={projects} />
      <Skills />
      <Experience />
      <GithubDashboard />
      <BlogPreview posts={blogs} />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
