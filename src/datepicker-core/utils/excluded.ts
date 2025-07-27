import type { DPDayInteger, DPExcludeConfig } from '../types'
import { getDateParts } from './date'

export function isExcludedDay(d: number, eDays?: DPDayInteger[]): boolean {
  return eDays ? eDays.includes(d as DPDayInteger) : false
}

export function isExcludedDate(d: Date, dates: Date[] = []): boolean {
  const { M, D } = getDateParts(d)
  return dates.some((date: Date) => {
    const { M: md, D: dd } = getDateParts(date)
    return M === md && D === dd
  })
}

export function isExcluded(d: Date, { day, date }: DPExcludeConfig = {}): boolean {
  return isExcludedDay(d.getDay(), day) || isExcludedDate(d, date)
}
