import { describe, expect, it, vi } from 'vitest'
import { createYears } from '../../datepicker-core/utils/create-years'
import { useDatePickerState } from '../use-date-picker-state'
import { useYears, useYearsPropGetters } from '../use-years'

describe('useYears', () => {
  it('useMonths should return correct years list', () => {
    const stateResult = useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() })
    const monthResult = useYears(stateResult)

    const {
      selectedDates,
      state: { offsetDate, offsetYear },
      config,
    } = stateResult
    const { years, dates } = config

    const calendarYears = createYears(
      offsetYear.value,
      offsetDate.value,
      selectedDates,
      years,
      dates,
    )

    expect(monthResult.value.years).toEqual(calendarYears)
  })
})

describe('useYearsPropGetters', () => {
  it('yearButton should set year correctly', () => {
    const stateResult = useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() })
    const yearsResult = useYears(stateResult)
    const yResult = useYearsPropGetters(stateResult)

    const nextYear = yearsResult.value.years[0].year
    const { onClick } = yResult.yearButton(
      yearsResult.value.years[0],
    )

    onClick?.()
    expect(stateResult.state.offsetDate.value.getFullYear()).toEqual(
      nextYear,
    )
  })

  // TODO: wait provide inject
  // it('previousYearsButton: should move years pagination one step backward', () => {
  //   const stateResult = useDatePickerState({
  //     selectedDates: [],
  //     onDatesChange: vi.fn(),
  //   })
  //   const { years } = stateResult.config
  //   const yResult = useYearsPropGetters(stateResult)
  //
  //   const currentYear = stateResult.state.offsetYear
  //
  //   const { onClick } = yResult.previousYearsButton()
  //
  //   onClick?.()
  //   expect(stateResult.state.offsetYear).toEqual(
  //     currentYear.value - years.step,
  //   )
  // })

  // TODO: wait provide inject
  // it('nextYearsButton: should move years pagination step forward', () => {
  //   const stateResult = useDatePickerState({
  //     selectedDates: [],
  //     onDatesChange: vi.fn(),
  //   })
  //   const { years } = stateResult.config
  //   const yResult = useYearsPropGetters(stateResult)
  //
  //   const currentYear = stateResult.state.offsetYear
  //
  //   const { onClick } = yResult.nextYearsButton()
  //
  //   onClick?.()
  //   expect(stateResult.state.offsetYear).toEqual(
  //     currentYear.value + years.step,
  //   )
  // })
})
