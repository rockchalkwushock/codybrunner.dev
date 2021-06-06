import type { NextApiRequest, NextApiResponse } from 'next'

import { TopArtist } from '@interfaces/spotify'
import { getTopArtists } from '@lib/spotify'

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<Array<TopArtist>>
) => {
  try {
    const artists = await getTopArtists()
    return res.status(200).json(artists)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
