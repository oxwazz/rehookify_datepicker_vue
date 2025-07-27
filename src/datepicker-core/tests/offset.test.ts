import { describe, expect, it } from 'vitest'

import { getCleanDate, newDate, subtractFromDate } from '../utils/date'
import {
  getEdgedOffsetDate,
  getNextOffsetDate,
} from '../utils/offset'

describe('getNextOffsetDate', () => {
  it('should add offset correctly', () => {
    const d = getCleanDate(newDate(2022, 11, 11))

    const testResult1 = getNextOffsetDate(d, { days: 21, months: 0, years: 0 })
    expect(testResult1).toEqual(getCleanDate(newDate(2023, 0, 1)))

    const testResult2 = getNextOffsetDate(d, { days: 0, months: 1, years: 0 })
    expect(testResult2).toEqual(getCleanDate(newDate(2023, 0, 11)))

    const testResult3 = getNextOffsetDate(d, { days: 0, months: 0, years: 1 })
    expect(testResult3).toEqual(getCleanDate(newDate(2023, 11, 11)))

    const testResult4 = getNextOffsetDate(d, { days: 1, months: 1, years: 1 })
    expect(testResult4).toEqual(getCleanDate(newDate(2024, 0, 12)))
  })

  it('should subtract offset correctly', () => {
    const d = getCleanDate(newDate(2022, 11, 11))

    const testResult1 = getNextOffsetDate(d, {
      days: -11,
      months: 0,
      years: 0,
    })
    expect(testResult1).toEqual(getCleanDate(newDate(2022, 10, 30)))

    const testResult2 = getNextOffsetDate(d, { days: 0, months: -1, years: 0 })
    expect(testResult2).toEqual(getCleanDate(newDate(2022, 10, 11)))

    const testResult3 = getNextOffsetDate(d, { days: 0, months: 0, years: -1 })
    expect(testResult3).toEqual(getCleanDate(newDate(2021, 11, 11)))

    const testResult4 = getNextOffsetDate(d, {
      days: -11,
      months: -11,
      years: -1,
    })
    expect(testResult4).toEqual(getCleanDate(newDate(2020, 11, 30)))
  })
})

describe('getEdgedOffsetDate', () => {
  it('should return offsetDate when dateEdge is not provided', () => {
    const offsetDate = newDate(2022, 11, 11)
    const result = getEdgedOffsetDate(offsetDate, {
      days: 0,
      months: 0,
      years: 0,
    })
    expect(result).toEqual(offsetDate)
  })

  it('should return offsetDate when offsetDate and dateEdge are the same', () => {
    const offsetDate = newDate(2022, 11, 11)
    const dateEdge = newDate(2022, 11, 11)
    const result = getEdgedOffsetDate(
      offsetDate,
      { days: 0, months: 0, years: 0 },
      dateEdge,
    )
    expect(result).toEqual(offsetDate)
  })

  it('should return offsetDate when days, months, and years are all zero', () => {
    const offsetDate = newDate(2022, 11, 11)
    const dateEdge = newDate(2022, 11, 12)
    const result = getEdgedOffsetDate(
      offsetDate,
      { days: 0, months: 0, years: 0 },
      dateEdge,
    )
    expect(result).toEqual(offsetDate)
  })

  it('should return date edge - offsetValue if the offset date + offsetValue is greater then max edge', () => {
    const offsetDate = newDate(2022, 11, 11)
    const offsetValue = { days: 0, months: 1, years: 0 }
    const maxDateEdge = newDate(2022, 11, 12)
    const result = getEdgedOffsetDate(offsetDate, offsetValue, maxDateEdge)
    const expectedDate = subtractFromDate(
      maxDateEdge,
      offsetValue.months,
      'month',
    )
    expect(result).toEqual(expectedDate)
  })

  it('should return date edge - offsetValue if the offset date + offsetValue is greater then min edge', () => {
    const offsetDate = newDate(2022, 11, 11)
    const offsetValue = { days: 0, months: -1, years: 0 }
    const minDateEdge = newDate(2022, 10, 12)
    const result = getEdgedOffsetDate(offsetDate, offsetValue, minDateEdge)
    const expectedDate = subtractFromDate(
      minDateEdge,
      offsetValue.months,
      'month',
    )
    expect(result).toEqual(expectedDate)
  })
})
