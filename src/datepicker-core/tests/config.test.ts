import { describe, expect, it, vi } from 'vitest'

import { DEFAULT_CONFIG } from '../../vue-datepicker/mocks/config'
import { ALTERNATIVE_LOCALE_CONFIG } from '../../vue-datepicker/mocks/locale'
import { createConfig } from '../utils/config'
import { getCleanDate, getDateParts, newDate } from '../utils/date'
import { isBefore } from '../utils/predicates'

describe('createConfig', () => {
  it('should create correct default config', () => {
    // vi.fn here because we can't assert over vi.fn() because resolves based on context
    expect(createConfig({ selectedDates: [], onDatesChange: vi.fn as (d: Date[]) => void })).toEqual(
      DEFAULT_CONFIG,
    )
  })

  it('correctly composes calendar config', () => {
    const { calendar } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      calendar: { mode: 'fluid', offsets: [1] },
    })

    expect(calendar.mode).toBe('fluid')
    expect(calendar.offsets.length).toBe(2)
  })

  it('correctly creates years', () => {
    const { years } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      years: { numberOfYears: 100 },
    })

    expect(years.numberOfYears).toBe(100)
  })

  it('correctly composes dates', () => {
    const d = newDate()
    const { Y, M } = getDateParts(d)
    const { dates, selectedDates } = createConfig({
      selectedDates: [d],
      onDatesChange: vi.fn(),
      dates: {
        mode: 'multiple',
        toggle: true,
        minDate: newDate(Y, M - 1, 1),
        maxDate: newDate(Y, M + 1, 0),
        limit: 2,
      },
    })

    expect(dates.mode).toBe('multiple')
    expect(dates.toggle).toBeTruthy()
    expect(dates.minDate).toEqual(newDate(Y, M - 1, 1))
    expect(dates.maxDate).toEqual(newDate(Y, M + 1, 0))
    expect(selectedDates.length).toBe(1)
    expect(dates.limit).toBe(2)
  })

  it('correctly composes locales', () => {
    const { locale } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      locale: ALTERNATIVE_LOCALE_CONFIG,
    })

    expect(locale).toEqual(ALTERNATIVE_LOCALE_CONFIG)
  })

  it('should sort min and max date in ASC order', () => {
    const d = newDate()
    const { Y, M, D } = getDateParts(d)
    const { dates } = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      dates: {
        minDate: newDate(Y, M + 1, D),
        maxDate: newDate(Y, M - 1, D),
      },
    })

    const { minDate, maxDate } = dates

    expect(isBefore(minDate as Date, maxDate as Date)).toBe(true)
  })

  it('should respect min and max time', () => {
    const minTime = { h: 9, m: 11 }
    const maxTime = { h: 16, m: 0 }
    const c1 = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      time: { minTime },
    })

    // minTime should remain as is because we don't have maxTime
    expect(c1.time.minTime).toEqual(minTime)
    expect(c1.time.maxTime).toBe(undefined)

    const c2 = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      time: { maxTime },
    })

    // maxTime should remain as is because we don't have minTime
    expect(c2.time.minTime).toBe(undefined)
    expect(c2.time.maxTime).toEqual(maxTime)

    const c3 = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      time: { minTime: maxTime, maxTime: minTime },
    })

    // We should swap min and max because minTime > maxTime
    expect(c3.time.minTime).toEqual(minTime)
    expect(c3.time.maxTime).toEqual(maxTime)

    const c4 = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      time: { minTime, maxTime },
    })

    // minTime and maxTime should stay as is
    expect(c4.time.minTime).toEqual(minTime)
    expect(c4.time.maxTime).toEqual(maxTime)
  })

  it('should set focusTime if it is present in selectedDates', () => {
    const d1 = getCleanDate(newDate())
    const d2 = newDate(d1.setDate(33))
    const c1 = createConfig({
      selectedDates: [d1],
      onDatesChange: vi.fn(),
      focusDate: d2,
    })

    expect(c1.focusDate).toBe(undefined)

    const c2 = createConfig({
      selectedDates: [d1, d2],
      onDatesChange: vi.fn(),
      focusDate: d1,
    })

    expect(c2.focusDate).toEqual(d1)
  })
})
