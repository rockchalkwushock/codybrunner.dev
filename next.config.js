// This is currently needed because 'rehype-code-titles' is a pure-ESM package
// and NextJS cannot resolve the import properly.
// https://github.com/vercel/next.js/issues/9607
const withTM = require('next-transpile-modules')(['rehype-code-titles'])

module.exports = withTM({
  env: {
    AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
  },
  future: {
    strictPostcssConfiguration: true,
    webpack5: true,
  },
  reactStrictMode: true,
  // https://github.com/leerob/leerob.io/blob/main/next.config.js
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
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

// https://securityheaders.com
const CSP = `
  child-src https://appt.link/ https://api.amplitude.com/;
  connect-src *;
  default-src 'self';
  font-src 'self';
  frame-src https://appt.link/;
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.amplitude.com/;
  style-src 'self' 'unsafe-inline';
`

const securityHeaders = [
  process.env.NODE_ENV === 'production'
    ? // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
      {
        key: 'Content-Security-Policy',
        value: CSP.replace(/\n/g, ''),
      }
    : {
        // Using this policy instead in development will report in the console
        // what the outcome of the headers will be.
        key: 'Content-Security-Policy-Report-Only',
        value: CSP.replace(/\n/g, ''),
      },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'ALLOW-FROM https://appt.link/',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]
