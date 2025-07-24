import { describe, expect, it, vi } from 'vitest'

import { createConfig } from '../utils/config'
import { createCalendars } from '../utils/create-calendars'
import { createInitialState } from '../utils/create-initial-state'
import { getCleanDate, newDate } from '../utils/date'
import { isSame } from '../utils/predicates'

describe('isExcludedDay', () => {
  it('should exclude day correctly', () => {
    // exclude all Sundays
    const EXCLUDED_DATE = 0
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      exclude: {
        day: [EXCLUDED_DATE],
      },
    })

    const state = createInitialState(config)
    const [calendar] = createCalendars({
      selectedDates: [] as Date[],
      state,
      config,
      offsetDate: newDate(),
    })
    const { days } = calendar

    days.forEach((day) => {
      if (day.$date.getDay() === EXCLUDED_DATE) {
        expect(day.disabled).toBe(true)
      }
    })
  })
})

describe('isExcludedDate', () => {
  it('should exclude dates', () => {
    const NOW = getCleanDate(newDate())
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      exclude: {
        date: [NOW],
      },
    })

    const state = createInitialState(config)
    const [calendar] = createCalendars({
      selectedDates: [] as Date[],
      state,
      config,
      offsetDate: newDate(),
    })
    const { days } = calendar

    days.forEach((day) => {
      if (isSame(day.$date, NOW)) {
        expect(day.disabled).toBe(true)
      }
    })
  })
})
