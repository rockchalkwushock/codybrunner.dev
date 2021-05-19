import type { NextApiRequest, NextApiResponse } from 'next'

import { Maybe } from '@interfaces/helpers'
import { Strava } from '@interfaces/strava'
import { getStrava } from '@lib/strava'

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<Maybe<Strava>>
) => {
  try {
    const response = await getStrava()
    return res.status(200).json(response)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
