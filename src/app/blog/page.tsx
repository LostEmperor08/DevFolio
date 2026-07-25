import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogFeatured } from "@/components/sections/blog/BlogFeatured";
import { BlogList } from "@/components/sections/blog/BlogList";
import { Newsletter } from "@/components/sections/blog/Newsletter";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogService } from "@/services/blog.service";

export default async function BlogPage() {
  const blogs = await BlogService.getPublishedBlogs();

  const featuredPost = blogs.find((b) => b.featured) || blogs[0];
  const otherPosts = blogs.filter((b) => b.slug !== featuredPost?.slug);

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden pt-32 pb-0">
      <BlogHero />
      <BlogFeatured post={featuredPost as any} />
      <BlogList posts={otherPosts as any} />
      <Newsletter />
      <FinalCTA />
    </main>
  );
}
