import { MetadataRoute } from 'next';
import { profile } from '@/config/profile';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${profile.site.url}/sitemap.xml`,
  };
}
