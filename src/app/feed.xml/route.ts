import { getSiteData } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://samarthpatil.com";

  const { posts } = await getSiteData();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Samarth Patil | Writing</title>
      <link>${baseUrl}</link>
      <description>Personal writing and systems engineering by Samarth Patil</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      
      ${posts
        .map((post) => {
          return `
          <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${baseUrl}/posts/${post.slug}</link>
            <guid>${baseUrl}/posts/${post.slug}</guid>
            <pubDate>${new Date().toUTCString()}</pubDate>
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
