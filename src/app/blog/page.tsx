"use client";

import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogFeatured } from "@/components/sections/blog/BlogFeatured";
import { BlogList } from "@/components/sections/blog/BlogList";
import { Newsletter } from "@/components/sections/blog/Newsletter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { blogs } from "@/data/blogs";

export default function BlogPage() {
  const featuredPost = blogs.find(b => b.featured) || blogs[0];
  const otherPosts = blogs.filter(b => b.slug !== featuredPost.slug);

  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden pt-32">
      <BlogHero />
      <BlogFeatured post={featuredPost} />
      <BlogList posts={otherPosts} />
      <Newsletter />
      <FinalCTA />
    </main>
  );
}
