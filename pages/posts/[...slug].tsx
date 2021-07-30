import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import NextHead from 'next/head'
import { PostOrPage } from '@tryghost/content-api'
import readingTime from 'reading-time'
import { isEqual } from 'date-fns'

import { AnimatedPage } from '@components/AnimatedPage'
import { Avatar } from '@components/Avatar'
import { getGhostPost, getGhostPosts } from '@lib/ghost-cms'
import { constants } from '@utils/constants'
import { formatDateTime } from '@utils/dateTime'
import { getLanguageStrings } from '@utils/helpers'

interface Props
  extends Pick<
    PostOrPage,
    | 'canonical_url'
    | 'excerpt'
    | 'feature_image'
    | 'html'
    | 'id'
    | 'meta_description'
    | 'meta_title'
    | 'og_description'
    | 'og_image'
    | 'og_title'
    | 'published_at'
    | 'reading_time'
    | 'slug'
    | 'title'
    | 'twitter_description'
    | 'twitter_image'
    | 'twitter_title'
    | 'updated_at'
    | 'url'
  > {}

const Article: React.FC<Props> = props => {
  const [languages, setLanguages] = React.useState<Array<string>>([])
  // Process the reading time of the post.
  const { text: timeToRead } = readingTime(props.reading_time!.toString())

  React.useEffect(() => {
    setLanguages(getLanguageStrings(props.html!))
  }, [props.html])

  return (
    <AnimatedPage>
      <NextHead>
        <script
          async
          crossOrigin="anonymous"
          integrity="sha512-axJX7DJduStuBB8ePC8ryGzacZPr3rdLaIDZitiEgWWk2gsXxEFlm4UW0iNzj2h3wp5mOylgHAzBzM4nRSvTZA=="
          referrerPolicy="no-referrer"
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"
        />
        {/* Dynamically load the found "language-*" based on the current post. */}
        {languages.length > 0 &&
          languages.map(lang => (
            <script
              async
              crossOrigin="anonymous"
              key={lang}
              referrerPolicy="no-referrer"
              src={`https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-${lang}.min.js`}
              type="text/javascript"
            />
          ))}
      </NextHead>
      <header className="flex flex-col space-y-4 w-full">
        <h1 className="font-custom-header leading-tight text-brand text-5xl text-center md:text-left">
          {props.title}
        </h1>
        <div className="flex flex-col items-center w-full md:flex-row md:justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 mr-2 w-9 lg:hidden" />

            <div className="flex flex-col">
              <p>
                {`${constants.author} / ${formatDateTime(
                  props.published_at!,
                  'full-date-localized'
                )}`}
              </p>
              {/* Check if the dates are the same and if they are don't render.
              Do this because Ghost CMS populates updated_at at create time. */}
              {isEqual(
                new Date(props.published_at!),
                new Date(props.updated_at!)
              ) && (
                <span>
                  Updated:{' '}
                  {formatDateTime(props.updated_at!, 'full-date-localized')}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="lg:pr-4">{timeToRead}</p>
          </div>
        </div>
      </header>
      <hr className="divider" />
      <article
        className="max-w-none prose prose-xl tracking-wide"
        dangerouslySetInnerHTML={{ __html: props.html! }}
      />
      <hr className="divider" />
    </AnimatedPage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getGhostPosts()

  return {
    fallback: false,
    paths: posts.map(({ slug }) => `/posts/${slug}`),
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: Array<string> }> =
  async ctx => {
    try {
      const post = await getGhostPost(ctx.params!.slug.join('/'))
      return {
        props: post,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

export default Article
