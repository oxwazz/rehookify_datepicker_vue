import { describe, expect, it, vi } from 'vitest'

import { createConfig } from '../utils/config'
import { newDate } from '../utils/date'
import { getMultipleDates } from '../utils/get-multiple-dates'

describe('getMultipleDates', () => {
  it('returns correct data in single mode', () => {
    const { dates } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })

    // Adds date correctly
    const clickedDate = newDate(2022, 10, 21)
    expect(getMultipleDates([], clickedDate, dates)).toEqual([clickedDate])

    // Remove date in toggle mode
    dates.toggle = true
    expect(getMultipleDates([clickedDate], clickedDate, dates)).toEqual([])
  })

  it('returns correct data in multiple mode', () => {
    const { dates } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      dates: { mode: 'multiple', toggle: true, limit: 3 },
    })

    const selectedDates = [newDate(2022, 10, 19), newDate(2022, 10, 20)]
    const clickedDate = newDate(2022, 10, 21)
    expect(getMultipleDates(selectedDates, clickedDate, dates)).toEqual([
      ...selectedDates,
      clickedDate,
    ])

    // toggle dates correctly
    expect(
      getMultipleDates(selectedDates, newDate(2022, 10, 19), dates),
    ).toEqual([newDate(2022, 10, 20)])

    // don't allow to add more than limit
    expect(
      getMultipleDates(
        [...selectedDates, clickedDate],
        newDate(2022, 10, 22),
        dates,
      ),
    ).toEqual([...selectedDates, clickedDate])
  })

  it('returns correct data in range mode', () => {
    const { dates } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      dates: { mode: 'range', toggle: true },
    })
    const clickedDate = newDate(2022, 10, 21)
    const selectedDates = [newDate(2022, 10, 1)]

    expect(getMultipleDates(selectedDates, clickedDate, dates)).toEqual([
      ...selectedDates,
      clickedDate,
    ])

    expect(
      getMultipleDates([...selectedDates, clickedDate], clickedDate, dates),
    ).toEqual(selectedDates)
  })
})
