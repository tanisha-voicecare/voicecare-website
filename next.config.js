/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration for WordPress media
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        // VoiceCare WordPress domain
        protocol: 'https',
        hostname: 'voicecare.ai',
      },
      {
        // Allow images from WordPress CMS domain (fallback)
        protocol: 'https',
        hostname: process.env.WORDPRESS_HOSTNAME || 'voicecare.ai',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Proxy WordPress API calls to the original WordPress server
  // Since voicecare.ai now points to Vercel, we need to forward /wp-json/ requests to WordPress
  async rewrites() {
    return [
      {
        source: '/wp-json/:path*',
        destination: 'http://74.208.236.249/wp-json/:path*',
      },
    ];
  },

  // Security headers for healthcare compliance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
