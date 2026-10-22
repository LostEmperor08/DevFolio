import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/content";
import { LivePresence } from "@/components/ui/LivePresence";
import {
  Cpu,
  Server,
  Boxes,
  ArrowUpRight,
  Terminal,
  BookOpen,
  Send,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { SakuraLogo } from "@/components/icons/SakuraLogo";
import { AlgorithmSandbox } from "@/components/home/AlgorithmSandbox";
import { GithubPulse3D } from "@/components/home/GithubPulse3D";
import { PersonaSwitcherTile } from "@/components/home/PersonaSwitcherTile";


export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, posts } = await getSiteData();

  return (
    <main className="pb-20 space-y-12">
      {/* 1. Live Engineering Telemetry */}
      <section>
        <LivePresence email={profile.email} />
      </section>

      {/* 2. Hero Bento Card */}
      <section className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden group">
        {/* Subtle Ambient Crimson Card Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/15 transition-all duration-700" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
          <div className="flex-1 space-y-4">
            {/* White Sakura Profile Emblem & Status Tag */}
            <div className="flex items-center gap-4">
              <div className="relative group/avatar">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-950 opacity-40 blur-md group-hover/avatar:opacity-85 transition duration-500" />
                <div className="relative h-16 w-16 sm:h-18 sm:w-18 rounded-full border border-zinc-800/90 bg-zinc-950/90 p-2 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:border-red-500/60">
                  <SakuraLogo className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]" glow />
                </div>
              </div>


              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-950/40 border border-red-800/40 text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  ISE Student & Builder
                </span>
                <h2 className="text-sm font-mono text-zinc-400 mt-1">
                  @{profile.handle}
                </h2>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                {profile.headline}
                <span className="block text-zinc-400 font-normal text-xl sm:text-2xl mt-1">
                  {profile.subheadline}
                </span>
              </h1>
            </div>

            {/* Bio */}
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Action Buttons & Socials Dock */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 shadow-lg shadow-red-950/30 transition-all duration-200 group/btn"
              >
                <Send className="w-3.5 h-3.5 text-red-400" />
                <span>Get in Touch</span>
                <span className="text-red-400 transition-transform group-hover/btn:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-zinc-300 hover:text-white bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
              >
                <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                <span>Read Articles</span>
              </Link>


              {/* Social Icon Pills */}
              <div className="flex items-center gap-1.5 pl-1">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.x && (
                  <a
                    href={profile.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Playable Bento Hub (3-Tile Interactive Matrix) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            The Playable Bento Hub · Interactive Diagnostics
          </h2>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Real-Time Browser Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1: Live Algorithm Sandbox */}
          <div className="md:col-span-1">
            <AlgorithmSandbox />
          </div>

          {/* Tile 2: 3D GitHub Pulse */}
          <div className="md:col-span-1">
            <GithubPulse3D />
          </div>

          {/* Tile 3: The Persona Switcher */}
          <div className="md:col-span-1">
            <PersonaSwitcherTile />
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities Bento Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-red-500" />
            Core Capabilities & Systems Focus
          </h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Systems & Core */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-red-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Low-Level
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-red-400 transition-colors">
              Systems & C++
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Algorithmic problem solving, low-latency architectures, and memory efficiency.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["C++", "DSA", "Linux", "Memory Opt"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/70 border border-zinc-800 text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Backend & Scalability */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-red-400 group-hover:scale-110 transition-transform">
                <Server className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Scalability
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-red-400 transition-colors">
              Backend & Automation
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Python automated pipelines, Next.js 16 micro-services, and concurrent APIs.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "Next.js", "APIs", "Automation"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/70 border border-zinc-800 text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Decentralized & Emerging */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-red-400 group-hover:scale-110 transition-transform">
                <Boxes className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Decentralized
              </span>
            </div>
            <h3 className="font-semibold text-white text-base mb-1 group-hover:text-red-400 transition-colors">
              Web3 & TON
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Real-world utility protocols, TON blockchain messaging, and digital identity.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["TON", "Web3", "Telegram", "Identity"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/70 border border-zinc-800 text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Writing Bento Showcase */}
      {posts.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              Recent Essays & Technical Writing
            </h2>
            <Link
              href="/blog"
              className="text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1 group"
            >
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 hover:bg-zinc-900/30 transition-all duration-300 group"
              >

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-red-400">
                      {post.category || "Article"}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-[11px] font-mono text-zinc-400"
                    >
                      {post.date}
                    </time>
                  </div>

                  <h3 className="font-semibold text-xl tracking-tight text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-red-400 transition-colors">
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
