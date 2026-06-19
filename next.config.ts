import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      hostname:"**"
    }]
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        'C:\\\\Users\\\\**',
      ],
    };
    return config;
  },
};

export default nextConfig;