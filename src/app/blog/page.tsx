import Link from "next/link";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Technical Essays | Samarth Patil",
  description: "High-craft essays on Web3 utility, systems architecture, and engineering philosophy.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { posts } = await getSiteData();

  return (
    <main className="pb-20 space-y-8">
      <header className="border-b border-zinc-800/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400">
          <BookOpen className="w-4 h-4" />
          <span>Scrollytelling & Editorial Writing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Technical Writing & Essays
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Deep-dive technical essays and reflections. Featuring spotlight reading mode, step-by-step code morphing, and interactive margin notes.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-500 font-mono text-sm py-8">
          No articles published yet.
        </p>
      ) : (
        <section className="space-y-4">
          {posts.map((post) => {
            const words = post.content.join(" ").split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(words / 180));

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 hover:bg-zinc-900/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 font-medium">
                      {post.category || "Essay"}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        {readTime} min read
                      </span>
                      <span>•</span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>

                  <h2 className="font-semibold text-xl sm:text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors mb-2">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-red-400 transition-colors">
                  <span>Open Scrollytelling Experience</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
