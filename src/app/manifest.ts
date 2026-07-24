import { MetadataRoute } from 'next';
import { profile } from '@/config/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.personal.name,
    short_name: 'Portfolio',
    description: profile.personal.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // In production, we would add icon-192x192.png and icon-512x512.png
    ],
  };
}
