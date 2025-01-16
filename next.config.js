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
    domains: ['storage.googleapis.com'], // 외부 이미지 도메인 허용
  }
}

module.exports = nextConfig 