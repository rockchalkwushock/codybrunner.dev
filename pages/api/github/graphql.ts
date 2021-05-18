import type { NextApiRequest, NextApiResponse } from 'next'

import { GitHub } from '@interfaces/github'
import { getGitHub } from '@lib/github'

const handler = async (_: NextApiRequest, res: NextApiResponse<GitHub>) => {
  try {
    const { contributions, pullRequests } = await getGitHub()
    return res.status(200).json({ contributions, pullRequests })
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
