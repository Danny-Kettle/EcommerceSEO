/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/danny-kettle.github.io/EcommerceSEO",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "/danny-kettle.github.io/EcommerceSEO/"
      : "",
};

module.exports = nextConfig;
