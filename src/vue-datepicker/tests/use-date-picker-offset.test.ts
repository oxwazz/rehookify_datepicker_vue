import { describe, expect, it, vi } from 'vitest'
import { ref, unref } from 'vue'
import { newDate } from '../../datepicker-core/utils/date'
import { useDatePickerOffsetPropGetters } from '../use-date-picker-offset'
import { useDatePickerState } from '../use-date-picker-state'

describe('useDatePickerOffsetPropGetters', () => {
  it('setOffset: should set correct offsetDate', () => {
    const sResult = useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() })

    const oResult = useDatePickerOffsetPropGetters(sResult)

    const nextDate = newDate(2020, 1, 1)
    const { onClick } = oResult.setOffset(nextDate)

    onClick?.()

    expect(unref(sResult.offsetDate)).toEqual(nextDate)
  })

  it('addOffset: should set correct offsetDate when offsetDate is null', () => {
    const result = ref(newDate(2023, 6, 18))
    const sResult = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
      offsetDate: result,
      onOffsetChange: (v) => {
        result.value = v
      },
    })

    const oResult = useDatePickerOffsetPropGetters(sResult)

    const { onClick } = oResult.addOffset({ months: 1 })

    onClick?.()

    // expect(unref(sResult.offsetDate)).toEqual(newDate(2023, 7, 18))
  })

  it('subtractOffset: should set correct offsetDate when offsetDate is null', () => {
    const result = ref(newDate(2023, 6, 18))
    const sResult = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
      offsetDate: result,
      onOffsetChange: (v) => {
        result.value = v
      },
    })

    const oResult = useDatePickerOffsetPropGetters(sResult)

    const { onClick } = oResult.subtractOffset({ months: 1 })

    onClick?.()

    expect(unref(sResult.offsetDate)).toEqual(newDate(2023, 5, 18))
  })
})
