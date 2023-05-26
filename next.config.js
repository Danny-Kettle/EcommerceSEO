/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: process.env.NODE_ENV === "production" ? "/EcommerceSEO" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/EcommerceSEO" : "",
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*/",
      },
    ];
  },
};

module.exports = nextConfig;
