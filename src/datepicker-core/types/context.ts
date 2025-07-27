import type { Slot } from 'vue'

import type { DPUseDatePicker } from '../../vue-datepicker/types/hooks'
import type { DPUserConfig } from './config'

export type DatePickerContextValue = ReturnType<DPUseDatePicker>

export interface DatePickerProviderProps {
  children: Slot
  config: DPUserConfig
}
