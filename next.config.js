// This is currently needed because 'rehype-code-titles' is a pure-ESM package
// and NextJS cannot resolve the import properly.
// https://github.com/vercel/next.js/issues/9607
const withTM = require('next-transpile-modules')(['rehype-code-titles'])

module.exports = withTM({
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      // https://github.com/vercel/next.js/issues/7755
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      }
    }

    return config
  },
})
