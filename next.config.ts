import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    serverActions: {
      bodySizeLimit: '200mb',
    }
  },
  devIndicators: { appIsrStatus: false }
};

export default nextConfig;
