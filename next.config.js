/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
  sassOptions: {
    includePaths: ["./styles"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
