/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set the basePath based on the environment variable
  basePath: process.env.BASE_PATH || "",
};

module.exports = nextConfig;

