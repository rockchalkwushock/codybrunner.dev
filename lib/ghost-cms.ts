import GhostCMS from '@tryghost/content-api'
import readingTime from 'reading-time'
import rehype from 'rehype'
import link from 'rehype-autolink-headings'
import prism from '@mapbox/rehype-prism'
import slug from 'rehype-slug'

import { GetPostsResponse, Post } from '@interfaces/blog'
import { formatDateTime, toISO8601 } from '@utils/dateTime'

export const formatSlug = (slug: string, publishedAt: string) => {
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
const processGhostCMSPost = async (content: string) => {
  const file = await rehype()
    .data('settings', { fragment: true })
    .use(slug)
    .use(link)
    // @ts-ignore
    .use(prism)
    .process(content)
  return file.contents
}

/**
 * SERVER-SIDE QUERIES
 */

// Instantiate the GhostCMS with my credentials.
const api = new GhostCMS({
  key: process.env.GHOST_API_KEY || '',
  url: process.env.GHOST_API_URL || '',
  version: 'v3',
})

// Fetch page
export async function getPage(slug: string) {
  try {
    const res = await api.pages.read({ slug }, { include: ['authors'] })
    const source = await processGhostCMSPost(res.html!)
    const { text, words } = readingTime(source as string)
    return {
      author: {
        id: res.primary_author?.id!,
        image: res.primary_author?.profile_image!,
        name: res.primary_author?.name!,
      },
      createdAt: toISO8601(res.created_at!),
      excerpt: res.excerpt!,
      featured: res.featured,
      id: res.id,
      image: res.feature_image,
      publishedAt: toISO8601(res.published_at!),
      readingTime: text, // 10 min read
      slug: res.slug,
      source: source as string,
      title: res.title!,
      updatedAt: toISO8601(res.updated_at!),
      url: res.url!,
      words,
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Fetches all posts.
export async function getPosts(): Promise<GetPostsResponse> {
  try {
    const res = await api.posts.browse({
      include: ['authors', 'tags'],
      limit: 'all',
      order: 'published_at DESC',
    })
    const posts = res.reduce((acc, post) => {
      const { text, words } = readingTime(post.html!)
      acc.push({
        author: {
          id: post.primary_author?.id!,
          image: post.primary_author?.profile_image!,
          name: post.primary_author?.name!,
        },
        createdAt: toISO8601(post.created_at!),
        excerpt: post.excerpt!,
        featured: post.featured,
        id: post.id,
        image: post.feature_image,
        publishedAt: toISO8601(post.published_at!),
        readingTime: text, // 10 min read
        slug: formatSlug(post.slug, post.published_at!),
        source: post.html!,
        tags: post.tags!.map(t => ({
          name: t.name!,
        })),
        title: post.title!,
        updatedAt: toISO8601(post.updated_at!),
        url: post.url!,
        words,
      })
      return acc
    }, [] as Array<Post>)

    return { pagination: res.meta.pagination, posts }
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getPosts]: ${error}`)
  }
}

// Fetches a single post based on slug.
export async function getPostBySlug(slug: Array<string>): Promise<Post> {
  // Slugs on client are formatted as:
  // 1. /year/series-name/post-slug
  // 2. /year/post-slug
  // Ghost-CMS will not recognize this format so I must format the slug back to
  // its original format:
  // 1. series-name-post-slug
  // 2. post-slug
  const reformattedSlug = slug.length === 3 ? `${slug[1]}-${slug[2]}` : slug[1]

  try {
    const post = await api.posts.read(
      { slug: reformattedSlug },
      { include: ['authors', 'tags'] }
    )
    const source = await processGhostCMSPost(post.html!)
    const { text, words } = readingTime(source as string)
    return {
      author: {
        id: post.primary_author?.id!,
        image: post.primary_author?.profile_image!,
        name: post.primary_author?.name!,
      },
      createdAt: toISO8601(post.created_at!),
      excerpt: post.excerpt!,
      featured: post.featured,
      id: post.id,
      image: post.feature_image,
      publishedAt: toISO8601(post.published_at!),
      readingTime: text, // 10 min read
      slug: formatSlug(post.slug, post.published_at!),
      source: source as string,
      tags: post.tags!.map(t => ({
        count: { posts: t.count ? t.count.posts : 0 },
        name: t.name!,
        url: t.url!,
      })),
      title: post.title!,
      updatedAt: toISO8601(post.updated_at!),
      url: post.url!,
      words,
    }
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getPostBySlug]: ${error}`)
  }
}

export async function getRelatedPosts(
  slug: Array<string>,
  tags: Array<string>
) {
  // Slugs on client are formatted as:
  // 1. /year/series-name/post-slug
  // 2. /year/post-slug
  // Ghost-CMS will not recognize this format so I must format the slug back to
  // its original format:
  // 1. series-name-post-slug
  // 2. post-slug
  const reformattedSlug = slug.length === 3 ? `${slug[1]}-${slug[2]}` : slug[1]

  try {
    const res = await api.posts.browse({
      // Find posts with the following tags, but not the current post
      filter: `tags:[${tags.join(', ')}] + slug:-${reformattedSlug}`,
      include: ['authors', 'tags'],
      // Only return 3 posts.
      limit: '3',
      order: 'published_at DESC',
    })

    const posts = res.reduce((acc, post) => {
      const { text, words } = readingTime(post.html!)
      acc.push({
        author: {
          id: post.primary_author?.id!,
          image: post.primary_author?.profile_image!,
          name: post.primary_author?.name!,
        },
        createdAt: toISO8601(post.created_at!),
        excerpt: post.excerpt!,
        featured: post.featured,
        id: post.id,
        image: post.feature_image,
        publishedAt: toISO8601(post.published_at!),
        readingTime: text, // 10 min read
        slug: formatSlug(post.slug, post.published_at!),
        source: post.html!,
        tags: post.tags!.map(t => ({
          name: t.name!,
        })),
        title: post.title!,
        updatedAt: toISO8601(post.updated_at!),
        url: post.url!,
        words,
      })
      return acc
    }, [] as Array<Post>)

    return posts
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getRelatedPosts]: ${error}`)
  }
}
