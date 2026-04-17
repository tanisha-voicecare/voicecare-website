import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Generates /sitemap.xml via Next.js Metadata API.
 *
 * Add new routes here as pages are created.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/solutions",
    "/company",
    "/pricing",
    "/schedule-demo",
    "/blog",
    "/careers",
    "/security",
    "/partner-with-us",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/solutions" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/solutions" ? 0.8 : 0.6,
  })) as MetadataRoute.Sitemap;
}
