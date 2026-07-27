import { MetadataRoute } from "next";
import { ProjectService } from "@/services/project.service";
import { BlogService } from "@/services/blog.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://samarthpatil.com";

  // Get all dynamic routes
  const projects = await ProjectService.getAllProjects();
  const blogs = await BlogService.getPublishedBlogs();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
