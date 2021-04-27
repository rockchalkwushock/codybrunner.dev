// Native
import { join } from 'path'

import { formatDateTime } from './dateTime'

const root = process.cwd()

// Must be CJS import!
const pkg = require('package.json')

const year = formatDateTime(new Date(), 'full-year')

type Constants = {
  age: number
  author: string
  copyright: string
  employment: {
    location: string
    name: string
    role: string
  }
  externalLinks: {
    github: string
    instagram: string
    linkedin: string
    next: string
    source: string
    tailwindCSS: string
    twitter: string
    vercel: string
  }
  keywords: Array<string>
  location: string
  menu: Array<{ path: string; text: string }>
  tech: Record<string, string>
  twitter: string
  url: string
  version: string
}

export const appRegex = {
  archive: /(blog\/archive\/.+)/,
  blog: /blog\//,
  blogSource: /data\/blog\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
}

export const constants: Constants = {
  // Programmatically handle updating my age.
  age:
    new Date().getMonth() > 1
      ? parseInt(year) - 1988
      : parseInt(year) - 1 - 1988,
  author: 'Cody Brunner',
  copyright: `© 2017-${year}`,
  employment: {
    location: 'Portland, Oregon, USA',
    name: 'Appointlet',
    role: 'web developer',
  },
  externalLinks: {
    github: 'https://github.com/rockchalkwushock',
    instagram: 'https://www.instagram.com/rockchalkwushock',
    linkedin: 'https://www.linkedin.com/in/cody-brunner',
    next: 'https://nextjs.org',
    source: 'https://github.com/rockchalkwushock/codybrunner.dev',
    tailwindCSS: 'https://tailwindcss.com',
    twitter: 'https://twitter.com/RockChalkDev',
    vercel: 'https://vercel.com',
  },
  keywords: [
    'Cody Brunner',
    'Software Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'Colombia',
  ],
  location: 'Colombia',
  menu: [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/CodyBrunner.pdf', text: 'Resume' },
    { path: '/contact', text: 'Contact' },
  ],
  tech: {
    next: pkg.dependencies.next.substr(1, 4), // Major.Minor
    tailwindCSS: pkg.devDependencies.tailwindcss.substr(1, 3), // Major.Minor
  },
  twitter: '@RockChalkDev',
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://codybrunner.dev'
      : 'http://localhost:4000',
  version: pkg.version,
}

export const paths = {
  api: join(root, 'pages', 'api'),
  blog: join(root, 'data', 'blog'),
  components: join(root, 'components'),
  hooks: join(root, 'hooks'),
  lib: join(root, 'lib'),
  pages: join(root, 'pages'),
  utils: join(root, 'utils'),
}
