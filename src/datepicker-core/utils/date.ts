import type {
  DPDatePart,
  DPDateParts,
  DPLocaleConfig,
  DPTimeLimit,
} from '../../vue-datepicker/types'

// Year and Month is a minimum required arguments for creating a date
// == null is intentional to check also for undefined
export function newDate(Y?: number, M?: number, ...rest: number[]): Date {
  return !Y || M == null ? new Date() : new Date(Y, M, ...rest)
}

export function getDateParts(d: Date): DPDateParts {
  return {
    D: d.getDate(),
    M: d.getMonth(),
    Y: d.getFullYear(),
  }
}

// Days in order sun = 0 ... sat = 6
export const getDay = (d: Date): number => d.getDay()

/*
 * We need this function to eliminate time from the comparison.
 * All date that comes to DP should go through this function.
 */
export function getCleanDate(d: Date): Date {
  return newDate(getDateParts(d).Y, getDateParts(d).M, getDateParts(d).D)
}

export function daysInMonth(d: Date): number {
  return newDate(getDateParts(d).Y, getDateParts(d).M + 1, 0).getDate()
}

export function addToDate(d: Date, value: number, part: DPDatePart): Date {
  const { Y, M, D } = getDateParts(d)
  // Cover case when offsetDate is 31 and next month doesn't have 31 days
  // More details here https://github.com/rehookify/datepicker/issues/10
  const nextDate
    = part === 'date'
      ? D + value
      : part === 'month' && D > daysInMonth(newDate(Y, M + value, 1))
        ? daysInMonth(newDate(Y, M + value, 1))
        : D

  return newDate(
    Y + (part === 'year' ? value : 0),
    M + (part === 'month' ? value : 0),
    nextDate,
  )
}

export function subtractFromDate(d: Date, value: number, part: DPDatePart): Date {
  return addToDate(d, 0 - value, part)
}

export const sortDatesAsc = (a: Date, b: Date): number => +a - +b

export function toLocaleDateString(d: Date, locale?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string {
  return d.toLocaleDateString(locale, options)
}

export function formatMonthName(d: Date, { locale, monthName }: DPLocaleConfig): string {
  return toLocaleDateString(d, locale, { month: monthName })
}

export function formatDate(d: Date, { locale, options }: DPLocaleConfig): string {
  return toLocaleDateString(d, locale, options)
}

export function getTimeDate(Y: number, M: number, D: number, t?: DPTimeLimit): Date | undefined {
  return t && t.h != null && t.m != null ? newDate(Y, M, D, t.h, t.m) : undefined
}

export function formatLocaleTime(d: Date, { locale, hour, minute, second, hour12 }: DPLocaleConfig): string {
  return d.toLocaleTimeString(locale, {
    hour,
    minute,
    second,
    hour12,
  })
}

const addLeadingZero = (n: number): string => `${n < 10 ? 0 : ''}${n}`

function convertTo12H(h: number, m: number): string {
  const median = h >= 12 ? 'pm' : 'am'

  return `${addLeadingZero(h % 12 || 12)}:${addLeadingZero(m)} ${median}`
}

export function formatTime(d: Date, { hour12 }: DPLocaleConfig): string {
  const h = d.getHours()
  const m = d.getMinutes()

  return hour12
    ? convertTo12H(h, m)
    : `${addLeadingZero(h)}:${addLeadingZero(m)}`
}

export function addAndSortAsc(dates: Date[], d: Date): Date[] {
  return dates.concat(d).sort(sortDatesAsc)
}

export function sortMinMax<T>(min: T | undefined, max: T | undefined, sortFunction: (a: T, b: T) => number): (T | undefined)[] {
  let [mN, mX] = [min, max]
  if (min && max) {
    [mN, mX] = [min, max].sort(sortFunction)
  }

  return [mN, mX]
}
