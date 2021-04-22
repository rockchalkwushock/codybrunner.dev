import { Maybe } from './helpers'

interface FrontMatter {
  archived: boolean
  createdAt: string
  description: string
  keywords: Array<string>
  published: boolean
  readingTime: string
  slug: string
  tags: Array<string>
  title: string
  updatedAt?: string
  versions?: Record<string, string>
  wordCount: number
}

export interface Post {
  frontMatter: FrontMatter
  nextPost?: Maybe<string>
  previousPost?: Maybe<string>
  source: string
}
