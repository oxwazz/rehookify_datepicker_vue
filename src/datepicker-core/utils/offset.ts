import type { DPOffsetValue, DPStateRef } from '../../vue-datepicker/types'
import { addToDate, subtractFromDate } from './date'
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates'

export function setDPOffset({ state, config: { onOffsetChange, offsetDate } }: DPStateRef) {
  return (d: Date): void => {
    // Prevent to call reducer action if offsetDate is external
    if (!onOffsetChange && !offsetDate)
      state.offsetDate.value = d
    if (onOffsetChange)
      onOffsetChange(d)
  }
}

export function getNextOffsetDate(d: Date, { days, months, years }: DPOffsetValue): Date {
  let nextDate = d
  if (days && days !== 0) {
    nextDate = addToDate(nextDate, days, 'date')
  }
  if (months && months !== 0) {
    nextDate = addToDate(nextDate, months, 'month')
  }
  if (years && years !== 0) {
    nextDate = addToDate(nextDate, years, 'year')
  }
  return nextDate
}

export function getEdgedOffsetDate(
  offsetDate: Date,
  { days = 0, months = 0, years = 0 }: DPOffsetValue,
  dateEdge?: Date,
): Date {
  if (!dateEdge)
    return offsetDate
  if (isSame(offsetDate, dateEdge))
    return offsetDate
  if (days !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, days, 'date')
  }
  if (months !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, months, 'month')
  }
  if (years !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, years, 'year')
  }

  return offsetDate
}

export function calculateNewDateWithOffset(offsetDate: Date, dateEdge: Date, offsetValue: number, unit: 'date' | 'month' | 'year'): Date {
  const newDate = addToDate(offsetDate, offsetValue, unit)
  const isPositiveOffsetValue = offsetValue > 0
  if (isPositiveOffsetValue) {
    const isMaxDateAfterNewDate = maxDateAndAfter(dateEdge, newDate)
    return isMaxDateAfterNewDate
      ? subtractFromDate(dateEdge, offsetValue, unit)
      : offsetDate
  }
  const isMinDateBeforeNewDate = minDateAndBefore(dateEdge, newDate)
  return isMinDateBeforeNewDate
    ? subtractFromDate(dateEdge, offsetValue, unit)
    : offsetDate
}
