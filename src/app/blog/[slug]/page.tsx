import { notFound } from "next/navigation";
import { BlogService } from "@/services/blog.service";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { ContentRenderer } from "@/components/sections/article/ContentRenderer";
import { TableOfContents } from "@/components/sections/article/TableOfContents";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Newsletter } from "@/components/sections/blog/Newsletter";
import { prisma } from "@/lib/prisma";

import type { Metadata } from "next";

// Generate static params for all blog slugs
export async function generateStaticParams() {
  const blogs = await prisma.blogPost.findMany({ select: { slug: true } });
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await BlogService.getBlogBySlug(resolvedParams.slug);
  const settings = await prisma.siteSettings.findFirst();
  const baseUrl = settings?.url || "https://samarth.dev";

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
        </div>
      </div>

      <Newsletter />
      <FinalCTA />
    </main>
  );
}
