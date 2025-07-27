import type { DPUseDatePicker } from './types'
import { computed, toValue } from 'vue'
import { useCalendars } from './use-calendars'
import { useDatePickerOffsetPropGetters } from './use-date-picker-offset'
import { useDatePickerState } from './use-date-picker-state'
import { useDays, useDaysPropGetters } from './use-days'
import { useMonths, useMonthsPropGetters } from './use-months'
import { useTime, useTimePropGetter } from './use-time'
import { useYears, useYearsPropGetters } from './use-years'

export const useDatePicker: DPUseDatePicker = (config) => {
  const dpState = useDatePickerState(config)

  return {
    data: computed(() => ({
      ...toValue(useCalendars(dpState)),
      ...toValue(useDays(dpState)),
      ...toValue(useMonths(dpState)),
      ...toValue(useTime(dpState)),
      ...toValue(useYears(dpState)),
    })),
    propGetters: {
      ...useDaysPropGetters(dpState),
      ...useMonthsPropGetters(dpState),
      ...useTimePropGetter(dpState),
      ...useYearsPropGetters(dpState),
      ...useDatePickerOffsetPropGetters(dpState),
    },
  }
}
