import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export const dedupeArray = <T>(array: Array<T>): Array<T> => [...new Set(array)]

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
