import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "**.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "voicecare.ai",
      },
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME || "voicecare.ai",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/wp-login.php", destination: "/api/wp-proxy/wp-login.php" },
        { source: "/wp-admin", destination: "/api/wp-proxy/wp-admin" },
        { source: "/wp-admin/:path*", destination: "/api/wp-proxy/wp-admin/:path*" },
        { source: "/wp-json", destination: "/api/wp-proxy/wp-json" },
        { source: "/wp-json/:path*", destination: "/api/wp-proxy/wp-json/:path*" },
        { source: "/wp-content/:path*", destination: "/api/wp-proxy/wp-content/:path*" },
        { source: "/wp-includes/:path*", destination: "/api/wp-proxy/wp-includes/:path*" },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
