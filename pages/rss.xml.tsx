import { GetServerSideProps } from 'next'
import { Feed } from 'feed'

import { Post } from '@interfaces/blog'
import { getMDXBySlug, prepareMDX } from '@lib/mdx'
import { constants } from '@utils/constants'
import { getAllPostsFrontMatter } from '@utils/mdx'

function buildFeed(items: Array<Omit<Post, 'tags'>>) {
  // Instantiate the default feed values.
  const feed = new Feed({
    author: {
      name: constants.author,
      link: constants.url,
    },
    description: constants.description,
    copyright: constants.copyright,
    id: constants.url,
    link: constants.url,
    title: 'codybrunner-dev.vercel.app',
    updated: new Date(),
  })

  // Create an entry in the feed for every page/post.
  items.forEach(item => {
    feed.addItem({
      date: new Date(),
      description: item.description,
      link: item.canonicalUrl,
      published: new Date(item.publishedAt || item.createdAt),
      title: item.title,
    })
  })

  return feed
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx && ctx.res) {
    const { res } = ctx

    const source = await getMDXBySlug('about', 'about')
    const aboutPage = await prepareMDX(source)
    const posts = await getAllPostsFrontMatter()

    const feed = buildFeed([...posts, aboutPage])
    res.setHeader('Content-Type', 'text/xml')
    res.write(feed.rss2())
    res.end()
  }

  return {
    props: {},
  }
}

const Rss = () => null

export default Rss
