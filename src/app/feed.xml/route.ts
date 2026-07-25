import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.siteSettings.findFirst();
  const baseUrl = settings?.url || "https://samarth.dev";

  const blogs = await prisma.blogPost.findMany({
    where: { draft: false },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${settings?.title || "Samarth OS"}</title>
      <link>${baseUrl}</link>
      <description>${settings?.description || "Developer Portfolio"}</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      
      ${blogs
        .map((post) => {
          return `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${baseUrl}/blog/${post.slug}</link>
            <guid>${baseUrl}/blog/${post.slug}</guid>
            <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
            <description><![CDATA[${post.description}]]></description>
          </item>
        `;
        })
        .join("")}
    </channel>
  </rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
