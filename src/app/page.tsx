"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

// Dynamically import below-the-fold sections for optimal performance (Phase 17)
const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects").then(mod => mod.FeaturedProjects), { ssr: true });
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills), { ssr: true });
const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => mod.Experience), { ssr: true });
const GithubDashboard = dynamic(() => import("@/components/sections/GithubDashboard").then(mod => mod.GithubDashboard), { ssr: true });
const BlogPreview = dynamic(() => import("@/components/sections/BlogPreview").then(mod => mod.BlogPreview), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then(mod => mod.FinalCTA), { ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden">
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <GithubDashboard />
      <BlogPreview />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
