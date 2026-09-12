import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.condadovanderbilt.com",
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "www.bahialimo-pr.com",
      },
      {
        protocol: "https",
        hostname: "karensuttonhairstudio.com",
      },
    ],
  },
};

export default nextConfig;