import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/command-centre",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
