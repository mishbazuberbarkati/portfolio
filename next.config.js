/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
};

export default nextConfig;
