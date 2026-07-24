import { MetadataRoute } from 'next';
import { profile } from '@/config/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.site.url;

  // We would typically fetch dynamic routes here (e.g. from a CMS or local MDX files)
  // For the sake of this V1, we will mock the dynamic routes based on our built project structure.
  
  const projects = ['samarth-os', 'project-alpha', 'nexus-api'].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogs = ['rebuilding-the-physics-engine', 'security-first-development'].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...projects,
    ...blogs,
  ];
}
