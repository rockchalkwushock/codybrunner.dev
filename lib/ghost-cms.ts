import GhostCMS from '@tryghost/content-api'
import readingTime from 'reading-time'
import rehype from 'rehype'
import link from 'rehype-autolink-headings'
import prism from '@mapbox/rehype-prism'
import slug from 'rehype-slug'

import { GetPostsResponse, Post } from '@interfaces/blog'
import { formatDateTime } from '@utils/dateTime'

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
    return {
      author: {
        id: res.primary_author?.id!,
        image: res.primary_author?.profile_image!,
        name: res.primary_author?.name!,
      },
      createdAt: formatDateTime(res.created_at!, 'full-date-localized'),
      excerpt: res.excerpt!,
      featured: res.featured,
      id: res.id,
      image: res.feature_image,
      publishedAt: formatDateTime(res.published_at!, 'full-date-localized'),
      readingTime: readingTime(res.reading_time!.toString()).text,
      slug: res.slug,
      source: source as string,
      title: res.title!,
      updatedAt: formatDateTime(res.updated_at!, 'full-date-localized'),
      url: res.url!,
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
      acc.push({
        author: {
          id: post.primary_author?.id!,
          image: post.primary_author?.profile_image!,
          name: post.primary_author?.name!,
        },
        createdAt: formatDateTime(post.created_at!, 'full-date-localized'),
        excerpt: post.excerpt!,
        featured: post.featured,
        id: post.id,
        image: post.feature_image,
        publishedAt: formatDateTime(post.published_at!, 'full-date-localized'),
        readingTime: readingTime(post.reading_time!.toString()).text,
        slug: post.slug,
        source: post.html!,
        tags: post.tags!.map(t => ({
          count: { posts: t.count ? t.count.posts : 0 },
          name: t.name!,
          url: t.url!,
        })),
        title: post.title!,
        updatedAt: formatDateTime(post.updated_at!, 'full-date-localized'),
        url: post.url!,
      })
      return acc
    }, [] as Array<Post>)

    return { pagination: res.meta.pagination, posts }
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getPosts]: ${error}`)
  }
}

// Fetches a single post based on slug.
export async function getPostBySlug(slug: string): Promise<Post> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: ['authors', 'tags'] }
    )
    const source = await processGhostCMSPost(post.html!)
    return {
      author: {
        id: post.primary_author?.id!,
        image: post.primary_author?.profile_image!,
        name: post.primary_author?.name!,
      },
      createdAt: formatDateTime(post.created_at!, 'full-date-localized'),
      excerpt: post.excerpt!,
      featured: post.featured,
      id: post.id,
      image: post.feature_image,
      publishedAt: formatDateTime(post.published_at!, 'full-date-localized'),
      readingTime: readingTime(post.reading_time!.toString()).text,
      slug: post.slug,
      source: source as string,
      tags: post.tags!.map(t => ({
        count: { posts: t.count ? t.count.posts : 0 },
        name: t.name!,
        url: t.url!,
      })),
      title: post.title!,
      updatedAt: formatDateTime(post.updated_at!, 'full-date-localized'),
      url: post.url!,
    }
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getPostBySlug]: ${error}`)
  }
}
