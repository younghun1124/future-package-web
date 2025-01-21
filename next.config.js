/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint 검사 비활성화
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 검사 비활성화
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  }
}

module.exports = nextConfig 