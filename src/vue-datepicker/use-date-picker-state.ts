import type { DPReducerState } from '../datepicker-core/types'
import type { DPUserConfig } from './types/config'
import type { DPState } from './types/state'
import { computed, readonly, ref, unref } from 'vue'
// import { stateReducer } from './state-reducer'
import { createConfig } from '../datepicker-core/utils/config'
import { createInitialState } from '../datepicker-core/utils/create-initial-state'

export function useDatePickerState(config: DPUserConfig): DPState {
  const dpConfig = computed(() => createConfig({
    ...config,
    offsetDate: unref(config.offsetDate),
  }))

  const initState = createInitialState(dpConfig.value)

  const state = ref<{
    focusDate: DPReducerState['focusDate']
    offsetDate: DPReducerState['offsetDate']
    rangeEnd: DPReducerState['rangeEnd']
    offsetYear: DPReducerState['offsetYear']
  }>({
    focusDate: initState.focusDate,
    offsetDate: initState.offsetDate,
    rangeEnd: initState.rangeEnd,
    offsetYear: initState.offsetYear,
  })

  return {
    dispatch: state,
    selectedDates: dpConfig.value.selectedDates,
    offsetDate: computed(() => dpConfig.value.offsetDate || state.value.offsetDate),
    state: readonly(state),
    config: dpConfig.value,
  }
}
