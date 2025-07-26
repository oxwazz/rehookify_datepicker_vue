import { describe, expect, it, vi } from 'vitest'
import { useDatePickerState } from '../use-date-picker-state'
import { useMonths, useMonthsPropGetters } from '../use-months'
import { createMonths } from '../utils/create-months'

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
      state: { offsetDate },
      config: { locale, dates },
    } = stateResult

    const months = createMonths(offsetDate.value, selectedDates, locale, dates)

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
    expect(stateResult.state.offsetDate.value.getMonth()).toEqual(
      monthResult.value.months[0].$date.getMonth(),
    )
  })
})
