import { GetServerSideProps } from 'next'
import { Feed } from 'feed'

import { Post } from '@interfaces/blog'
import { browseGhostPosts, readGhostPageOrPost } from '@lib/ghost-cms'
import { constants } from '@utils/constants'

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
    title: 'codybrunner.dev',
    updated: new Date(),
  })

  // Create an entry in the feed for every page/post.
  items.forEach(item => {
    feed.addItem({
      date: new Date(),
      description: item.excerpt,
      link:
        item.slug === 'about'
          ? `${constants.url}/about`
          : `${constants.url}/blog/${item.slug}`,
      published: new Date(item.publishedAt),
      title: item.title,
    })
  })

  return feed
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx && ctx.res) {
    const { res } = ctx

    const aboutPage = await readGhostPageOrPost({
      params: {
        include: ['authors'],
      },
      slug: ['about'],
      isPage: true,
    })
    const posts = await browseGhostPosts({
      include: ['authors', 'tags'],
      limit: 'all',
      order: 'published_at DESC',
    })

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
