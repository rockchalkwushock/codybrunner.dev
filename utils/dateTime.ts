import { format as f } from 'date-fns'

const formats = {
  'day-month': 'dd MMMM',
  'full-date-localized': 'PPP',
  'full-year': 'yyyy',
  'short-weekday': 'EEE',
  'yr-mo-da': 'yyyy-MM-dd',
}

export type Formats =
  | 'day-month'
  | 'full-date-localized'
  | 'full-year'
  | 'short-weekday'
  | 'yr-mo-da'

/**
 * @name formatDateTime
 * @param date {Date|number|string}
 * @param format {Formats}
 * @returns {string}
 * @description Wrapper for date-fns/format with specific formats exposed.
 */
export const formatDateTime = (date: Date | number | string, format: Formats) =>
  f(new Date(date), formats[format])

/**
 * @name toISO8601
 * @param date {string}
 * @returns {string}
 * @description Converts date string to ISO 8061 timestamp.
 */
export const toISO8601 = (date: string): string =>
  // Add to the date string my timezone so date's are formatted
  // correctly when deployed to Vercel.
  new Date(`${date} 00:00 GMT-5`).toISOString()
