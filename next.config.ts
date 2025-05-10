import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['react-day-picker'],
  images: {
    domains: ['k.kakaocdn.net', 'deark.s3.ap-northeast-2.amazonaws.com'],
  },
}

export default nextConfig
