import type { DPUseCalendars } from './types'
import { computed, toValue } from 'vue'
import { createCalendars } from './utils/create-calendars'
import { createWeekdays } from './utils/create-weekdays'

export const useCalendars: DPUseCalendars = (state) => {
  const calendars = createCalendars({
    selectedDates: state.selectedDates,
    state: {
      offsetDate: toValue(state.state.offsetDate),
      focusDate: toValue(state.state.focusDate),
      offsetYear: toValue(state.state.offsetYear),
      rangeEnd: toValue(state.state.rangeEnd),
    },
    config: state.config,
    offsetDate: toValue(state.offsetDate),
  })
  return computed(() => ({
    calendars,
    weekDays: createWeekdays(calendars[0], state.config),
  }))
}
