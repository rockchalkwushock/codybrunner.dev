import { isBefore } from 'date-fns'

import { appRegex, paths } from './constants'
import { getFiles } from './helpers'
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
      nextPost:
        acc.length === 0 ? null : posts[acc.length - 1].frontMatter.slug,
      // If we are at the end of the list of posts there is no "previousPost": set to null.
      // In all other cases find the post that is the current index plus 1.
      previousPost:
        posts.length === acc.length + 1 ? null : posts[i + 1].frontMatter.slug,
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
    new Date(p1.frontMatter.updatedAt || p1.frontMatter.createdAt),
    new Date(p2.frontMatter.updatedAt || p2.frontMatter.createdAt)
  )
    ? -1
    : 1
}

/**
 * @name createArchivedPostMap
 * @param posts {Array<Post>}
 * @returns {Record<string, Array<Post>>}
 * @description Function for taking an array of posts and returning an object where the
 * keys represent the years of the posts and the value represent an array of posts corresponding
 * to that year.
 */
export function createArchivedPostMap(
  posts: Array<Post>
): Record<string, Array<Post>> {
  return posts.reduce((acc, post) => {
    // Get year post was written.
    const year = new Date(
      post.frontMatter.updatedAt || post.frontMatter.createdAt
    )
      .getFullYear()
      .toString()
    // Check to see if year is present in map.
    if (!acc[year]) {
      // If it is not add the year as a key to the map
      // and place the post as the first entry of the array.
      acc[year] = [post]
      return acc
    }
    // If the year was present push the current post onto the array
    // at that key.
    acc[year].push(post)
    return acc
  }, {} as Record<string, Array<Post>>)
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

  const archivedPosts = addsPaginationToPosts(
    sortPosts(
      filterPosts(posts, ({ frontMatter }) => frontMatter.archived),
      byDate
    )
  )

  const currentYearsPosts = addsPaginationToPosts(
    sortPosts(
      filterPosts(posts, ({ frontMatter }) => !frontMatter.archived),
      byDate
    )
  )

  // Don't let posts that are still marked as drafts to be visible.
  if (process.env.NODE_ENV === 'production') {
    return filterPosts(
      [...currentYearsPosts, ...archivedPosts],
      p => p.frontMatter.published
    )
  }

  return [...currentYearsPosts, ...archivedPosts]
}

export function getRelatedPosts(
  currentPost: Post,
  posts: Array<Post>,
  quantity = 2
): Array<Post> {
  // Take the current post's tags and create a map where the keys map to
  // an empty array for later storing posts that possess that key as a tag.
  const tagMap = currentPost.frontMatter.tags.reduce((cache, tag) => {
    cache[tag.toLowerCase()] = []
    return cache
  }, {} as Record<string, Array<Post>>)

  // Loop over all the posts...
  for (const post of posts) {
    // Loop over all the tags of the given post...
    for (const tag of post.frontMatter.tags) {
      // Check to see if the current tag exists in the tagMap.
      // We don't want the current post to end up in the list of related posts
      // so check the slugs are not equal to the current post.
      if (
        tagMap[tag.toLowerCase()] &&
        post.frontMatter.slug !== currentPost.frontMatter.slug
      ) {
        tagMap[tag.toLowerCase()].push(post)
      }
    }
  }
  const relatedPosts = Object.keys(tagMap).reduce((cache, key) => {
    // If tagMap only has one key return all the associated posts.
    if (Object.keys(tagMap).length === 1) {
      cache = tagMap[key]
      return cache
    }
    // If there are more than one key in tagMap take the first 2 posts from each key.
    if (Object.keys(tagMap).length > 1) {
      cache = tagMap[key].slice(0, quantity)
    }

    return cache
  }, [] as Array<Post>)

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
  return [
    ...new Set(
      posts.reduce((tags, post) => {
        return [...tags, ...post.frontMatter.tags]
      }, [] as Array<string>)
    ),
  ]
}

/**
 * @name parsePost
 * @param slug {string}
 * @returns {Promise<Post>}
 * @description Takes a file path, reads the file and parses content.
 */
export async function parsePost(filePath: string): Promise<Post> {
  try {
    const source = await getMDXBySlug('blog', filePath)
    const post = await prepareMDX(source)
    return {
      ...post,
      nextPost: null,
      previousPost: null,
    }
  } catch (error) {
    throw new Error(error)
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
