import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";
import { ScrollytellingReader } from "@/components/blog/ScrollytellingReader";

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

export default async function BlogPostPage({
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

  return (
    <main className="pb-20">
      <ScrollytellingReader post={post} />
    </main>
  );
}
