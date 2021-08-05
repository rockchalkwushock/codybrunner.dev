import { PostOrPage } from '@tryghost/content-api'
import readingTime from 'reading-time'
import rehype from 'rehype'
import link from 'rehype-autolink-headings'
import prism from '@mapbox/rehype-prism'
import slug from 'rehype-slug'

import { formatDateTime, toISO8601 } from './dateTime'
import { Post } from '@interfaces/blog'

export const isServer = typeof window === 'undefined'

const formatSlug = (slug: string, publishedAt: string) => {
  // Start with the year the post was published.
  // i.e. 2018
  let parsedSlug: string = formatDateTime(publishedAt, 'full-year')
  // Write the series names as regex for quick matching against full slug.
  const existingSeries = [/ice-bear/]

  // Loop over the series and check if the slug matches any series.
  for (const regex of existingSeries) {
    if (regex.test(slug)) {
      // If it does append the following to the published year:
      // /series-name/slug-minus-series-name
      // parsedSlug = 2018/my-series/post-in-series
      parsedSlug += `${regex}${slug.replace(regex, '').replace('-', '')}`
    } else {
      // If not append the following:
      // /post-slug
      // parsedSlug = 2018/slug
      parsedSlug += '/' + slug
    }
  }
  return parsedSlug
}

// TODO:
// 1. I want line-numbers via PrismJS
// 2. I want the copy feature via PrismJS
// 3. I want to add target="_blank", rel="nofollow noopener noreferrer" to all external links.
export const processGhostPageOrPost = async (
  data: PostOrPage
): Promise<Post> => {
  return await rehype()
    .data('settings', { fragment: true })
    .use(slug)
    .use(link)
    // @ts-ignore
    .use(prism)
    .process(data.html!)
    .then(file => {
      const { text, words } = readingTime(file.contents as unknown as string)

      return {
        author: {
          id: data.primary_author?.id!,
          image: data.primary_author?.profile_image!,
          name: data.primary_author?.name!,
        },
        createdAt: toISO8601(data.created_at!),
        excerpt: data.excerpt!,
        featured: data.featured,
        id: data.id,
        image: data.feature_image,
        publishedAt: toISO8601(data.published_at!),
        readingTime: text, // 10 min read
        slug: formatSlug(data.slug, data.published_at!), // "/blog/[year]/[slug]" || "/blog/[year]/[series]/[slug]"
        source: file.contents as string,
        tags: data.tags
          ? data.tags.map(tag => ({
              count: tag.count?.posts || 0,
              name: tag.name!,
              slug: tag.slug,
            }))
          : [],
        title: data.title!,
        updatedAt: toISO8601(data.updated_at!),
        url: data.url!,
        words,
      }
    })
}
