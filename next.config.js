const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import('next').NextConfig}
 **/
const customNextConfig = {
  eslint: {
    dirs: ['components', 'hooks', 'layouts', 'lib', 'pages', 'utils'],
  },

  experimental: {
    // https://nextjs.org/blog/next-11-1#es-modules-support
    esmExternals: true,
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
  webpack: (config, { dev, isServer }) => {
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
}

module.exports = withBundleAnalyzer(customNextConfig)

// https://securityheaders.com
const CSP = `
  child-src appt.link;
  connect-src *;
  default-src 'self';
  font-src 'self' *.gstatic.com;
  frame-ancestors 'self' https://appt.link/';
  frame-src appt.link giphy.com platform.twitter.com *.youtube.com;
  img-src * blob: data:;
  media-src 'none';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' platform.twitter.com *.youtube.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
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
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  // Opt for 'frame-ancestors' instead, better modern browser support.
  // {
  //   key: 'X-Frame-Options',
  //   value: 'ALLOW-FROM https://appt.link/',
  // },
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
  // Get this for free from Vercel.
  // {
  //   key: 'Strict-Transport-Security',
  //   value: 'max-age=31536000; includeSubDomains; preload',
  // },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]
