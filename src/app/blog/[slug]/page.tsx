import { notFound } from "next/navigation";
import { BlogService } from "@/services/blog.service";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { ContentRenderer } from "@/components/sections/article/ContentRenderer";
import { TableOfContents } from "@/components/sections/article/TableOfContents";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Newsletter } from "@/components/sections/blog/Newsletter";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await BlogService.getBlogBySlug(resolvedParams.slug);
  const baseUrl = "https://samarthpatil.com";

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      authors: [post.authorName],
      publishedTime: new Date(post.createdAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await BlogService.getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Generate TOC from legacy blocks or new markdown
  let tableOfContents: { id: string; title: string; level: number }[] = [];
  const markdownBlock = post.content.find((b) => b.type === "markdown");

  if (markdownBlock && markdownBlock.text) {
    // Basic regex to find markdown headings (## Heading)
    const matches = markdownBlock.text.matchAll(/^(#{2,3})\s+(.+)$/gm);
    for (const match of matches) {
      const level = match[1].length;
      const title = match[2].trim();
      // remark-slug style id generation
      const id = title
        .toLowerCase()
        .replace(/[^\w\- ]+/g, "")
        .replace(/\s+/g, "-");
      tableOfContents.push({ id, title, level });
    }
  } else {
    // Legacy support
    tableOfContents = post.content
      .filter((b) => b.type === "heading")
      .map((b) => ({
        id: (b.text || "").toLowerCase().replace(/\s+/g, "-"),
        title: b.text || "",
        level: b.level || 2,
      }));
  }

  const baseUrl = "https://samarth.dev"; // Assume env config later

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-black pt-20 pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: post.coverImage,
            datePublished: new Date(post.createdAt).toISOString(),
            dateModified: new Date(post.updatedAt).toISOString(),
            author: [
              {
                "@type": "Person",
                name: post.authorName,
                url: baseUrl,
              },
            ],
          }),
        }}
      />
      <ArticleHero post={post as any} />

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12">
        {tableOfContents.length > 0 && (
          <div className="relative hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <TableOfContents toc={tableOfContents} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`w-full ${tableOfContents.length > 0 ? "lg:col-span-8 lg:col-start-4" : "lg:col-span-12"}`}
        >
          <ContentRenderer blocks={post.content} />

          {/* Article Footer: Share Bar & Tags */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground mr-2 font-mono text-xs uppercase">Tags:</span>
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-xs uppercase">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://samarthpatil.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/15"
                title="Share on Twitter / X"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://samarthpatil.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white transition-colors hover:bg-white/15"
                title="Share on LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-indigo-950/30 to-slate-950 p-8 text-center shadow-2xl sm:flex-row sm:items-start sm:text-left">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Image
                src={
                  post.authorName?.includes("Samarth") ? "/images/avatar.jpg" : "/images/avatar.jpg"
                }
                alt="Samarth Patil"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  Written by {post.authorName || "Samarth Patil"}
                </h3>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                  AUTHOR • ARCHITECT
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Senior Full-Stack and Cybersecurity Engineer passionate about building resilient,
                zero-latency digital ecosystems and cinematic web applications.
              </p>
              <div className="flex justify-center pt-2 sm:justify-start">
                <Link
                  href="/projects"
                  className="font-mono text-xs text-cyan-400 underline underline-offset-4 hover:text-cyan-300"
                >
                  Explore Samarth's Selected Works →
                </Link>
              </div>
            </div>
          </div>

          {/* Back to All Blogs CTA */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:border-white/40 hover:bg-white/10"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </div>

      <Newsletter />
      <FinalCTA />
    </main>
  );
}
