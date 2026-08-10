/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  outputFileTracing: false,
  // Ensure static optimization for better Vercel deployment
  productionBrowserSourceMaps: false,
  compress: true,
  swcMinify: true,
  // Optimize for serverless deployment
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
