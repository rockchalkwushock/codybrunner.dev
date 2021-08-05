import GhostCMS, { Params } from '@tryghost/content-api'

import { Post, Tag } from '@interfaces/blog'
import { processGhostPageOrPost } from '@utils/helpers'

/**
 * SERVER-SIDE QUERIES
 */

// Instantiate the GhostCMS with my credentials.
const api = new GhostCMS({
  key: process.env.GHOST_API_KEY || '',
  url: process.env.GHOST_API_URL || '',
  version: 'v3',
})

type ReadArgs = {
  params?: Params
  slug?: Array<string>
  isPage?: boolean
}
type ReadGhostPageOrPostFn = (args: ReadArgs) => Promise<Post>

export const readGhostPageOrPost: ReadGhostPageOrPostFn = async ({
  params,
  slug,
  isPage,
}) => {
  if (typeof slug === 'undefined') {
    throw new Error('"slug" is a required parameter!')
  }
  // Slugs on client are formatted as:
  // 1. /year/series-name/post-slug
  // 2. /year/post-slug
  // Ghost-CMS will not recognize this format so I must format the slug back to
  // its original format:
  // 1. series-name-post-slug
  // 2. post-slug
  const reformattedSlug = slug.length === 3 ? `${slug[1]}-${slug[2]}` : slug[1]

  try {
    let res
    if (isPage) {
      // In the event of a page we receive ['page-name'] so there is no
      // reason to format the slug to what Ghost CMS expects, it already is good.
      res = await api.pages.read({ slug: slug[0] }, { ...params })
    } else {
      res = await api.posts.read({ slug: reformattedSlug }, { ...params })
    }
    return await processGhostPageOrPost(res)
  } catch (error) {
    throw new Error(`Ghost-CMS Error [readGhostPageOrPost]: ${error}`)
  }
}

type BrowseGhostPostsFn = (params?: Params) => Promise<Array<Post>>

export const browseGhostPosts: BrowseGhostPostsFn = async params => {
  try {
    const res = await api.posts.browse(params)
    let posts = []
    for (const r of res) {
      const post = await processGhostPageOrPost(r)
      posts.push(post)
    }
    return posts
  } catch (error) {
    throw new Error(`Ghost-CMS Error [browseGhostPagesOrPosts]: ${error}`)
  }
}

type BrowseGhostTagsFn = (params?: Params) => Promise<Array<Tag>>

export const browseGhostTags: BrowseGhostTagsFn = async params => {
  try {
    const res = await api.tags.browse(params)
    const tags = res.map(({ count, name, slug }) => ({
      count: count?.posts || 0,
      name: name!,
      slug,
    }))
    return tags
  } catch (error) {
    throw new Error(`Ghost-CMS Error [browseGhostTags]: ${error}`)
  }
}
