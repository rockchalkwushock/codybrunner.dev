import GhostCMS from '@tryghost/content-api'

// 1. Mark the Ghost website as private to prevent duplicate indexing
// and from people directly accessing my content.

// Instantiate the GhostCMS with my credentials.
const api = new GhostCMS({
  key: process.env.GHOST_API_KEY || '',
  url: process.env.GHOST_API_URL || '',
  version: 'v3',
})

// Fetches all posts.
export async function getGhostPosts() {
  try {
    const posts = await api.posts.browse({
      // They have problems with their typings here.
      // @ts-ignore
      options: {
        include: 'authors,tags',
        limit: 'all',
        order: 'published_at DESC',
      },
    })
    return posts
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getGhostPosts]: ${error}`)
  }
}

// Fetches a single post based on slug.
export async function getGhostPost(slug: string) {
  try {
    const post = await api.posts.read({
      slug,
    })
    return post
  } catch (error) {
    throw new Error(`Ghost-CMS Error [getGhostPost]: ${error}`)
  }
}
