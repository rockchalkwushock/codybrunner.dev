/**
 * DO NOT IMPORT ANYTHING FROM THIS FILE OUTSIDE THE SCOPE OF
 * THE /api. THE CODE EXPORTED HERE IS FOR NODE ENVIRONMENT ONLY!!!
 */

import { createClient } from '@supabase/supabase-js'
import { NIL as NIL_UUID, v5 as uuidv5 } from 'uuid'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

/**
 * SERVER-SIDE QUERIES
 */

export async function getPostViews(slug: string): Promise<number | undefined> {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('view_count')
      .filter('slug', 'eq', slug)

    if (error) {
      return
    }

    if (data && data.length > 0) {
      return data[0].view_count as number
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function putPostViews(address: string, slug: string) {
  let hash = ''
  // Take the IP Address and turn it into a uuid.
  if (process.env.NODE_ENV === 'production') {
    hash = uuidv5(address, uuidv5.DNS)
  } else {
    hash = NIL_UUID
  }
  try {
    await supabaseAdmin.rpc('increment_post_views', {
      mdx_slug: slug,
      // Before sending the IP as a uuid only send a snippet of the uuid.
      // I do not want to store someone's IP address and the uuid is a nice
      // start but if the db were ever accessed by a malicious user they could
      // parse the uuid back to the IP Address. By cutting the uuid it will not
      // be possible to rebuild the address.
      viewer_hash: hash.slice(0, parseInt(process.env.HASH_CUT)),
    })
  } catch (error) {
    throw new Error(error)
  }
}
