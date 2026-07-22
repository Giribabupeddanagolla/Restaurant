/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
  // Font optimization for faster page loads
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/fonts/',
            outputPath: `${isServer ? '../' : ''}static/fonts/`,
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
}

module.exports = withBundleAnalyzer(nextConfig)
