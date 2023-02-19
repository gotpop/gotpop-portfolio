/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.sanity.io", "avatars.githubusercontent.com"],
  }
}

module.exports = nextConfig
