const path = require('path');

// Disable Next.js anonymous telemetry (no build/usage data sent)
process.env.NEXT_TELEMETRY_DISABLED = "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com", pathname: "/**" },
      // S3: set S3_IMAGE_HOSTNAME to your bucket host, e.g. my-bucket.s3.us-east-1.amazonaws.com or CloudFront domain
      ...(process.env.S3_IMAGE_HOSTNAME
        ? [{ protocol: "https", hostname: process.env.S3_IMAGE_HOSTNAME, pathname: "/**" }]
        : []),
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: path.join(__dirname),
}

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    }
    return config
  },
}
