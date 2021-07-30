import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export const isServer = typeof window === 'undefined'

/**
 * @name getFiles
 * @param path {string}
 * @param regex {RegExp}
 * @returns {Array<string>}
 * @description Returns all the files present at the path given.
 */
export function getFiles(path: string, regex: RegExp): Array<string> {
  const files: Array<string> = []

  const scan = (dir: string, list: Array<string>) => {
    const f = readdirSync(dir, 'utf-8')
    return f.reduce((cache, file) => {
      const filePath = `${dir}/${file}`

      if (statSync(filePath).isDirectory()) {
        cache = scan(filePath, list)
      } else {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, slug] = filePath.split(regex)
        if (slug.includes('.DS_Store')) {
          return cache
        }
        cache.push(slug)
      }

      return cache
    }, list)
  }

  return scan(join(path), files)
}

/**
 * @name getLanguageStrings
 * @param html {string}
 * @returns {Array<string>}
 * @description Finds all "language-*" class names in HTML & returns an array
 * of the language names for dynamically loading the correct PrismJS language
 * scripts for the post being loaded.
 */
export function getLanguageStrings(html: string) {
  // 1. Scan the HTML for the corresponding regex.
  // 2. Dedupe the RegexArray.
  // 3. Remove the "language-" from the string.
  return [...new Set(html.match(/language-\w+/g))].map(str =>
    str.replace('language-', '')
  )
}
