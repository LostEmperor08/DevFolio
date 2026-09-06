import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";

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

  return (
    <main className="px-4 md:px-0 pb-16">
      <section>
        <h1 className="font-semibold tracking-tight text-4xl text-white">
          {post.title}
        </h1>
        <span className="text-zinc-500 text-sm tracking-tight font-mono block mt-4 pb-6 border-b border-zinc-800">
          Published on <time dateTime={post.date}>{post.date}</time>
        </span>
      </section>

      <section className="py-6">
        <article className="text-zinc-300 text-lg leading-relaxed space-y-6">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h2
                  key={index}
                  className="font-semibold text-2xl tracking-tight text-white pt-6 pb-1"
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
                    <li key={i}>
                      {item.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={index} className="text-zinc-300 text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>
      </section>
    </main>
  );
}