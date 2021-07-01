import * as React from 'react'
import { Cycle, motion, MotionProps, useCycle, Variants } from 'framer-motion'
import { useRouter } from 'next/router'

import { MenuLink } from './MenuLink'
import { useDimensions } from '@hooks/useDimensions'
import { constants } from '@utils/constants'

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

type Props = React.LiHTMLAttributes<HTMLLIElement> & MotionProps & {}

export const AnimatedMenuItem: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <motion.li variants={menuItemVariants} {...rest}>
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
  const { asPath } = useRouter()
  return (
    <motion.ul
      className="absolute flex-col items-center p-6 top-16 w-72 z-20"
      variants={menuVariants}
    >
      <motion.div className="flex flex-col flex-grow items-center space-y-6 w-full">
        {constants.menu.map(({ path, text }, i) => (
          <AnimatedMenuItem
            aria-disabled={asPath === path}
            className="text-center w-full"
            key={`${text.toLocaleLowerCase()}--${i}`}
          >
            <MenuLink
              aria-disabled={asPath === path}
              className={`flex items-center justify-center ${
                asPath === path
                  ? 'bg-brand border border-brand font-semibold px-4 py-1 rounded-full uppercase'
                  : 'hover:font-semibold hover:text-accent-yellow'
              }`}
              onClick={onNavigate}
              to={path}
            >
              <span aria-disabled={asPath === path} className="text-2xl">
                {text}
              </span>
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
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="3"
          variants={toggleVariants[0]}
        />
        <motion.path
          className="stroke-current"
          d="M 2 9.423 L 20 9.423"
          strokeLinecap="round"
          strokeWidth="3"
          transition={{ duration: 0.1 }}
          variants={toggleVariants[1]}
        />
        <motion.path
          className="stroke-current"
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

export const AnimatedMobileNav: React.FC = () => {
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
        className="absolute bg-black bottom-0 left-0 shadow-lg top-0 z-20"
        variants={mobileNavVariants}
      />
      <AnimatedMenu onNavigate={onNavigate} />
      <AnimatedMenuToggle toggle={setIsOpen} />
    </motion.div>
  )
}
