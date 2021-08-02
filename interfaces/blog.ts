import { Pagination } from '@tryghost/content-api'
import { Maybe } from './helpers'

interface Author {
  id: string
  image: Maybe<string>
  name: string
}

interface Tag {
  name: string
}

export interface Post {
  author: Author
  createdAt: string
  excerpt: string
  featured?: boolean
  id: string
  image?: Maybe<string>
  publishedAt: string
  readingTime: string
  slug: string
  source: string
  tags: Array<Tag>
  title: string
  updatedAt: string
  url: string
  words: number
}

export interface GetPostsResponse {
  pagination: Pagination
  posts: Array<Post>
}
