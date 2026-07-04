/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Elevar",
  assetPrefix: "/Elevar/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;