import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { getPage, getPosts } from '@lib/ghost-cms'
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
      loc: `${constants.url}/blog`,
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

  // Query data from any pages written in GhostCMS.
  const aboutPage = await getPage('about')

  // Query data from all posts written in GhostCMS.
  const posts = (await getPosts()).map<ISitemapField>(
    ({ slug, updatedAt }) => ({
      lastmod: lastmod(updatedAt),
      loc: `${constants.url}/${slug}`,
    })
  )

  // Merge arrays for processing.
  const fields: Array<ISitemapField> = [
    ...staticPages,
    {
      lastmod: lastmod(aboutPage.updatedAt),
      loc: `${constants.url}/${aboutPage.slug}`,
    },
    ...posts,
  ]

  return getServerSideSitemap(ctx, fields)
}

const SiteMap = () => null
export default SiteMap
