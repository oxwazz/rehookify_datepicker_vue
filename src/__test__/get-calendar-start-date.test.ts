import { describe, expect, it } from 'vitest'

import { getCleanDate, getDateParts, newDate } from '../utils/date'
import { getCalendarStartDate } from '../utils/get-calendar-start-date'

describe('getCalendarStartDate', () => {
  it('getCalendarStartDate returns minDate if minDate > now', () => {
    const now = getCleanDate(newDate())
    const { Y, M, D } = getDateParts(now)
    const minDate = newDate(Y, M, D + 2)

    const currentDate = getCalendarStartDate(minDate, undefined, now)

    expect(currentDate).toEqual(minDate)
  })

  it('getCalendarStartDate returns maxDate if maxDate < now', () => {
    const now = getCleanDate(newDate())
    const { Y, M, D } = getDateParts(now)
    const maxDate = newDate(Y, M, D - 2)

    const currentDate = getCalendarStartDate(undefined, maxDate, now)

    expect(currentDate).toEqual(maxDate)
  })

  it('getCalendarStartDate returns now if minDate < now < maxDate', () => {
    const now = getCleanDate(newDate())
    const { Y, M, D } = getDateParts(now)
    const maxDate = newDate(Y + 1, M, D)
    const minDate = newDate(Y - 1, M, D)

    const currentDate = getCalendarStartDate(minDate, maxDate, now)

    expect(currentDate).toEqual(now)
  })
})
