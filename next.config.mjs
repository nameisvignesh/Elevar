/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",  // Required for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;