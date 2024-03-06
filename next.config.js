/**
 * @type {import('next').NextConfig}
 * This is the configuration object for a Next.js application.
 */
const nextConfig = {
  /**
   * Enable React's strict mode for additional checks and warnings during development.
   * @type {boolean}
   */
  reactStrictMode: true,

  // Set the base path for the Next.js application based on the environment variable
  /**
   * The base path for the Next.js application.
   * If the 'BASE_PATH' environment variable is defined, its value will be used;
   * otherwise, an empty string will be used.
   * @type {string}
   */
  basePath: process.env.BASE_PATH || "",
};

module.exports = nextConfig;

