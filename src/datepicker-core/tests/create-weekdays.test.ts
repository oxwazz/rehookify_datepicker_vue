import { describe, expect, it, vi } from 'vitest'

import { ALTERNATIVE_LOCALE_CONFIG } from '../../vue-datepicker/mocks/locale'
import { createConfig } from '../utils/config'
import { createCalendars } from '../utils/create-calendars'
import { createInitialState } from '../utils/create-initial-state'
import { createWeekdays } from '../utils/create-weekdays'
import { getCleanDate, newDate } from '../utils/date'

const now = getCleanDate(newDate())
const config = createConfig({
  selectedDates: [now],
  onDatesChange: vi.fn(),
})
const state = createInitialState(config)

const TEST_CALENDAR = createCalendars({
  dispatch: () => {},
  selectedDates: [now],
  state,
  config,
  offsetDate: newDate(),
})[0]

describe('createWeekdays', () => {
  it('createWeekdays create weekdays correctly with default props', () => {
    const weekdays = createWeekdays(TEST_CALENDAR, config)

    expect(weekdays.length).toBe(7)
    expect(weekdays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
  })

  it('createWeekdays create weekdays correctly with alternative locale', () => {
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      locale: ALTERNATIVE_LOCALE_CONFIG,
    })
    const weekdays = createWeekdays(TEST_CALENDAR, config)

    // Weekdays with Ukrainian locale and weekdays = 'short'
    expect(weekdays).toEqual(['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'])
  })
})
