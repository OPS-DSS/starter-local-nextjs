import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/charts', '@repo/explorers'],
}

export default nextConfig
