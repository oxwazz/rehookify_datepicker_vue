import { getCleanDate, getDateParts } from './date'

// Converting Date to Number is equal of calling Date.getTime
export const isSame = (d1: Date, d2: Date): boolean => +d1 === +d2

export const isBefore = (d1: Date, d2: Date): boolean => d1 < d2

export const isAfter = (d1: Date, d2: Date): boolean => d1 > d2

export function isBetween(start: Date, d: Date, end: Date): boolean {
  return (isAfter(d, start) && isBefore(d, end))
    || (isBefore(d, start) && isAfter(d, end))
}

export function maxDateAndAfter(maxDate: Date | undefined, date: Date): boolean {
  return !!maxDate && isAfter(date, maxDate)
}

export function minDateAndBefore(minDate: Date | undefined, date: Date): boolean {
  return !!minDate && isBefore(date, minDate)
}

export function includeDate(dates: Date[], d: Date): boolean {
  return dates.some(date => isSame(getCleanDate(date), getCleanDate(d)))
}

export function isBeforeMinMonth(month: number, minDate?: Date): boolean {
  return !!minDate && month < getDateParts(minDate).M
}

export function isBeforeMinYear(year: number, minDate?: Date): boolean {
  return !!minDate && year < getDateParts(minDate).Y
}

export function isAfterMaxMonth(month: number, maxDate?: Date): boolean {
  return !!maxDate && month > getDateParts(maxDate).M
}

export function isAfterMaxYear(year: number, maxDate?: Date): boolean {
  return !!maxDate && year > getDateParts(maxDate).Y
}

export function isSameOrAfterMaxYear(year: number, maxDate?: Date): boolean {
  return !!maxDate && year >= getDateParts(maxDate).Y
}

export function isSameOrBeforeMinYear(year: number, minDate?: Date): boolean {
  return !!minDate && year <= getDateParts(minDate).Y
}
