import * as React from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { motion, Variants } from 'framer-motion'

import { useAmplitude } from '@hooks/useAmplitude'
import { constants } from '@utils/constants'
import { toISO8601 } from '@utils/dateTime'

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

export interface PageMetaData {
  createdAt?: string
  description: string
  image?: string
  keywords?: Array<string>
  tags?: Array<string>
  title: string
  type: 'article' | 'website'
  updatedAt?: string
}
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  pageMetaData: PageMetaData
}

export const AnimatedPage: React.FC<Props> = ({
  children,
  className,
  pageMetaData,
}) => {
  const { asPath } = useRouter()

  useAmplitude()

  const pageKeywords = pageMetaData.keywords
    ? // Use new Set(args) to dedupe the keywords.
      [...new Set([...constants.keywords, ...pageMetaData.keywords])]
    : constants.keywords

  return (
    <>
      <NextHead>
        <title>{pageMetaData.title}</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={constants.author} name="author" />
        <meta content={pageMetaData.description} name="description" />
        <meta content={pageKeywords.join(', ').trim()} name="keywords" />
        <link rel="canonical" href={`${constants.url}${asPath}`} />
        {/* Open Graph: http://ogp.me/ */}
        <meta content={pageMetaData.description} property="og:description" />
        {pageMetaData.image && (
          <meta content={pageMetaData.image} property="og:image" />
        )}
        <meta content="en-US" name="og:locale" />
        <meta content="Cody Brunner" property="og:site_name" />
        <meta content={pageMetaData.title} property="og:title" />
        <meta content={pageMetaData.type} property="og:type" />
        <meta content={`${constants.url}${asPath}`} property="og:url" />
        {/* Twitter */}
        <meta content="summary_large_image" property="twitter:card" />
        <meta content={constants.twitter} name="twitter:creator" />
        <meta content={constants.twitter} property="twitter:site" />
        {/* Article */}
        {pageMetaData.type === 'article' && (
          <>
            <meta content={constants.author} name="article:author" />
            {pageMetaData.createdAt && (
              <meta
                content={toISO8601(pageMetaData.createdAt)}
                name="article:published_time"
              />
            )}
            {pageMetaData.tags &&
              pageMetaData.tags.map(tag => (
                <meta content={tag} key={tag} name="article:tag" />
              ))}
            {pageMetaData.updatedAt && (
              <meta
                content={toISO8601(pageMetaData.updatedAt)}
                name="article:modified_time"
              />
            )}
          </>
        )}
        {/* Robots */}
        <meta content="index,follow" name="robots" />
        <meta content="index,follow" name="googlebot" />
      </NextHead>
      <motion.section
        animate="animate"
        className={`grid-in-section px-4 md:py-4 ${className}`}
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
    </>
  )
}
