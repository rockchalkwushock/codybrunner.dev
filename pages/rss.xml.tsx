import { GetServerSideProps } from 'next'
import { Feed } from 'feed'

import { Post } from '@interfaces/blog'
import { getPage, getPosts } from '@lib/ghost-cms'

function buildFeed(items: Array<Post>) {
  const feed = new Feed({
    author: {
      name: 'Cody A Brunner',
      link: 'https://codybrunner.dev',
    },
    description: 'My stretch of pipe in the world wide inter-tubes.',
    copyright: `All content © ${new Date().getFullYear()}`,
    id: 'https://codybrunner.dev',
    link: 'https://codybrunner.dev',
    title: 'codybrunner.dev',
    updated: new Date(),
  })

  items.forEach(item => {
    feed.addItem({
      date: new Date(),
      description: item.excerpt,
      link:
        item.slug === 'about'
          ? 'https://codybrunner.dev/about'
          : `https://codybrunner.dev/blog/${item.slug}`,
      published: new Date(item.publishedAt),
      title: item.title,
    })
  })

  return feed
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (ctx && ctx.res) {
    const { res } = ctx

    const aboutPage = await getPage('about')
    const { posts } = await getPosts()

    // @ts-ignore
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
