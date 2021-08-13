import * as React from 'react'
import { motion, Variants } from 'framer-motion'

const variants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  initial: {
    opacity: 0,
  },
}

const content: Variants = {
  animate: {
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
  initial: {},
}

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {}

export const AnimatedPage: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.section
      animate="animate"
      className={`grid-in-section px-6 md:pt-4 md:px-8 lg:px-0 ${className}`}
      exit="exit"
      initial="initial"
      variants={variants}
    >
      <motion.div
        animate="animate"
        className="flex flex-col flex-grow w-full"
        initial="initial"
        variants={content}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
