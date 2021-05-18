import { Maybe } from './helpers'

interface Repository {
  homePageUrl: string
  id: string
  isArchived: boolean
  isFork: boolean
  isLocked: boolean
  isPrivate: boolean
  nameWithOwner: string
  parent: Maybe<Pick<Repository, 'nameWithOwner'>>
  url: string
}

interface PullRequest {
  closedAt: string
  createdAt: string
  id: string
  lastEditedAt: Maybe<string>
  mergedAt: Maybe<string>
  number: number
  permalink: string
  repository: Pick<Repository, 'nameWithOwner'>
  state: 'CLOSED' | 'MERGED' | 'OPEN'
  title: string
}

export interface GitHubResponse {
  data: {
    viewer: {
      pullRequests: {
        nodes: Array<PullRequest>
      }
    }
  }
}

export interface GitHub {
  pullRequests: Array<PullRequest | never>
}
