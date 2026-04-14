import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@welkyn/database', '@welkyn/shared'],
  output: 'standalone',
};

export default nextConfig;
