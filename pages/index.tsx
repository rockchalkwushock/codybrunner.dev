import * as React from 'react'
import { GetStaticProps } from 'next'

import { Post } from '@interfaces/blog'
import { getAllPostsFrontMatter } from '@utils/mdx'

interface Props {
  posts: Array<Post>
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className="border-2 border-purple-100 grid-in-section px-4">
      <h1>Home Page</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const posts = await getAllPostsFrontMatter()

    return {
      props: {
        // Give the client the 3 latest posts.
        posts: posts.slice(-3),
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default Home
