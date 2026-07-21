/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
  },
  // Ensure static optimization for better Vercel deployment
  productionBrowserSourceMaps: false,
  compress: true,
  swcMinify: true,
  // Optimize for serverless deployment
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
