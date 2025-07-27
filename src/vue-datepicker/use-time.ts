import type {
  DPPropsGetterConfig,
  DPTime,
} from '../datepicker-core/types'
import type { DPUseTime, DPUseTimePropGetter } from './types'
import { computed } from 'vue'
import { callAll, skipFirst } from '../datepicker-core/utils/call-all'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import { createTime } from '../datepicker-core/utils/create-time'
import { isSame } from '../datepicker-core/utils/predicates'
import { setFocus } from './state-reducer'

export const useTime: DPUseTime = ({ state, config }) =>
  computed(() => ({
    time: createTime(state.value.focusDate, config),
  }))

export const useTimePropGetter: DPUseTimePropGetter = ({
  selectedDates,
  state,
  config: { onDatesChange },
}) => {
  const timeButton = (
    { $date, selected, disabled, now }: DPTime,
    { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
  ) =>
    createPropGetter(
      disabled || !!disabledProps,
      (evt) => {
        if (selected)
          return
        callAll(
          onClick,
          skipFirst((d: Date) => {
            const newSelected = selectedDates.map((selected) => {
              return isSame(state.value.focusDate as Date, selected) ? d : selected
            })
            setFocus(d)
            onDatesChange(newSelected)
          }),
        )(evt, $date)
      },
      {
        ...rest,
        tabIndex: selected || now ? 0 : -1,
      },
      selected,
    )

  return { timeButton }
}
