import { describe, expect, it, vi } from 'vitest'

import { unref } from 'vue'
import { createCalendars } from '../../datepicker-core/utils/create-calendars'
import { createWeekdays } from '../../datepicker-core/utils/create-weekdays'
import { useCalendars } from '../use-calendars'
import { useDatePickerState } from '../use-date-picker-state'

describe('useCalendars', () => {
  it('useCalendars should return correct calendars and weekDays', () => {
    const stateResult = useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() })

    const result = useCalendars(stateResult)

    const calendars = createCalendars({
      selectedDates: stateResult.selectedDates,
      offsetDate: unref(stateResult.offsetDate),
      state: {
        focusDate: unref(stateResult.state.value.focusDate),
        offsetDate: unref(stateResult.state.value.offsetDate),
        offsetYear: unref(stateResult.state.value.offsetYear),
        rangeEnd: unref(stateResult.state.value.rangeEnd),
      },
      config: stateResult.config,
    })

    const weekDays = createWeekdays(calendars[0], stateResult.config)

    expect(result.value.calendars).toEqual(calendars)
    expect(result.value.weekDays).toEqual(weekDays)
  })
})
