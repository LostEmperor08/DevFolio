import { Metadata } from 'next';
import { profile } from '../config/profile';
import { SEO_DEFAULTS } from '../constants/seo';

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Generates SEO metadata for any page in the application.
 * Falls back to defaults defined in siteConfig and SEO_DEFAULTS.
 */
export function generatePageMetadata({
  title,
  description,
  image,
  noIndex,
}: MetadataProps = {}): Metadata {
  return {
    title: title ? `${title} | ${profile.personal.name}` : SEO_DEFAULTS.defaultTitle,
    description: description || SEO_DEFAULTS.defaultDescription,
    openGraph: {
      title: title || SEO_DEFAULTS.defaultTitle,
      description: description || SEO_DEFAULTS.defaultDescription,
      url: profile.site.url,
      siteName: profile.personal.name,
      images: [
        {
          url: image || '/og-image.jpg',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || SEO_DEFAULTS.defaultTitle,
      description: description || SEO_DEFAULTS.defaultDescription,
      images: [image || '/og-image.jpg'],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
