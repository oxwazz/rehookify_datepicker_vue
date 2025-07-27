import type { ComputedRef, Ref } from 'vue'
import type { DPConfig } from './config'

export interface DPReducerState {
  focusDate?: Date
  rangeEnd: Date | null
  offsetDate: Date
  offsetYear: number
}

export interface DPSetFocusDate {
  type: 'SET_FOCUS_DATE'
  date: DPReducerState['focusDate']
}

export interface DPSetOffsetDate {
  type: 'SET_OFFSET_DATE'
  date: DPReducerState['offsetDate']
}

export interface DPSetRangeEndAction {
  type: 'SET_RANGE_END'
  date: DPReducerState['rangeEnd']
}

export interface DPSetYearAction {
  type: 'SET_YEAR'
  year: DPReducerState['offsetYear']
}

export type DPReducerAction
  = | DPSetFocusDate
    | DPSetOffsetDate
    | DPSetYearAction
    | DPSetRangeEndAction

export interface DPState {
  state: DPReducerState
  selectedDates: Date[]
  offsetDate: Date
  config: DPConfig
}

export interface DPStateRef {
  dispatch: Ref<DPReducerState>
  state: Readonly<Ref<DPReducerState>>
  selectedDates: Date[]
  offsetDate: ComputedRef<Date>
  config: DPConfig
}
