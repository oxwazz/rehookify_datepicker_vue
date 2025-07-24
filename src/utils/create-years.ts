import type { DPDatesConfig, DPYear, DPYearsConfig } from '../types'
import { getDateParts, newDate } from './date'
import { isAfterMaxYear, isBeforeMinYear } from './predicates'

export function createYears(currentYear: number, offsetDate: Date, selectedDates: Date[], { numberOfYears }: DPYearsConfig, { minDate, maxDate }: DPDatesConfig): DPYear[] {
  const { Y, M, D } = getDateParts(offsetDate)
  const { Y: nY } = getDateParts(newDate())

  return Array.from({ length: numberOfYears })
    .fill(0)
    .map((_, i) => {
      const year = currentYear + i
      const $date = newDate(year, M, D)

      return {
        $date,
        active: Y === year,
        disabled:
          isBeforeMinYear(year, minDate) || isAfterMaxYear(year, maxDate),
        now: year === nY,
        selected: selectedDates.some(d => getDateParts(d).Y === year),
        year,
      }
    })
}
