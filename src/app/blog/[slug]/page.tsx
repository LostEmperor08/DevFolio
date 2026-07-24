import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { ContentRenderer } from "@/components/sections/article/ContentRenderer";
import { TableOfContents } from "@/components/sections/article/TableOfContents";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Newsletter } from "@/components/sections/blog/Newsletter";

// Generate static params for all blog slugs
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden pt-20 bg-black">
      {/* Progress Bar (Client Component could be extracted, but for now we keep layout simple) */}
      <ArticleHero post={post} />
      
      <div className="w-full max-w-[1200px] px-6 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        {/* Sticky Table of Contents (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 relative">
          <div className="sticky top-32">
            <TableOfContents toc={post.tableOfContents} />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 lg:col-start-4 w-full">
          <ContentRenderer blocks={post.content} />
        </div>
      </div>
      
      <Newsletter />
      <FinalCTA />
    </main>
  );
}
