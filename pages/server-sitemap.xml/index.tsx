import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { getPage, getPosts } from '@lib/ghost-cms'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://codybrunner.dev'
      : 'localhost:4000'

  const staticPages: Array<ISitemapField> = [
    {
      lastmod: new Date().toISOString(),
      loc: baseUrl,
    },
    {
      lastmod: new Date().toISOString(),
      loc: `${baseUrl}/contact`,
    },
    {
      lastmod: new Date().toISOString(),
      loc: `${baseUrl}/projects`,
    },
  ]

  const aboutPage = await getPage('about')

  const posts = (await getPosts()).posts.map<ISitemapField>(
    ({ slug, updatedAt }) => ({
      lastmod: new Date(updatedAt).toISOString(),
      loc: `${baseUrl}/${slug}`,
    })
  )

  const fields: Array<ISitemapField> = [
    ...staticPages,
    {
      lastmod: new Date(aboutPage.updatedAt).toISOString(),
      loc: `${baseUrl}/${aboutPage.slug}`,
    },
    ...posts,
  ]

  return getServerSideSitemap(ctx, fields)
}

const SiteMap = () => null
export default SiteMap
