import * as React from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { motion, Variants } from 'framer-motion'

import { constants } from '@utils/constants'

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
  author?: string
  createdAt?: string
  description: string
  image?: string
  publishedAt?: string
  tags?: Array<string>
  title: string
  type: 'article' | 'website'
  updatedAt?: string
  wordCount?: number
}
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  pageMetaData?: PageMetaData
}

export const AnimatedPage: React.FC<Props> = ({
  children,
  className,
  pageMetaData,
}) => {
  const { asPath } = useRouter()

  const meta = {
    author: pageMetaData?.author,
    description: pageMetaData?.description || '',
    image: pageMetaData?.image,
    publishedAt: pageMetaData?.publishedAt,
    tags: pageMetaData?.tags,
    title: pageMetaData?.title || '',
    twitter: constants.twitter,
    type: pageMetaData?.type,
    url: `${constants.url}${asPath}`,
    updatedAt: pageMetaData?.updatedAt,
    wordCount: pageMetaData?.wordCount,
  }

  return (
    <>
      <NextHead>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={meta.author} name="author" />
        <meta content={meta.description} name="description" />
        <link rel="canonical" href={`${meta.url}${asPath}`} />
        {/* Open Graph: http://ogp.me/ */}
        <meta content={meta.description} property="og:description" />
        {meta.image && <meta content={meta.image} property="og:image" />}
        <meta content="en-US" name="og:locale" />
        <meta content="Cody Brunner" property="og:site_name" />
        <meta content={meta.title} property="og:title" />
        <meta content={meta.type} property="og:type" />
        <meta content={`${meta.url}${asPath}`} property="og:url" />
        {/* Twitter */}
        <meta content="summary_large_image" property="twitter:card" />
        <meta content={meta.twitter} name="twitter:creator" />
        <meta content={meta.twitter} property="twitter:site" />
        {/* Article */}
        {meta.type === 'article' && (
          <>
            <meta content={meta.author} name="article:author" />
            {meta.publishedAt && (
              <meta content={meta.publishedAt} name="article:published_time" />
            )}
            {meta.tags &&
              meta.tags.map(tag => (
                <meta content={tag} key={tag} name="article:tag" />
              ))}
            {meta.updatedAt && (
              <meta content={meta.updatedAt} name="article:modified_time" />
            )}
            {meta.wordCount && (
              <meta content={meta.wordCount.toString()} name="word_count" />
            )}
          </>
        )}
        {/* Robots */}
        <meta content="index,follow" name="robots" />
        <meta content="index,follow" name="googlebot" />
      </NextHead>
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
    </>
  )
}
