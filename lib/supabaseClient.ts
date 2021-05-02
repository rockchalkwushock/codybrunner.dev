import { QueryFunctionContext } from 'react-query'

/**
 * CLIENT-SIDE QUERIES AND MUTATIONS
 */

export async function fetchPostViews(
  _context: QueryFunctionContext
): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryKey: [_key, slug],
  } = _context
  try {
    console.log('fetchPostViews', { slug })
    const response = await fetch('/api/views' + slug, { method: 'GET' })
    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export async function updatePostViews(
  _context: QueryFunctionContext
): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryKey: [_key, slug],
  } = _context
  try {
    console.log('updatePostViews', { slug })
    const response = await fetch('/api/views' + slug, { method: 'POST' })
    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}
