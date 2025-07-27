import type {
  DPMonth,
  DPPropsGetterConfig,
  DPState,

} from '../datepicker-core/types'
import type { DPUseMonths, DPUseMonthsPropGetters } from './types'
import { computed, toValue, unref } from 'vue'
import { callAll, skipFirst } from '../datepicker-core/utils/call-all'
import { createMonths } from '../datepicker-core/utils/create-months'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import { setDPOffset } from '../datepicker-core/utils/offset'

export const useMonths: DPUseMonths = ({
  selectedDates,
  offsetDate,
  config: { locale, dates },
}) =>
  computed(() => ({
    months: createMonths(toValue(offsetDate), selectedDates, locale, dates),
  }))

export const useMonthsPropGetters: DPUseMonthsPropGetters = (dpState) => {
  const monthButton = (
    { $date, disabled, selected, active }: DPMonth,
    { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
  ) => {
    const dpState_: DPState = {
      ...dpState,
      state: unref(dpState.state),
      offsetDate: unref(dpState.offsetDate),
      dispatch: v => dpState.dispatch.value.offsetDate = v,
    }
    return createPropGetter(
      !!disabledProps || disabled,
      evt => callAll(onClick, skipFirst(setDPOffset(dpState_)))(evt, $date),
      {
        ...rest,
        tabIndex: active ? 0 : -1,
      },
      selected,
    )
  }

  return { monthButton }
}
