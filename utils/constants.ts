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
  books: Array<{ href: string; image: string; title: string }>
  copyright: string
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
  blog: /blog\/(archive\/)*/, // Will match both '/blog/' & '/blog/archive/'
  blogSource: /data\/blog\//,
  mdx: /\.mdx?$/,
  tsx: /\.tsx?$/,
  url: /(https:\/\/codybrunner.dev)|(https:\/\/staging.codybrunner.dev)|(https:\/\/pr-\d+.codybrunner.dev)/g,
}

export const constants: Constants = {
  // Programmatically handle updating my age.
  age:
    new Date().getMonth() > 1
      ? parseInt(year) - 1988
      : parseInt(year) - 1 - 1988,
  author: 'Cody Brunner',
  books: [
    {
      href: 'https://www.amazon.com/dp/B00Y94ZTEA/ref=dp_kinw_strp_1',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/510gQa74-gL._SX330_BO1,204,203,200_.jpg',
      title: "Marriage and Lasting Relationships with Asperger's Syndrome",
    },
    {
      href: 'https://pragprog.com/titles/liveview/programming-phoenix-liveview/',
      image:
        'https://pragprog.com/titles/liveview/programming-phoenix-liveview/liveview-beta-500.jpg',
      title: 'Programming Phoenix LiveView',
    },
    {
      href: 'https://pragprog.com/titles/elixir16/programming-elixir-1-6/',
      image:
        'https://pragprog.com/titles/elixir16/programming-elixir-1-6/elixir16.jpg',
      title: 'Programming Elixir 1.6',
    },
    {
      href: 'https://pragprog.com/titles/cdc-elixir/learn-functional-programming-with-elixir/',
      image:
        'https://pragprog.com/titles/cdc-elixir/learn-functional-programming-with-elixir/cdc-elixir.jpg',
      title: 'Learning Functional Programming with Elixir',
    },
  ],
  copyright: `© 2017-${year}`,
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
    { path: '/blog', text: 'Blog' },
    { path: '/contact', text: 'Contact' },
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/projects', text: 'Projects' },
    { path: '/CodyBrunner.pdf', text: 'Resume' },
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
