import { describe, expect, it, vi } from 'vitest'
import { createMonths } from '../../datepicker-core/utils/create-months'
import { useDatePickerState } from '../use-date-picker-state'
import { useMonths, useMonthsPropGetters } from '../use-months'

// Test Month data
describe('useMonths', () => {
  it('useMonths should return correct months list', () => {
    const stateResult = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })

    const monthResult = useMonths(stateResult)

    const {
      selectedDates,
      state,
      config: { locale, dates },
    } = stateResult

    const months = createMonths(
      state.value.offsetDate,
      selectedDates,
      locale,
      dates,
    )

    expect(monthResult.value.months).toEqual(months)
  })
})

// Test Month prop-getters
describe('useMonthPropGetters', () => {
  it('monthButton should set months correctly', () => {
    const stateResult = useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() })

    const monthResult = useMonths(stateResult)

    const mResult = useMonthsPropGetters(stateResult)

    const { onClick } = mResult.monthButton(
      monthResult.value.months[0],
    )

    onClick?.()
    expect(stateResult.state.value.offsetDate.getMonth()).toEqual(
      monthResult.value.months[0].$date.getMonth(),
    )
  })
})
