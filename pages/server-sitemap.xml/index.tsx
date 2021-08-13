import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { getMDXBySlug, prepareMDX } from '@lib/mdx'
import { constants } from '@utils/constants'
import { getAllPostsFrontMatter } from '@utils/mdx'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const lastmod = (timestamp?: string) =>
    timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()

  // Create entries for the static pages here in the NextJS App.
  const staticPages: Array<ISitemapField> = [
    {
      lastmod: lastmod(),
      loc: constants.url,
    },
    {
      lastmod: lastmod(),
      loc: `${constants.url}/contact`,
    },
    {
      lastmod: lastmod(),
      loc: `${constants.url}/projects`,
    },
  ]

  const source = await getMDXBySlug('about', 'about')
  const aboutPage = await prepareMDX(source)

  const posts = (await getAllPostsFrontMatter()).reduce((acc, post) => {
    acc.push({
      lastmod: lastmod(post.updatedAt || post.publishedAt || post.createdAt),
      loc: post.canonicalUrl,
    })
    return acc
  }, [] as Array<ISitemapField>)

  // Merge arrays for processing.
  const fields: Array<ISitemapField> = [
    ...staticPages,
    {
      lastmod: lastmod(
        aboutPage.updatedAt || aboutPage.publishedAt || aboutPage.createdAt
      ),
      loc: aboutPage.canonicalUrl,
    },
    ...posts,
  ]

  return getServerSideSitemap(ctx, fields)
}

const SiteMap = () => null
export default SiteMap
