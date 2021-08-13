import { Maybe } from './helpers'

export interface Post {
  author: string
  canonicalUrl: string
  createdAt: string
  description: string
  featured?: boolean
  nextPost?: Maybe<string>
  previousPost?: Maybe<string>
  publishedAt?: Maybe<string>
  readingTime: string
  slug: string
  source: string
  tags?: Array<string>
  title: string
  updatedAt?: Maybe<string>
  words: number
}
