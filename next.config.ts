import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep old /contact links (bookmarks, shared URLs) working
  async redirects() {
    return [
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
};

export default nextConfig;
