import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes - all implemented pages
  const routes = [
    '',
    '/platform',
    '/security',
    '/company',
    '/careers',
    '/press',
    '/schedule-demo',
    // '/partner-with-us', // Commented out - not needed for now
    '/who-we-serve',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
