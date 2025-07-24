import { describe, expect, it } from 'vitest'

import { getDateParts, newDate } from '../utils/date'
import {
  getFluidYearPosition,
  getStartDecadePosition,
  getStartExactPosition,
} from '../utils/get-current-year-position'

describe('getStartDecadePosition', () => {
  it('should return year before current decade', () => {
    expect(getStartDecadePosition(2022)).toBe(2019)
  })
})

describe('getStartDecadePosition', () => {
  it('should return centered position', () => {
    expect(getFluidYearPosition(2022, 12)).toBe(2017)
  })
})

describe('getStartExactPosition', () => {
  it('should return correct exact position', () => {
    const { Y } = getDateParts(newDate())
    const numberOfYears = 12
    expect(getStartExactPosition(Y, numberOfYears)).toBe(Y - numberOfYears + 1)
  })
})
