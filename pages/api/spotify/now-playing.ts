import type { NextApiRequest, NextApiResponse } from 'next'

import { CurrentEpisode, CurrentTrack, RecentTrack } from '@interfaces/spotify'
import { getNowPlaying } from '@lib/spotify'

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<CurrentEpisode | CurrentTrack | RecentTrack>
) => {
  try {
    const response = await getNowPlaying()
    return res.status(200).json(response)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
