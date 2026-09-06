import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, posts } = await getSiteData();

  return (
    <main className="px-4 md:px-0 pb-16">
      <section className="pb-14 border-b border-zinc-800 mb-14">
        <div className="mb-8 flex items-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-red-950 opacity-40 blur-md group-hover:opacity-75 transition duration-500" />
            <Image
              src="/images/profile-logo.jpg"
              alt="Samarth Patil"
              width={76}
              height={76}
              className="relative rounded-full border border-zinc-800 bg-black object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        <h1 className="font-semibold text-4xl mb-4 text-white">
          {profile.headline}
          <span className="block text-zinc-500 font-normal text-2xl mt-1">
            {profile.subheadline}
          </span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl leading-normal">
          {profile.bio}
        </p>
        <Link
          href="/contact"
          className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          Get in Touch{" "}
          <span className="inline-block group-hover:translate-x-2 transition-transform text-red-400">
            →
          </span>
        </Link>
      </section>

      {posts.length > 0 && (
        <section className="pt-4 pb-16">
          <h2 className="font-semibold text-2xl tracking-tight mb-8 text-white">
            Recent Writing
          </h2>
          <div className="divide-y divide-zinc-800">
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
                  <p className="mt-2 text-zinc-400 text-base">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/posts"
            className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-colors inline-block mt-8 font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
          >
            View More Posts{" "}
            <span className="inline-block group-hover:translate-x-2 transition-transform text-red-400">
              →
            </span>
          </Link>
        </section>
      )}
    </main>
  );
}
