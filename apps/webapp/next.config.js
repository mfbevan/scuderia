/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@scuderia/lib",
  "@scuderia/contracts",
]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
