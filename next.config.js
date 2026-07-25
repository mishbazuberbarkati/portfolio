const nextConfig = {
    output: "export",
  reactStrictMode: true,
     trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
      remotePatterns: [
      {     protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  
  // Renamed from experimental.serverComponentsExternalPackages in Next 15
  serverExternalPackages: ['mongodb'],
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  
};

module.exports = nextConfig;
