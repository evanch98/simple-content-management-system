/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  images: {
    remotePatterns: [
      {
        hostname: 'enchanted-newt-444.convex.cloud',
      },
    ],
  },
};

export default nextConfig;
