import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  allowedDevOrigins: ['192.168.0.111'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
