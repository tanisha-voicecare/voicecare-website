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
    '/partner-with-us',
    '/who-we-serve',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
