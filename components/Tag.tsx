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
    bg: '',
    border: '',
  },
  colombia: {
    bg: '',
    border: '',
  },
  django: {
    bg: '',
    border: '',
  },
  elixir: {
    bg: '',
    border: '',
  },
  graphql: {
    bg: '',
    border: '',
  },
  hugo: {
    bg: '',
    border: '',
  },
  javascript: {
    bg: '',
    border: '',
  },
  'live-view': {
    bg: '',
    border: '',
  },
  nextjs: {
    bg: '',
    border: '',
  },
  nodejs: {
    bg: '',
    border: '',
  },
  personal: {
    bg: '',
    border: '',
  },
  phoenix: {
    bg: '',
    border: '',
  },
  python: {
    bg: '',
    border: '',
  },
  react: {
    bg: '',
    border: '',
  },
  tailwindcss: {
    bg: '',
    border: '',
  },
  typescript: {
    bg: '',
    border: '',
  },
  vscode: {
    bg: '',
    border: '',
  },
}

export const Tag: React.FC<Props> = ({ tag }) => {
  const colors = colorMap[tag] || {
    bg: '',
    border: '',
  }
  return (
    <div
      className={`${colors.bg} ${colors.border} border flex items-center justify-center px-2 py-0.5 rounded-full text-xs`}
    >
      {tag}
    </div>
  )
}
