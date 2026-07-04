/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",  // ✅ Move this to the top level
  images: {
    unoptimized: true,  // Required for static export
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;