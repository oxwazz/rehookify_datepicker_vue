import type { DPReducerState, DPStateRef } from '../datepicker-core/types'
import type { DPUserConfig } from './types/config'
import { computed, ref, unref } from 'vue'
// import { stateReducer } from './state-reducer'
import { createConfig } from '../datepicker-core/utils/config'
import { createInitialState } from '../datepicker-core/utils/create-initial-state'

export function useDatePickerState(config: DPUserConfig): DPStateRef {
  const dpConfig = computed(() => createConfig({
    ...config,
    offsetDate: unref(config.offsetDate),
  }))

  const initState = createInitialState(dpConfig.value)

  const focusDate = ref<DPReducerState['focusDate']>(initState.focusDate)
  const offsetDate = ref<DPReducerState['offsetDate']>(initState.offsetDate)
  const rangeEnd = ref<DPReducerState['rangeEnd']>(initState.rangeEnd)
  const offsetYear = ref<DPReducerState['offsetYear']>(initState.offsetYear)

  // watch(offsetDate, (v) => {
  //   console.warn(3333123, 'offsetDate.value masok', v)
  // })

  return {
    selectedDates: dpConfig.value.selectedDates,
    offsetDate: computed(() => dpConfig.value.offsetDate || offsetDate.value),
    state: {
      focusDate,
      offsetDate,
      rangeEnd,
      offsetYear,
    },
    config: dpConfig.value,
  }
}
