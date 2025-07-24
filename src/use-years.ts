import type {
  DPPropsGetterConfig,
  DPUseYears,
  DPUseYearsPropGetters,
  DPYear,
} from './types'
import { computed, toValue } from 'vue'
import { setYear } from './state-reducer'
import { callAll, skipAll, skipFirst } from './utils/call-all'
import { createPropGetter } from './utils/create-prop-getter'
import { createYears } from './utils/create-years'
import { getDateParts, newDate } from './utils/date'
import { isExactMode } from './utils/get-current-year-position'
import { setDPOffset } from './utils/offset'
import { isSame, maxDateAndAfter, minDateAndBefore } from './utils/predicates'

export const useYears: DPUseYears = ({
  selectedDates,
  offsetDate,
  state: { offsetYear },
  config: { years, dates },
}) => {
  return computed(() => ({
    years: createYears(toValue(offsetYear), toValue(offsetDate), selectedDates, years, dates),
  }))
}

export const useYearsPropGetters: DPUseYearsPropGetters = (dpState) => {
  const {
    offsetDate,
    state: { offsetYear },
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
    const endYearDate = newDate(toValue(offsetYear) + toValue(numberOfYears) - 1, M, D)
    const isDisabled
        = !!disabled
          || maxDateAndAfter(maxDate, endYearDate)
          || (isExactMode(mode) && !!maxDate && isSame(maxDate, endYearDate))

    return createPropGetter(
      isDisabled,
      evt =>
        callAll(
          onClick,
          skipAll(() => setYear(toValue(offsetYear) + step)),
        )(evt),
      rest,
    )
  }

  const previousYearsButton = ({ onClick, disabled, ...rest }: DPPropsGetterConfig = {}) => {
    const isDisabled
        = !!disabled || minDateAndBefore(minDate, newDate(toValue(offsetYear), M, D))

    return createPropGetter(
      isDisabled,
      evt =>
        callAll(
          onClick,
          skipAll(() => setYear(toValue(offsetYear) - step)),
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
