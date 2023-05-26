/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/EcommerceSEO",
  assetPrefix: process.env.NODE_ENV === "production" ? "/EcommerceSEO/" : "",
};

module.exports = nextConfig;
