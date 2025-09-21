// next.config.js
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: { optimizeCss: true },
  images: {
    domains: ['images.unsplash.com', 'img.youtube.com', 'i.ytimg.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com', port: '', pathname: '/vi/**' },
      { protocol: 'https', hostname: 'i.ytimg.com',   port: '', pathname: '/vi/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|png|webp|avif|gif|svg))',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    return config
  },
}

export default nextConfig
