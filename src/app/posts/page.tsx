import Link from "next/link";
import { getSiteData } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | Samarth Patil",
  description: "Personal thoughts and reflections on engineering and software systems.",
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const { posts } = await getSiteData();

  return (
    <main className="px-4 md:px-0 pb-16">
      <header>
        <h1 className="font-semibold tracking-tight text-4xl mb-6 text-white pb-6 border-b border-zinc-800">
          Writing
        </h1>
      </header>
      {posts.length === 0 ? (
        <p className="text-zinc-500 font-mono text-sm py-8">
          No articles published yet.
        </p>
      ) : (
        <section className="divide-y divide-zinc-800">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="flex flex-col gap-4 py-8 first:pt-0 group"
            >
              <div className="flex flex-col">
                <h2 className="font-semibold text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors">
                  {post.title}
                </h2>
                <span className="text-zinc-500 text-sm tracking-tight font-mono block mt-2">
                  Published on <time dateTime={post.date}>{post.date}</time>
                </span>
                <p className="mt-2 text-zinc-400 text-base">{post.description}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
