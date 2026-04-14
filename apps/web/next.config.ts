import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@welkyn/database', '@welkyn/shared'],
  // Enable standalone output for Docker production builds
  // output: 'standalone',
};

export default nextConfig;
