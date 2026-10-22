import Link from "next/link";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing | Samarth Patil",
  description: "Personal thoughts and reflections on engineering and software systems.",
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const { posts } = await getSiteData();

  return (
    <main className="pb-16 space-y-8">
      <header className="border-b border-zinc-800/80 pb-6">
        <h1 className="font-semibold tracking-tight text-3xl sm:text-4xl text-white">
          Writing & Essays
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mt-2">
          Architectural breakdowns, Web3 systems, and software engineering reflections.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-500 font-mono text-sm py-8">
          No articles published yet.
        </p>
      ) : (
        <section className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 hover:bg-zinc-900/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-red-400">
                    {post.category || "Essay"}
                  </span>
                  <time
                    dateTime={post.date}
                    className="text-xs font-mono text-zinc-500"
                  >
                    {post.date}
                  </time>
                </div>

                <h2 className="font-semibold text-xl sm:text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors mb-2">
                  {post.title}
                </h2>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-red-400 transition-colors">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
