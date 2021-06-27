import * as React from 'react'

interface Props {
  tag: string
}

type Styles = {
  bg: string
  border: string
}

// This is kind of ridiculous but this is what I have to do
// to have dynamic styling. I must swap out the entire className
// not just the "color" (eg: "red").
const colorMap: Record<string, Styles> = {
  cli: {
    bg: 'bg-rose-500',
    border: 'border-rose-500',
  },
  colombia: {
    bg: 'bg-gradient-to-b from-yellow-500 via-blue-500 to-red-500',
    border: 'border-blueGray-500',
  },
  django: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
  },
  elixir: {
    bg: 'bg-purple-500',
    border: 'border-purple-500',
  },
  graphql: {
    bg: 'bg-pink-500',
    border: 'border-pink-500',
  },
  hugo: {
    bg: 'bg-teal-500',
    border: 'border-teal-500',
  },
  javascript: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-500',
  },
  'live-view': {
    bg: 'bg-orange-500',
    border: 'border-orange-500',
  },
  nextjs: {
    bg: 'bg-cyan-500',
    border: 'border-cyan-500',
  },
  nodejs: {
    bg: 'bg-green-500',
    border: 'border-green-500',
  },
  personal: {
    bg: 'bg-violet-500',
    border: 'border-violet-500',
  },
  phoenix: {
    bg: 'bg-orange-500',
    border: 'border-orange-500',
  },
  python: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
  },
  react: {
    bg: 'bg-cyan-500',
    border: 'border-cyan-500',
  },
  tailwindcss: {
    bg: 'bg-sky-500',
    border: 'border-sky-500',
  },
  typescript: {
    bg: 'bg-sky-500',
    border: 'border-sky-500',
  },
  vscode: {
    bg: 'bg-sky-500',
    border: 'border-sky-500',
  },
}

export const Tag: React.FC<Props> = ({ tag }) => {
  const colors = colorMap[tag] || {
    bg: 'bg-blueGray-500',
    border: 'border-blueGray-500',
  }
  return (
    <div
      className={`${colors.bg} ${colors.border} border flex items-center justify-center px-2 py-0.5 rounded-full text-primary text-xs`}
    >
      {tag}
    </div>
  )
}
