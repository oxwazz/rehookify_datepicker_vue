import type {
  DPPropsGetterConfig,
  DPTime,
  DPUseTime,
  DPUseTimePropGetter,
} from '../datepicker-core/types'
import { computed, toValue } from 'vue'
import { callAll, skipFirst } from '../datepicker-core/utils/call-all'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import { createTime } from '../datepicker-core/utils/create-time'
import { isSame } from '../datepicker-core/utils/predicates'
import { setFocus } from './state-reducer'

export const useTime: DPUseTime = ({ state: { focusDate }, config }) =>
  computed(() => ({
    time: createTime(toValue(focusDate), config),
  }))

export const useTimePropGetter: DPUseTimePropGetter = ({
  selectedDates,
  state: { focusDate },
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
              return isSame(toValue(focusDate) as Date, selected) ? d : selected
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
