import type { NextApiRequest, NextApiResponse } from 'next'

import { Maybe } from '@interfaces/helpers'
import { getPostViews, putPostViews } from '@lib/supabaseAdmin'
import { appRegex } from '@utils/constants'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Maybe<number>>
) => {
  // If we are in production and the referer is not the app itself
  // then reject the query and tell the browser this was a bad request.
  if (
    process.env.NODE_ENV === 'production' &&
    !appRegex.url.test(req.headers.referer!)
  ) {
    return res.status(400).json(null)
  }

  // req.query.slug = ['archive', '[year]', '[post-slug]']
  // slug = 'archive/2018/abc'
  const slug = (req.query.slug as Array<string>).join(',').replace(',', '/')

  // Get the user's IP Address
  // The following are only present in production.
  const address =
    req.headers['x-real-ip'] ||
    req.headers['x-vercel-forwarded-for'] ||
    req.headers['x-forwarded-for']

  try {
    if (req.method === 'POST') {
      await putPostViews(address as string, slug)
      return res.status(200)
    }

    if (req.method === 'GET') {
      const views = await getPostViews(slug)
      console.log({ views })
      return res.status(200).json(views!)
    }

    return res.status(400)
  } catch (error) {
    throw new Error(error)
  }
}

export default handler
