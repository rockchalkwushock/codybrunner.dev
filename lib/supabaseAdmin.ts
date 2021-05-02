// import {} from 'fs'
// import {} from 'path'
import { createClient } from '@supabase/supabase-js'

// import {} from '@interfaces/supabase'
// import {} from '@utils/'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

/**
 * SERVER-SIDE QUERIES
 */

// export async function getPostViews(): Promise<unknown> {
//   try {

//   } catch (error) {
//     throw new Error(error)
//   }
// }
