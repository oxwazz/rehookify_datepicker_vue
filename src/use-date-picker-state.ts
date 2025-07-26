import type { DPReducerState, DPStateRef, DPUserConfigRef } from './types'
import { ref, watch } from 'vue'
// import { stateReducer } from './state-reducer'
import { createConfig } from './utils/config'
import { createInitialState } from './utils/create-initial-state'

export function useDatePickerState(config: DPUserConfigRef): DPStateRef {
  const dpConfig = createConfig(config)

  const initState = createInitialState(dpConfig)

  const focusDate = ref<DPReducerState['focusDate']>(initState.focusDate)
  const offsetDate = ref<DPReducerState['offsetDate']>(initState.offsetDate)
  const rangeEnd = ref<DPReducerState['rangeEnd']>(initState.rangeEnd)
  const offsetYear = ref<DPReducerState['offsetYear']>(initState.offsetYear)

  watch(offsetDate, (v) => {
    console.warn(3333123, 'offsetDate.value masok', v)
  })

  return {
    selectedDates: dpConfig.selectedDates,
    offsetDate,
    state: {
      focusDate,
      offsetDate,
      rangeEnd,
      offsetYear,
    },
    config: dpConfig,
  }
}
