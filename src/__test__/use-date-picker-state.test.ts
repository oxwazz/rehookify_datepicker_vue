import { describe, expect, it, vi } from 'vitest'
import { INITIAL_STATE } from '../__mock__/initial-state'
import { useDatePickerState } from '../use-date-picker-state'

describe('useDatePickerState', () => {
  it('useDatePickerState should return correct initial state', () => {
    const result = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })

    expect({
      ...result.state,
      focusDate: result.state.focusDate.value,
      offsetDate: result.state.offsetDate.value,
      offsetYear: result.state.offsetYear.value,
      rangeEnd: result.state.rangeEnd.value,
    }).toEqual(INITIAL_STATE)
  })

  // TODO: fix soon
  // it('useDatePickerState should set offset correctly', () => {
  //   const result = useDatePickerState({
  //     selectedDates: [],
  //     onDatesChange: vi.fn(),
  //   })
  //
  //   const { dispatch } = result
  //   const { Y, M, D } = getDateParts(newDate())
  //   const d = newDate(Y + 1, M + 1, D)
  //
  //   setOffset(dispatch, d)
  //   expect(result.state.offsetDate).toEqual(d)
  //   expect(result.state.offsetYear).toBe(
  //     getCurrentYearPosition(Y + 1, result.config.years),
  //   )
  // })

  // TODO: fix soon
  // it('useDatePickerState should set offsetYear correctly', () => {
  //   const result = useDatePickerState({
  //     selectedDates: [],
  //     onDatesChange: vi.fn(),
  //   })
  //
  //   const { dispatch } = result
  //   const { Y } = getDateParts(newDate())
  //
  //   setYear(dispatch, Y + 10)
  //   expect(result.state.offsetYear).toBe(Y + 10)
  // })

  // TODO: fix soon
  // it('useDatePickerState should set rangeEnd correctly', () => {
  //   const result = useDatePickerState({
  //     selectedDates: [],
  //     onDatesChange: vi.fn(),
  //   })
  //
  //   const { dispatch } = result
  //   const d = newDate()
  //
  //   setRangeEnd(dispatch, d)
  //   expect(result.state.rangeEnd).toEqual(d)
  // })
})
