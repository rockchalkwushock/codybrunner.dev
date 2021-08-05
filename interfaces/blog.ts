import { Maybe } from './helpers'

interface Author {
  id: string
  image: Maybe<string>
  name: string
}

export interface Tag {
  count: number
  name: string
  slug: string
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
  tags?: Array<Tag>
  title: string
  updatedAt: string
  url: string
  words: number
}
