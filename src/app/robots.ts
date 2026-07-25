import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await prisma.siteSettings.findFirst();
  const baseUrl = settings?.url || "https://samarth.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
