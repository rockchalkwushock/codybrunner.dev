import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { Cycle, motion, MotionProps, useCycle, Variants } from 'framer-motion'
import { Moon, Sun } from 'react-feather'

import { useDimensions } from '@hooks/useDimensions'
import { useAmplitude } from '@hooks/useAmplitude'
import { constants } from '@utils/constants'

// MenuLink

type MenuLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps & {
    to: string
  }

const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ children, onClick, to, ...rest }, ref) => {
    const { asPath } = useRouter()
    return (
      <NextLink href={to} passHref>
        <motion.a
          {...rest}
          className={`border-2 border-transparent group px-6 py-2 rounded-full text-2xl text-center w-full hover:border-indigo-600 hover:bg-indigo-100 ${
            asPath === to ? 'border-teal-500' : ''
          }`}
          onClick={onClick}
          ref={ref}
        >
          <span className="group-hover:text-indigo-600">{children}</span>
        </motion.a>
      </NextLink>
    )
  }
)

// AnimatedMenuItem

const menuItemVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.8,
      y: { stiffness: 1000, velocity: -100 },
    },
    y: 0,
  },
}

const AnimatedMenuItem: React.FC = ({ children }) => {
  return (
    <motion.li className="text-center w-full" variants={menuItemVariants}>
      {children}
    </motion.li>
  )
}

// AnimatedMenu

const menuVariants: Variants = {
  closed: {
    display: 'none',
    transition: { delay: 0.5, staggerChildren: 0.05, staggerDirection: -1 },
    width: 0,
  },
  open: {
    display: 'flex',
    transition: { delayChildren: 0.2, staggerChildren: 0.07 },
    width: '18rem',
  },
}

interface AnimatedMenuProps {
  onNavigate: () => void
}

const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ onNavigate }) => {
  return (
    <motion.ul
      className="absolute flex-col items-center p-6 top-16 w-72 z-20"
      variants={menuVariants}
    >
      <motion.div className="flex flex-col flex-grow items-center space-y-6 w-full">
        {constants.menu.map(({ path, text }) => (
          <AnimatedMenuItem key={text.toLocaleLowerCase()}>
            <MenuLink onClick={onNavigate} to={path}>
              {text}
            </MenuLink>
          </AnimatedMenuItem>
        ))}
      </motion.div>
    </motion.ul>
  )
}

// AnimatedMenuToggle

const toggleVariants: Array<Variants> = [
  {
    closed: { d: 'M 2 2.5 L 20 2.5' },
    open: { d: 'M 3 16.5 L 17 2.5' },
  },
  {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  },
  {
    closed: { d: 'M 2 16.346 L 20 16.346' },
    open: { d: 'M 3 2.5 L 17 16.346' },
  },
]

interface AnimatedMenuToggleProps {
  toggle: Cycle
}

const AnimatedMenuToggle: React.FC<AnimatedMenuToggleProps> = ({ toggle }) => {
  return (
    <button
      className="absolute bg-transparent border-0 cursor-pointer flex h-12 items-center justify-center left-4 outline-none rounded-full top-5 w-12 z-20 focus:outline-none"
      onClick={() => toggle()}
    >
      <svg height="24" viewBox="0 0 23 23" width="24">
        <motion.path
          className="fill-current stroke-current"
          strokeLinecap="round"
          strokeWidth="3"
          variants={toggleVariants[0]}
        />
        <motion.path
          className="fill-current stroke-current"
          d="M 2 9.423 L 20 9.423"
          strokeLinecap="round"
          strokeWidth="3"
          transition={{ duration: 0.1 }}
          variants={toggleVariants[1]}
        />
        <motion.path
          className="fill-current stroke-current"
          strokeLinecap="round"
          strokeWidth="3"
          variants={toggleVariants[2]}
        />
      </svg>
    </button>
  )
}

// AnimatedMobileNav

const mobileNavVariants: Variants = {
  closed: {
    clipPath: 'circle(1.875rem at 2.5rem 2.5rem)',
    height: 'inherit',
    transition: {
      damping: 40,
      delay: 0.5,
      stiffness: 400,
      type: 'spring',
    },
    width: '5rem',
  },
  open: (height = 1000) => ({
    clipPath: `circle(${(height * 2 + 200) / 16}rem at 2.5rem 2.5rem)`,
    height: '100vh',
    transition: {
      restDelta: 2,
      stiffness: 20,
      type: 'spring',
    },
    width: '18rem',
  }),
}

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

const ThemeToggle: React.FC = () => {
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
      className="border-0 cursor-pointer duration-300 ease-in-out flex group h-14 items-center justify-center mr-2 outline-none rounded-full top-0 transform-gpu transition w-14 z-20 focus:outline-none lg:mr-0 hover:scale-110"
      onClick={onToggleTheme}
      type="button"
      variants={themeToggleVariants}
    >
      {mounted && theme === 'dark' && (
        <Moon className="h-7 w-7  group-hover:text-amber-300" />
      )}
      {mounted && theme === 'light' && (
        <Sun className="h-7 w-7 group-hover:text-amber-300" />
      )}
    </motion.button>
  )
}

const AnimatedMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useCycle(false, true)
  const containerRef = React.useRef(null)
  const { height } = useDimensions(containerRef)

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
      return
    }
    document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onNavigate = React.useCallback(() => setIsOpen(), [])

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className="relative h-20 lg:hidden"
      custom={height}
      initial={false}
      ref={containerRef}
    >
      <motion.div
        className="absolute bg-amber-100 dark:bg-blueGray-400 bottom-0 left-0 shadow-lg top-0 z-20"
        variants={mobileNavVariants}
      />
      <AnimatedMenu onNavigate={onNavigate} />
      <AnimatedMenuToggle toggle={setIsOpen} />
    </motion.div>
  )
}

// Desktop Nav

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:items-center lg:space-x-4 lg:text-2xl lg:w-full">
      <div className="flex-shrink">codybrunner.dev</div>
      <ul className="flex space-x-6">
        {constants.menu.map(({ path, text }) => (
          <AnimatedMenuItem key={text}>
            <MenuLink to={path}>{text}</MenuLink>
          </AnimatedMenuItem>
        ))}
      </ul>
    </div>
  )
}

// AppNav

export const AppNav: React.FC = () => {
  return (
    <nav className="bg-primary flex items-center justify-between mx-auto sticky top-0 w-full z-10 lg:p-4">
      <AnimatedMobileNav />
      <DesktopNav />
      <ThemeToggle />
    </nav>
  )
}
