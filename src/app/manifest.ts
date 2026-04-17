import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Generates /manifest.webmanifest — the PWA / mobile-install manifest.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "VCAI",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#06003f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", purpose: "any" },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
