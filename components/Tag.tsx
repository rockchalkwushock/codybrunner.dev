import * as React from 'react'

interface Props {
  tag: string
}

type Styles = {
  bg: Record<'default', string>
  border: Record<'default', string>
}

// This is kind of ridiculous but this is what I have to do
// to have dynamic styling. I must swap out the entire className
// not just the "color" (eg: "red").
const colorMap: Record<string, Styles> = {
  cli: {
    bg: {
      default: 'bg-rose-200',
    },
    border: {
      default: 'border-rose-500',
    },
  },
  colombia: {
    bg: {
      default: 'bg-gradient-to-b from-yellow-300 via-blue-300 to-red-300',
    },
    border: {
      default: 'border-blueGray-500',
    },
  },
  django: {
    bg: {
      default: 'bg-blue-200',
    },
    border: {
      default: 'border-blue-500',
    },
  },
  elixir: {
    bg: {
      default: 'bg-purple-200',
    },
    border: {
      default: 'border-purple-500',
    },
  },
  erlang: {
    bg: {
      default: 'bg-pink-200',
    },
    border: {
      default: 'border-pink-500',
    },
  },
  graphql: {
    bg: {
      default: 'bg-pink-200',
    },
    border: {
      default: 'border-pink-500',
    },
  },
  hugo: {
    bg: {
      default: 'bg-teal-200',
    },
    border: {
      default: 'border-teal-500',
    },
  },
  javascript: {
    bg: {
      default: 'bg-yellow-200',
    },
    border: {
      default: 'border-yellow-500',
    },
  },
  'live-view': {
    bg: {
      default: 'bg-orange-200',
    },
    border: {
      default: 'border-orange-500',
    },
  },
  nextjs: {
    bg: {
      default: 'bg-cyan-200',
    },
    border: {
      default: 'border-cyan-500',
    },
  },
  nodejs: {
    bg: {
      default: 'bg-green-200',
    },
    border: {
      default: 'border-green-500',
    },
  },
  personal: {
    bg: {
      default: 'bg-violet-200',
    },
    border: {
      default: 'border-violet-500',
    },
  },
  phoenix: {
    bg: {
      default: 'bg-orange-200',
    },
    border: {
      default: 'border-orange-500',
    },
  },
  postgres: {
    bg: {
      default: 'bg-blue-200',
    },
    border: {
      default: 'border-blue-500',
    },
  },
  python: {
    bg: {
      default: 'bg-blue-200',
    },
    border: {
      default: 'border-blue-500',
    },
  },
  'raspberry-pi': {
    bg: {
      default: 'bg-rose-200',
    },
    border: {
      default: 'border-rose-500',
    },
  },
  react: {
    bg: {
      default: 'bg-cyan-200',
    },
    border: {
      default: 'border-cyan-500',
    },
  },
  sql: {
    bg: {
      default: 'bg-lightBlue-200',
    },
    border: {
      default: 'border-lightBlue-500',
    },
  },
  tailwindcss: {
    bg: {
      default: 'bg-lightBlue-200',
    },
    border: {
      default: 'border-lightBlue-500',
    },
  },
  typescript: {
    bg: {
      default: 'bg-lightBlue-200',
    },
    border: {
      default: 'border-lightBlue-500',
    },
  },
  vscode: {
    bg: {
      default: 'bg-lightBlue-200',
    },
    border: {
      default: 'border-lightBlue-500',
    },
  },
}

export const Tag: React.FC<Props> = ({ tag }) => {
  const colors = colorMap[tag] || {
    bg: { default: 'bg-blueGray-200' },
    border: { default: 'border-blueGray-500' },
  }
  return (
    <div
      className={`${colors.bg} ${colors.bg.default} ${colors.border.default} border flex items-center justify-center px-2 py-0.5 rounded-full text-primary text-xs`}
    >
      {tag}
    </div>
  )
}
