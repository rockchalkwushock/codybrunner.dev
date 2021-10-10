import { isBefore } from 'date-fns'

import { appRegex, paths } from './constants'
import { dedupeArray, getFiles } from './helpers'
import { Post } from '@interfaces/blog'
import { getMDXBySlug, prepareMDX } from '@lib/mdx'

/**
 * @name addsPaginationToPosts
 * @param posts {Array<Post>}
 * @returns {Array<Post>}
 * @description Adds pagination properties to post nodes.
 * @example
 * addsPaginationToPosts(posts) // [...{ nextPost: null, previousPost: '2021/last-post' }]
 */
export function addsPaginationToPosts(posts: Array<Post>): Array<Post> {
  return posts.reduce((acc, p, i) => {
    acc.push({
      ...p,
      // If we are at the beginning of the iteration there is no "nextPost": set to null.
      // In all other cases find the post that is 1 minus the current length of the accumulator.
      nextPost: acc.length === 0 ? null : posts[acc.length - 1].slug,
      // If we are at the end of the list of posts there is no "previousPost": set to null.
      // In all other cases find the post that is the current index plus 1.
      previousPost: posts.length === acc.length + 1 ? null : posts[i + 1].slug,
    })
    return acc
  }, [] as Array<Post>)
}

/**
 * @name byDate
 * @param p1 - {Post}
 * @param p2 - {Post}
 * @description Orders posts from oldest to newest.
 * @returns {number}
 */
export function byDate(p1: Post, p2: Post): number {
  return isBefore(
    new Date(p1.updatedAt || p1.publishedAt || p1.createdAt),
    new Date(p2.updatedAt || p2.publishedAt || p2.createdAt)
  )
    ? -1
    : 1
}

/**
 * @name filterPosts
 * @param posts {Array<Post>}
 * @param cb {(post:Post) => boolean}
 * @returns {Array<Post>}
 * @description Takes an array of posts & a callback to filter the array of posts.
 */
export function filterPosts(
  posts: Array<Post>,
  cb: (post: Post) => boolean
): Array<Post> {
  return posts.filter(cb)
}

export async function getAllPostsFrontMatter(): Promise<Array<Post>> {
  const files = getFiles(paths.blog, appRegex.blogSource).filter(ext =>
    appRegex.mdx.test(ext)
  )

  const posts = await parsePosts(files)

  if (process.env.NODE_ENV === 'production') {
    return addsPaginationToPosts(
      // Lastly sort the posts so they are in ascending order.
      sortPosts(
        // First filter out drafts
        // Obviously they are not ready to be published but I also must
        // prevent them from breaking the pagination.
        filterPosts(posts, ({ publishedAt }) => !!publishedAt),
        byDate
      )
    )
  } else {
    return addsPaginationToPosts(
      sortPosts(
        filterPosts(posts, ({ publishedAt }) => !!publishedAt),
        byDate
      )
    )
  }
}

/**
 * @name getPostsByTag
 * @param posts {Array<Post>}
 * @param tag {String}
 * @returns {Array<Post>}
 * @description Takes array of posts and a tag for returning an array
 * of posts that are related to the tag input.
 */
export function getPostsByTag(posts: Array<Post>, tag: string): Array<Post> {
  return posts.reduce((acc, post) => {
    if (post.tags && post.tags.includes(tag)) {
      acc.push(post)
    }
    return acc
  }, [] as Array<Post>)
}

/**
 * @name getRelatedPosts
 * @param currentPost {Post}
 * @param posts {Array<Post>}
 * @param quantity {number}
 * @returns {Array<Post>}
 * @description Fetches posts that are related to the current post via
 * the tags of the current post.
 */
export function getRelatedPosts(
  currentPost: Post,
  posts: Array<Post>,
  quantity = 2
): Array<Post> {
  if (!currentPost.tags) {
    return []
  }
  // Take the current post's tags and create a map where the keys map to
  // an empty array for later storing posts that possess that key as a tag.
  const tagMap = currentPost.tags.reduce((cache, tag) => {
    cache[tag] = []
    return cache
  }, {} as Record<string, Array<Post>>)

  // Loop over all the posts...
  for (const post of posts) {
    if (post.tags) {
      // Loop over all the tags of the given post...
      for (const tag of post.tags) {
        // Check to see if the current tag exists in the tagMap.
        // We don't want the current post to end up in the list of related posts
        // so check the slugs are not equal to the current post.
        if (!!tagMap[tag] && post.slug !== currentPost.slug) {
          tagMap[tag].push(post)
        }
      }
    }
  }

  // NOTE: Why does dedupeArray work here?
  // As we loop the tagMap and add the posts associated to the current tag
  // to the cache we are assembling an array of objects. Those objects have
  // a memory reference. Should we push the same object to the array then
  // we have two of the same memory references present.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  const relatedPosts = dedupeArray(
    Object.keys(tagMap).reduce((cache, key) => {
      // If tagMap only has one key return all the associated posts.
      if (Object.keys(tagMap).length === 1) {
        return [...cache, ...tagMap[key]]
      }
      // If there are more than one key in tagMap take the first 2 posts from each key.
      if (Object.keys(tagMap).length > 1) {
        cache = [...cache, ...tagMap[key].slice(0, quantity)]
      }

      return cache
    }, [] as Array<Post>)
  )

  // Return an array of related posts based on our tagMap that is sorted
  // from most recent.
  return sortPosts(
    relatedPosts.length > 5 ? relatedPosts.slice(0, 5) : relatedPosts,
    byDate
  ).reverse()
}

/**
 * @name getTags
 * @param posts
 * @returns {Array<string>}
 * @description Helper for getting all tags from all posts
 * and returning a deduped array of those tags.
 */
export function getTags(posts: Array<Post>): Array<string> {
  return dedupeArray(
    posts.reduce((tags, post) => {
      if (post.tags) {
        return [...tags, ...post.tags]
      }
      return []
    }, [] as Array<string>)
  )
}

/**
 * @name parsePost
 * @param slug {string}
 * @returns {Promise<Post>}
 * @description Takes a file path, reads the file and parses content.
 */
export async function parsePost(filePath: string): Promise<Post> {
  const source = await getMDXBySlug('blog', filePath)
  const post = await prepareMDX(source)
  return {
    ...post,
    nextPost: null,
    previousPost: null,
  }
}

/**
 * @name parsePosts
 * @param files {Array<string>}
 * @returns {Promise<Array<Post>>}
 * @description Takes list of file names & parses files content returning
 * an array of parsed posts.
 */
export async function parsePosts(files: Array<string>): Promise<Array<Post>> {
  return await Promise.all(
    files.map(async slug => await parsePost(slug.replace(appRegex.mdx, '')))
  )
}

/**
 * @name sortPosts
 * @param posts {Array<Post>}
 * @param cb {(p1: Post, p2: Post) => number}
 * @returns {Array<Post>}
 * @description Takes array of posts and a callback for sorting the posts
 * return a copy of the initial array of posts sorted.
 */
export function sortPosts(
  posts: Array<Post>,
  cb: (p1: Post, p2: Post) => number
): Array<Post> {
  const copyOfPosts = posts
  return copyOfPosts.sort(cb)
}
