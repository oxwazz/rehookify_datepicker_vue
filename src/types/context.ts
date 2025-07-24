import type { Slot } from 'vue'

import type { DPUserConfig } from './config'
import type { DPUseDatePicker } from './hooks'

export type DatePickerContextValue = ReturnType<DPUseDatePicker>

export interface DatePickerProviderProps {
  children: Slot
  config: DPUserConfig
}
