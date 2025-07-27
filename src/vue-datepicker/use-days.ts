import type {
  DPDay,
  DPPropsGetterConfig,
  DPUseDays,
  DPUseDaysPropGetters,
} from '../datepicker-core/types'
import { computed } from 'vue'
import { callAll, skipFirst } from '../datepicker-core/utils/call-all'
import { isRange } from '../datepicker-core/utils/config'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import { formatDate, getCleanDate } from '../datepicker-core/utils/date'
import { getMultipleDates } from '../datepicker-core/utils/get-multiple-dates'
import { includeDate, isSame } from '../datepicker-core/utils/predicates'
import { setFocus, setRangeEnd as setRangeEndAction } from './state-reducer'

export const useDays: DPUseDays = ({ selectedDates, config: { locale } }) =>
  computed(() => ({
    selectedDates,
    formattedDates: selectedDates.map((d: Date) => formatDate(d, locale)),
  }))

export const useDaysPropGetters: DPUseDaysPropGetters = ({
  config,
  selectedDates,
}) => {
  const {
    onDatesChange,
    dates: { mode, toggle, selectSameDate },
  } = config

  const dayButton = (
    { $date, selected, disabled, active }: DPDay,
    { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
  ) =>
    createPropGetter(
      disabled || !!disabledProps,
      (evt) => {
        if (selected && !toggle) {
          selectedDates.forEach((d) => {
            if (isSame(getCleanDate(d), $date))
              setFocus(d)
          })

          // Handle case when user could select same date in range mode
          if (!isRange(mode) || !selectSameDate)
            return
        }
        if (isRange(mode) && selectedDates.length === 1) {
          setRangeEndAction(null)
        }
        callAll(
          onClick,
          skipFirst((d: Date) => {
            const nextSelectedDates = getMultipleDates(
              selectedDates,
              d,
              config.dates,
            )
            setFocus(
              includeDate(nextSelectedDates, d) ? d : undefined,
            )
            onDatesChange(nextSelectedDates)
          }),
        )(evt, $date)
      },
      {
        ...rest,
        ...(isRange(mode)
          && selectedDates.length === 1 && {
          onMouseEnter() {
            setRangeEndAction($date)
          },
        }),
        tabIndex: active ? 0 : -1,
      },
      selected,
    )

  return { dayButton }
}
