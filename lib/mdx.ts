import { readFile } from 'fs/promises'
import { join } from 'path'

import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'

// Plugins & Presets
import rehypeCodeTitles from 'rehype-code-titles'
import remarkEmoji from 'remark-emoji'
import remarkExternalLinks from 'remark-external-links'
import gfm from 'remark-gfm'

import { Post } from '@interfaces/blog'

const root = process.cwd()

interface MDXSource {
  file: string
  slug: string
}

/**
 * @name getMDXBySlug
 * @param type 'about | 'blog'
 * @param slug {string}
 * @returns {Promise<MDXSource>}
 * @description Finds a md or mdx file by given type and slug parameters.
 */
export async function getMDXBySlug(
  type: 'about' | 'blog',
  slug: string
): Promise<MDXSource> {
  // Check if the post resides in the 'archive' directory because if it does
  // it's written in 'md' not 'mdx' so we need to append the correct extension.
  const isArchivedPost = slug.includes('archive')
  try {
    const file =
      type === 'blog' && slug
        ? await readFile(
            join(
              root,
              'data',
              type,
              `${slug}.${isArchivedPost ? 'md' : 'mdx'}`
            ),
            'utf8'
          )
        : await readFile(join(root, 'data', `${type}.mdx`), 'utf8')

    return { file, slug }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @name prepareMDX
 * @param source {MDXSource}
 * @returns {Promise<Post>}
 * @description Wrapper for mdx-bundler/bundleMDX. Takes file source and returns processed MDX with frontmatter.
 */
export async function prepareMDX(source: MDXSource): Promise<Post> {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = join(
      root,
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      root,
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }
  try {
    // mdx-bundler processes the frontMatter internally from the file. No need for gray-matter anymore.
    const { code, frontmatter } = await bundleMDX(source.file, {
      // @ts-ignore
      xdmOptions(_input, options) {
        return {
          ...options,
          remarkPlugins: [
            ...(options.remarkPlugins ?? []),
            gfm,
            remarkEmoji,
            remarkExternalLinks,
          ],
          rehypePlugins: [...(options.rehypePlugins ?? []), rehypeCodeTitles],
        }
      },
    })

    // readingTime will process the content and tell us
    // 1. text = "X min read"
    // 2. words = 1735
    const { text, words } = readingTime(code)

    return {
      frontMatter: {
        ...(frontmatter as Post['frontMatter']),
        readingTime: text,
        slug: source.slug,
        wordCount: words,
      },
      source: code,
    }
  } catch (error) {
    throw new Error(error)
  }
}
