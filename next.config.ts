import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
  devIndicators: { appIsrStatus: false }
};

export default nextConfig;
