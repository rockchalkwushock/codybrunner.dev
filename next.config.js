// This is currently needed because 'rehype-code-titles' is a pure-ESM package
// and NextJS cannot resolve the import properly.
// https://github.com/vercel/next.js/issues/9607
const withTM = require('next-transpile-modules')(['rehype-code-titles'])

module.exports = withTM({
  env: {
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
  },
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

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
