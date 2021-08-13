import { readFile } from 'fs/promises'
import { join } from 'path'
import { bundleMDX } from 'mdx-bundler'

import { Post } from '@interfaces/blog'
import { constants } from '@utils/constants'
import { toISO8601 } from '@utils/dateTime'

const root = process.cwd()

interface MDXSource {
  file: string
  slug: string
}

interface RawFrontMatter
  extends Pick<
    Post,
    | 'createdAt'
    | 'description'
    | 'featured'
    | 'publishedAt'
    | 'tags'
    | 'title'
    | 'updatedAt'
  > {}

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
  try {
    const file =
      type === 'blog' && slug
        ? await readFile(join(root, 'data', type, `${slug}.mdx`), 'utf8')
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
    const { default: readingTime } = await import('reading-time')
    const { default: rehypeCodeTitles } = await import('rehype-code-titles')
    const { default: remarkAutoLink } = await import('remark-autolink-headings')
    const { default: remarkExternalLink } = await import(
      'remark-external-links'
    )
    const { default: remarkGfm } = await import('remark-gfm')
    const { default: remarkSlug } = await import('remark-slug')

    // mdx-bundler processes the frontMatter internally from the file. No need for gray-matter anymore.
    const { code, frontmatter } = await bundleMDX(source.file, {
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkSlug,
          [remarkAutoLink, { behavior: 'before' }],
          remarkGfm,
          remarkExternalLink,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeCodeTitles,
        ]
        return options
      },
    })

    // readingTime will process the content and tell us
    // 1. text = "X min read"
    // 2. words = 1735
    const { text, words } = readingTime(code)

    const {
      createdAt,
      description,
      featured,
      publishedAt,
      tags,
      title,
      updatedAt,
    } = frontmatter as RawFrontMatter

    return {
      author: constants.author,
      canonicalUrl:
        source.slug === 'about'
          ? `${constants.url}/${source.slug}`
          : `${constants.url}/blog/${source.slug}`,
      createdAt: toISO8601(createdAt),
      description,
      featured: !!featured,
      publishedAt: publishedAt ? toISO8601(publishedAt) : null,
      readingTime: text,
      slug: source.slug,
      source: code,
      tags: tags ? tags.map(t => t.toLowerCase()) : undefined,
      title,
      updatedAt: updatedAt ? toISO8601(updatedAt) : null,
      words,
    }
  } catch (error) {
    throw new Error(error)
  }
}
