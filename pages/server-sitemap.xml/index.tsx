import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { getMDXBySlug, prepareMDX } from '@lib/mdx'
import { getAllPostsFrontMatter } from '@utils/mdx'
import { constants } from '@utils/constants'

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
      lastmod: lastmod(
        post.frontMatter.updatedAt || post.frontMatter.createdAt
      ),
      loc: `${constants.url}/${post.frontMatter.slug}`,
    })
    return acc
  }, [] as Array<ISitemapField>)

  // Merge arrays for processing.
  const fields: Array<ISitemapField> = [
    ...staticPages,
    {
      lastmod: lastmod(aboutPage.frontMatter.updatedAt),
      loc: `${constants.url}/${aboutPage.frontMatter.slug}`,
    },
    ...posts,
  ]

  return getServerSideSitemap(ctx, fields)
}

const SiteMap = () => null
export default SiteMap
