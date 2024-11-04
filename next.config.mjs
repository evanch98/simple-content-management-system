/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  images: {
    remotePatterns: [
      {
        hostname: 'enchanted-newt-444.convex.cloud',
      },
      {
        hostname: 'steady-kudu-505.convex.cloud',
      },
    ],
  },
};

export default nextConfig;
