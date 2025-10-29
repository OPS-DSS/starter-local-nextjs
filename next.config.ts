import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@ops-dss/ui', '@ops-dss/charts', '@ops-dss/explorers'],
}

export default nextConfig
