import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = "https://samarthpatil.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
