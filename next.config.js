/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs", "@next-auth/prisma-adapter"],
  },
};

module.exports = nextConfig;
