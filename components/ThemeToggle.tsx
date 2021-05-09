import * as React from 'react'
import { motion, Variants } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'react-feather'

import { useAmplitude } from '@hooks/useAmplitude'

const themeToggleVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {},
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
}

export const ThemeToggle: React.FC = () => {
  const { setEvent } = useAmplitude(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const onToggleTheme = React.useCallback(() => {
    setEvent('toggle theme', { theme: theme === 'dark' ? 'light' : 'dark' })
    setTheme(theme === 'dark' ? 'light' : 'dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])
  return (
    <motion.button
      aria-label="Toggle Color Theme"
      className="group theme-toggle"
      onClick={onToggleTheme}
      type="button"
      variants={themeToggleVariants}
    >
      {mounted && theme === 'dark' && (
        <Moon className="dark:group-hover:stroke-accent-4" />
      )}
      {mounted && theme === 'light' && (
        <Sun className="group-hover:stroke-accent-3" />
      )}
    </motion.button>
  )
}
