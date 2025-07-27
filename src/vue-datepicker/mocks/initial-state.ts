import { vi } from 'vitest'

import { createConfig } from '../../datepicker-core/utils/config'
import { getCleanDate, getDateParts, newDate } from '../../datepicker-core/utils/date'
import { getCurrentYearPosition } from '../../datepicker-core/utils/get-current-year-position'

const config = createConfig({
  selectedDates: [],
  onDatesChange: vi.fn(),
})

export const INITIAL_STATE = {
  focusDate: undefined,
  rangeEnd: null,
  offsetDate: getCleanDate(newDate()),
  offsetYear: getCurrentYearPosition(
    getDateParts(getCleanDate(newDate())).Y,
    config.years,
  ),
}
