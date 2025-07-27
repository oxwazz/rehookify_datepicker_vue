import type { ComputedRef, Ref } from 'vue'
import type { DPConfig } from '../../datepicker-core/types'

export interface DPReducerState {
  focusDate: Date | undefined
  rangeEnd: Date | null
  offsetDate: Date
  offsetYear: number
}

export interface DPState {
  dispatch: Ref<DPReducerState>
  state: Readonly<Ref<DPReducerState>>
  selectedDates: Date[]
  offsetDate: ComputedRef<Date>
  config: DPConfig
}
