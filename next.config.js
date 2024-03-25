/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT_MODE,
  exclude: ["api", "middleware"],
};

module.exports = nextConfig;
