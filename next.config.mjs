/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["gravatar.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 300
};

export default nextConfig;
