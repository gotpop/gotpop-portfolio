module.exports = {
  images: {
    domains: ["cdn.sanity.io", "avatars.githubusercontent.com"],
    // loader: "custom"
  },
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  }
};
