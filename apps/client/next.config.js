/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@scuderia/lib",
  "@scuderia/contracts",
]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: false,
});

module.exports = nextConfig;
