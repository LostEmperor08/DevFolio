import { notFound } from "next/navigation";
import Link from "next/link";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getSiteData();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Samarth Patil`,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { posts } = await getSiteData();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Calculate estimated reading time
  const totalWords = post.content.join(" ").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(totalWords / 180));

  return (
    <main className="pb-20 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Header Card */}
      <header className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 font-medium">
            {post.category || "Essay"}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            {readingTime} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed border-t border-zinc-800/60 pt-4">
          {post.description}
        </p>
      </header>

      {/* Article Content */}
      <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <article className="text-zinc-300 text-base sm:text-lg leading-relaxed space-y-6">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h2
                  key={index}
                  className="font-semibold text-xl sm:text-2xl tracking-tight text-white pt-6 pb-1 border-b border-zinc-800/60"
                >
                  {paragraph.replace("### ", "")}
                </h2>
              );
            }

            if (paragraph.includes("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul
                  key={index}
                  className="list-disc list-inside space-y-2 text-zinc-300 my-4 pl-1"
                >
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>
      </section>
    </main>
  );
}