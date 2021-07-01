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
    bg: 'bg-accent-red',
    border: 'border-accent-red',
  },
  colombia: {
    bg: 'bg-gradient-to-b from-yellow-500 via-blue-500 to-red-500',
    border: 'border-white',
  },
  elixir: {
    bg: 'bg-accent-purple',
    border: 'border-accent-purple',
  },
  graphql: {
    bg: 'bg-accent-magenta',
    border: 'border-accent-magenta',
  },
  hugo: {
    bg: 'bg-accent-magenta',
    border: 'border-accent-magenta',
  },
  javascript: {
    bg: 'bg-accent-yellow',
    border: 'border-accent-yellow',
  },
  'live-view': {
    bg: 'bg-accent-orange',
    border: 'border-accent-orange',
  },
  nodejs: {
    bg: 'bg-accent-green',
    border: 'border-accent-green',
  },
  personal: {
    bg: 'bg-accent-purple',
    border: 'border-accent-purple',
  },
  phoenix: {
    bg: 'bg-accent-orange',
    border: 'border-accent-orange',
  },
  python: {
    bg: 'bg-accent-blue',
    border: 'border-accent-blue',
  },
  react: {
    bg: 'bg-accent-blue',
    border: 'border-accent-blue',
  },
  tailwindcss: {
    bg: 'bg-accent-blue',
    border: 'border-accent-blue',
  },
  typescript: {
    bg: 'bg-accent-blue',
    border: 'border-accent-blue',
  },
  vscode: {
    bg: 'bg-accent-blue',
    border: 'border-accent-blue',
  },
}

export const Tag: React.FC<Props> = ({ tag }) => {
  const colors = colorMap[tag] || {
    bg: 'bg-gray-light',
    border: 'border-gray-light',
  }
  return (
    <div
      className={`${colors.bg} ${colors.border} border flex items-center justify-center px-2 py-0.5 rounded-full shadow-md text-white text-xs`}
    >
      {tag}
    </div>
  )
}
