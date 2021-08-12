import { Maybe } from './helpers'

interface FrontMatter {
  createdAt: string
  description: string
  keywords: Array<string>
  published: boolean
  readingTime: string
  slug: string
  tags: Array<string>
  title: string
  updatedAt?: string
  wordCount: number
}

export interface Post {
  frontMatter: FrontMatter
  nextPost?: Maybe<string>
  previousPost?: Maybe<string>
  source: string
}
