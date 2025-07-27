import { describe, expect, it, vi } from 'vitest'
import { ref, unref } from 'vue'
import { getCleanDate, newDate } from '../../datepicker-core/utils/date'
import { setDPOffset } from '../../datepicker-core/utils/offset'
import { INITIAL_STATE } from '../mocks/initial-state'
import { useDatePickerState } from '../use-date-picker-state'

describe('useDatePickerState', () => {
  it('useDatePickerState should return correct initial state', () => {
    const result = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })

    expect({
      ...result.state.value,
      focusDate: result.state.value.focusDate,
      offsetDate: result.state.value.offsetDate,
      offsetYear: result.state.value.offsetYear,
      rangeEnd: result.state.value.rangeEnd,
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

  describe('setDPOffset', () => {
    it('should set offset without onOffsetChange', () => {
      const d = getCleanDate(newDate(2022, 11, 11))
      const result = useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
      })

      setDPOffset(result)(d)
      expect(unref(result.offsetDate)).toEqual(d)
    })

    it('should set offset with onOffsetChange', () => {
      const d = getCleanDate(newDate(2022, 11, 11))
      const d1 = newDate()
      const offsetResult = ref(d1)
      const result = useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
        offsetDate: offsetResult,
        onOffsetChange: (v) => {
          offsetResult.value = v
        },
      })

      expect(result.offsetDate.value).toEqual(d1)

      setDPOffset(result)(d)

      expect(offsetResult.value).toEqual(d)
    })
  })
})
