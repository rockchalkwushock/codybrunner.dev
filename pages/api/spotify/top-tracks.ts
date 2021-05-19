import type { NextApiRequest, NextApiResponse } from 'next'

import { TopTrack } from '@interfaces/spotify'
import { getTopTracks } from '@lib/spotify'

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<Array<TopTrack>>
) => {
  try {
    const tracks = await getTopTracks()
    return res.status(200).json(tracks)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
