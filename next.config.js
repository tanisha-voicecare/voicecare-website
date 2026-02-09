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

  // Rewrite WordPress admin paths to our internal proxy API route
  // The proxy connects directly to WordPress server IP (bypassing DNS)
  // This allows wp-admin to work on voicecare.ai even though domain points to Vercel
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/wp-login.php', destination: '/api/wp-proxy/wp-login.php' },
        { source: '/wp-admin', destination: '/api/wp-proxy/wp-admin' },
        { source: '/wp-admin/:path*', destination: '/api/wp-proxy/wp-admin/:path*' },
        { source: '/wp-content/:path*', destination: '/api/wp-proxy/wp-content/:path*' },
        { source: '/wp-includes/:path*', destination: '/api/wp-proxy/wp-includes/:path*' },
        { source: '/backend', destination: '/api/wp-proxy/backend' },
        { source: '/wp-json/:path*', destination: '/api/wp-proxy/wp-json/:path*' },
        { source: '/wp-cron.php', destination: '/api/wp-proxy/wp-cron.php' },
        { source: '/xmlrpc.php', destination: '/api/wp-proxy/xmlrpc.php' },
      ],
    };
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
