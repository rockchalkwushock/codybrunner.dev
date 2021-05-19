import { QueryFunctionContext } from 'react-query'

import { GitHub, GitHubResponse } from '@interfaces/github'

const body = {
  query:
    '{\n  viewer {\n    pullRequests(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {\n      nodes {\n        closedAt\n        createdAt\n        id\n        lastEditedAt\n        mergedAt\n        number\n        permalink\n        repository {\n          nameWithOwner\n        }\n        state\n        title\n      }\n    }\n  }\n}\n',
  variables: {},
}

/**
 * CLIENT-SIDE QUERIES
 */

export async function fetchGitHub(
  _context: QueryFunctionContext
): Promise<GitHub> {
  try {
    const response = await fetch('/api/github/graphql')
    return (await response.json()) as GitHub
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * SERVER-SIDE QUERIES
 */

export async function getGitHub(): Promise<GitHub> {
  try {
    // Fetch data from GitHub.
    const res = await fetch('https://api.github.com/graphql', {
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    // If the request fails...
    if (res.status > 400) {
      // Reject with the appropriate data envelope.
      return Promise.reject({
        pullRequests: [],
      })
    }

    // Parse the data.
    const r = (await res.json()) as GitHubResponse

    // Resolve with the parsed GitHub data.
    return Promise.resolve<GitHub>({
      pullRequests: r.data.viewer.pullRequests.nodes,
    })
  } catch (error) {
    throw new Error(error)
  }
}
