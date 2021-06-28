import * as React from 'react'

interface Props {
  tag: string
}

type Styles = {
  bg: string
}

// This is kind of ridiculous but this is what I have to do
// to have dynamic styling. I must swap out the entire className
// not just the "color" (eg: "red").
const colorMap: Record<string, Styles> = {
  cli: {
    bg: 'bg-accent-red',
  },
  colombia: {
    bg: 'bg-gradient-to-b from-yellow-500 via-blue-500 to-red-500',
  },
  elixir: {
    bg: 'bg-accent-purple',
  },
  graphql: {
    bg: 'bg-accent-magenta',
  },
  hugo: {
    bg: 'bg-accent-magenta',
  },
  javascript: {
    bg: 'bg-accent-yellow',
  },
  'live-view': {
    bg: 'bg-accent-orange',
  },
  nodejs: {
    bg: 'bg-accent-green',
  },
  personal: {
    bg: 'bg-accent-purple',
  },
  phoenix: {
    bg: 'bg-accent-orange',
  },
  python: {
    bg: 'bg-accent-blue',
  },
  react: {
    bg: 'bg-accent-teal',
  },
  tailwindcss: {
    bg: 'bg-accent-teal',
  },
  typescript: {
    bg: 'bg-accent-blue',
  },
  vscode: {
    bg: 'bg-accent-blue',
  },
}

export const Tag: React.FC<Props> = ({ tag }) => {
  const colors = colorMap[tag] || {
    bg: 'bg-gray-light',
  }
  return (
    <div
      className={`${colors.bg} border-current border flex items-center justify-center px-2 py-0.5 rounded-full shadow-md text-xs`}
    >
      {tag}
    </div>
  )
}
