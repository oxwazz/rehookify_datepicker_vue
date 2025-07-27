import type {
  DPPropsGetterConfig,
  DPUseYears,
  DPUseYearsPropGetters,
  DPYear,
} from '../datepicker-core/types'
import { computed, toValue } from 'vue'
import { callAll, skipAll, skipFirst } from '../datepicker-core/utils/call-all'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import { createYears } from '../datepicker-core/utils/create-years'
import { getDateParts, newDate } from '../datepicker-core/utils/date'
import { isExactMode } from '../datepicker-core/utils/get-current-year-position'
import { setDPOffset } from '../datepicker-core/utils/offset'
import { isSame, maxDateAndAfter, minDateAndBefore } from '../datepicker-core/utils/predicates'
import { setYear } from './state-reducer'

export const useYears: DPUseYears = ({
  selectedDates,
  offsetDate,
  state,
  config: { years, dates },
}) => {
  return computed(() => ({
    years: createYears(state.value.offsetYear, toValue(offsetDate), selectedDates, years, dates),
  }))
}

export const useYearsPropGetters: DPUseYearsPropGetters = (dpState) => {
  const {
    offsetDate,
    state,
    config: { dates, years: yearsConfig },
  } = dpState
  const { minDate, maxDate } = dates
  const { step, numberOfYears, mode } = yearsConfig
  const { D, M } = getDateParts(toValue(offsetDate))

  const yearButton = (
    { $date, disabled, selected, active }: DPYear,
    { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
  ) =>
    createPropGetter(
      !!disabledProps || disabled,
      evt => callAll(onClick, skipFirst(setDPOffset(dpState)))(evt, $date),
      {
        ...rest,
        tabIndex: active ? 0 : -1,
      },
      selected,
    )

  const nextYearsButton = ({ onClick, disabled, ...rest }: DPPropsGetterConfig = {}) => {
    const endYearDate = newDate(state.value.offsetYear + toValue(numberOfYears) - 1, M, D)
    const isDisabled
        = !!disabled
          || maxDateAndAfter(maxDate, endYearDate)
          || (isExactMode(mode) && !!maxDate && isSame(maxDate, endYearDate))

    return createPropGetter(
      isDisabled,
      evt =>
        callAll(
          onClick,
          skipAll(() => setYear(state.value.offsetYear + step)),
        )(evt),
      rest,
    )
  }

  const previousYearsButton = ({ onClick, disabled, ...rest }: DPPropsGetterConfig = {}) => {
    const isDisabled
        = !!disabled || minDateAndBefore(minDate, newDate(state.value.offsetYear, M, D))

    return createPropGetter(
      isDisabled,
      evt =>
        callAll(
          onClick,
          skipAll(() => setYear(state.value.offsetYear - step)),
        )(evt),
      rest,
    )
  }

  return {
    yearButton,
    nextYearsButton,
    previousYearsButton,
  }
}
