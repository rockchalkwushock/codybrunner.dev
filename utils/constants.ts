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

export interface Project {
  description: string
  isArchived?: boolean
  name: string
  source?: string
  url?: string
}

export const constants: Constants = {
  // Programmatically handle updating my age.
  age:
    new Date().getMonth() > 1
      ? parseInt(year) - 1988
      : parseInt(year) - 1 - 1988,
  author: 'Cody Brunner',
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
    { path: '/contact', text: 'Contact' },
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

export const projects: Record<
  'elixir' | 'enterprise' | 'js/ts' | 'oss' | 'python',
  Array<Project>
> = {
  elixir: [
    {
      description: 'Chakra is a url shortener built with Elixir.',
      name: 'chakra',
      source: 'https://github.com/rockchalkwushock/chakra',
    },
    {
      description:
        'Ice Bear is a Telegram bot my wife and I use as an automated reminder app to keep up with daily life stuff.',
      name: 'Ice Bear (in development)',
      source: 'https://github.com/rockchalkwushock/ice-bear',
      url: 'https://t.me/icebarebot',
    },
  ],
  enterprise: [
    {
      description:
        'Appointlet is scheduling software that integrates with Google and Office 365 calendars as well as numerous video conferencing providers.',
      name: 'Appointlet',
      url: 'https://app.appointlet.com',
    },
    {
      description: 'Chrome extension for Appointlet.',
      name: 'Appointlet Chrome Extension',
      url: 'https://chrome.google.com/webstore/detail/appointlet/oanmefncibhopinffldmcfpkhjfcnggo',
    },
    {
      description:
        'JavaScript SDK for developers to work with the Appointlet API.',
      name: 'Appointlet SDK',
      url: 'https://www.npmjs.com/package/@appointlet/appointlet.js',
    },
  ],
  'js/ts': [
    {
      description:
        'My personal website built with NextJS, TypeScript, & TailwindCSS.',
      name: 'codybrunner.dev',
      source: 'https://github.com/rockchalkwushock/codybrunner.dev',
      url: 'https://codybrunner.dev',
    },
    {
      description:
        'devquery is an application for searching developers using the GitHub API.',
      name: 'devquery.com',
      source: 'https://github.com/rockchalkwushock/dev-query',
      url: 'https://devquery.com',
    },
    {
      description:
        'A starter repository for NextJS with a focus on automation with GitHub Actions.',
      name: 'NextJS Starter Repository',
      source: 'https://github.com/rockchalkwushock/nextjs-starter-repo',
    },
    {
      description: 'A Telegram Bot integration with the Chuck Norris Joke API.',
      isArchived: true,
      name: 'Telegram Chuck Norris Bot',
      source: 'https://github.com/rockchalkwushock/telegram_chuck_norris_bot',
    },
    {
      description:
        'Weather application built with using ApolloGraphql and Create-React-App and the APIXU API.',
      isArchived: true,
      name: 'React Weather',
      source: 'https://github.com/rockchalkwushock/react-weather-app',
    },
    {
      description:
        "Blindfold'em is a pomodoro timer built using NextJS & MomentJS.",
      isArchived: true,
      name: "Blindfold'em",
      source: 'https://github.com/rockchalkwushock/blindfold-em',
    },
    {
      description:
        'Find local breweries using the Google Maps & Google Places API.',
      isArchived: true,
      name: 'Bro2Brew',
      source: 'https://github.com/rockchalkwushock/Bro2Brew_App',
      url: 'https://rockchalkwushock.github.io/Bro2Brew_App',
    },
  ],
  oss: [
    {
      description: 'My first crack at publishing an OSS package on NPM.',
      name: 'how-to-open-source',
      source: 'https://github.com/rockchalkwushock/how-to-open-source',
      url: 'https://www.npmjs.com/package/how-to-open-source',
    },
    {
      description: 'Vkontakte OAuth for the MicroJS framework.',
      name: 'microauth-vkontakte',
      source: 'https://github.com/microauth/microauth-vkontakte',
      url: 'https://www.npmjs.com/package/microauth-vkontakte',
    },
    {
      description: 'My personal Eslint config.',
      name: '@rockchalkwushock/eslint-config',
      source: 'https://github.com/rockchalkwushock/eslint-config',
      url: 'https://www.npmjs.com/package/@rockchalkwushock/eslint-config',
    },
    {
      description: 'My fork of the popular highlighter.',
      name: '@rockchalkwushock/prism-react-renderer',
      source: 'https://github.com/rockchalkwushock/prism-react-renderer',
      url: 'https://www.npmjs.com/package/@rockchalkwushock/prism-react-renderer',
    },
    {
      description:
        'Rehype plugin for parsing code blocks and adding titles to code blocks.',
      name: 'rehype-code-titles',
      source: 'https://github.com/rockchalkwushock/rehype-code-titles',
      url: 'https://www.npmjs.com/package/rehype-code-titles',
    },
  ],
  python: [
    {
      description: 'A FitBit dashboard built using Django.',
      isArchived: true,
      name: 'django-fit',
      source: 'https://github.com/rockchalkwushock/django-fit',
    },
  ],
}
