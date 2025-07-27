import type { ComputedRef } from 'vue'
import type {
  DPCalendar,
  DPDay,
  DPMonth,
  DPOffsetValue,
  DPPropGetter,
  DPPropsGetterConfig,
  DPTime,
  DPUserConfig,
  DPYear,
} from '../../datepicker-core/types'
import type { DPState } from './state'

export type DPUseCalendars = (state: DPState) => ComputedRef<{
  calendars: DPCalendar[]
  weekDays: string[]
}>

export type DPUseDays = (state: DPState) => ComputedRef<{
  selectedDates: Date[]
  formattedDates: string[]
}>

export type DPUseDaysPropGetters = (state: DPState) => {
  dayButton: (day: DPDay, config?: DPPropsGetterConfig) => DPPropGetter
}

export type DPUseMonths = (state: DPState) => ComputedRef<{
  months: DPMonth[]
}>

export type DPUseMonthsPropGetters = (state: DPState) => {
  monthButton: (month: DPMonth, config?: DPPropsGetterConfig) => DPPropGetter
}

export type DPUseDatePickerOffsetPropGetters = (state: DPState) => {
  addOffset: (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter
  setOffset: (date: Date) => DPPropGetter
  subtractOffset: (
    offsetValue: DPOffsetValue,
    config?: DPPropsGetterConfig,
  ) => DPPropGetter
}

export type DPUseTime = (state: DPState) => ComputedRef<{
  time: DPTime[]
}>

export type DPUseTimePropGetter = (state: DPState) => {
  timeButton: (time: DPTime, config?: DPPropsGetterConfig) => DPPropGetter
}

export type DPUseYears = (state: DPState) => ComputedRef<{
  years: DPYear[]
}>

export type DPUseYearsPropGetters = (state: DPState) => {
  yearButton: (year: DPYear, config?: DPPropsGetterConfig) => DPPropGetter
  nextYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter
  previousYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter
}

export type DPData
  = ReturnType<DPUseCalendars>
    & ReturnType<DPUseDays>
    & ReturnType<DPUseMonths>
    & ReturnType<DPUseTime>
    & ReturnType<DPUseYears>

export type DPPropGetters
  = ReturnType<DPUseDaysPropGetters>
    & ReturnType<DPUseMonthsPropGetters>
    & ReturnType<DPUseTimePropGetter>
    & ReturnType<DPUseYearsPropGetters>
    & ReturnType<DPUseDatePickerOffsetPropGetters>

export type DPUseDatePicker = (config: DPUserConfig) => {
  data: DPData
  propGetters: DPPropGetters
}

export type DPUseContextCalendars = () => ReturnType<DPUseCalendars>

export type DPUseContextDays = () => ReturnType<DPUseDays>
export type DPUseContextDaysPropGetters
  = () => ReturnType<DPUseDaysPropGetters>

export type DPUseContextMonths = () => ReturnType<DPUseMonths>
export type DPUseContextMonthsPropGetters
  = () => ReturnType<DPUseMonthsPropGetters>

export type DPUseContextTime = () => ReturnType<DPUseTime>
export type DPUseContextTimePropGetters = () => ReturnType<DPUseTimePropGetter>

export type DPUseContextYears = () => ReturnType<DPUseYears>
export type DPUseContextYearsPropGetters
  = () => ReturnType<DPUseYearsPropGetters>

export type DPUseContextDatePickerOffsetPropGetters
  = () => ReturnType<DPUseDatePickerOffsetPropGetters>
