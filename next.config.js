/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_STANDALONE ? 'standalone' : undefined,
  images: {
    domains: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL 
      ? [new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).hostname]
      : [],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Allow iframe embedding for WordPress integration (remove X-Frame-Options to allow embedding)
          // Note: For production, consider using Content-Security-Policy instead
        ],
      },
    ]
  },
}

module.exports = nextConfig

