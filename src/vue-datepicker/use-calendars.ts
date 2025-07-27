import type { DPUseCalendars } from '../datepicker-core/types'
import { computed, toValue } from 'vue'
import { createCalendars } from '../datepicker-core/utils/create-calendars'
import { createWeekdays } from '../datepicker-core/utils/create-weekdays'

export const useCalendars: DPUseCalendars = (state) => {
  const calendars = createCalendars({
    selectedDates: state.selectedDates,
    state: {
      offsetDate: state.state.value.offsetDate,
      focusDate: state.state.value.focusDate,
      offsetYear: state.state.value.offsetYear,
      rangeEnd: state.state.value.rangeEnd,
    },
    config: state.config,
    offsetDate: toValue(state.offsetDate),
  })
  return computed(() => ({
    calendars,
    weekDays: createWeekdays(calendars[0], state.config),
  }))
}
