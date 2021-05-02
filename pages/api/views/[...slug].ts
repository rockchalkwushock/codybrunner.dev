import type { NextApiRequest, NextApiResponse } from 'next'

// import { CurrentEpisode, CurrentTrack, RecentTrack } from '@interfaces/spotify'
import { supabaseAdmin } from '@lib/supabaseAdmin'
import { appRegex } from '@utils/constants'

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  console.log(req.headers)
  // req.query.slug = ['archive', '[year]', '[post-slug]']
  // querySlug = 'archive/2018/abc'
  const querySlug = (req.query.slug as Array<string>)
    .join(',')
    .replace(',', '/')

  // If we are in production and the referer is not the app itself
  // then reject the query and tell the browser this was a bad request.
  if (
    process.env.NODE_ENV === 'production' &&
    !appRegex.url.test(req.headers.referer!)
  ) {
    return res.status(400).json(null)
  }

  if (req.method === 'POST') {
    console.log('====================================')
    console.log('POST')
    console.log('====================================')
    const supabaseResponse = await supabaseAdmin.rpc('increment_post_view', {
      post_slug: querySlug,
    })
    console.log({ supabaseResponse })
    return res.status(200).json({
      message: `Successfully incremented post: ${querySlug}`,
    })
  }

  if (req.method === 'GET') {
    console.log('====================================')
    console.log('GET')
    console.log('====================================')
    const supabaseResponse = await supabaseAdmin
      .from('posts')
      .select('post_views')
      .filter('slug', 'eq', req.query.slug)

    console.log({ supabaseResponse })

    if (supabaseResponse.data) {
      return res.status(200).json({
        views: supabaseResponse.data[0]?.view_count || null,
      })
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  })
  // try {
  //   const response = await getPostViews()
  //   return res.status(200).json(response)
  // } catch (error) {
  //   throw new Error(error)
  // }
}

export default handler
