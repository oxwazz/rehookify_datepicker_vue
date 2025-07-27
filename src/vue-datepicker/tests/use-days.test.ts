import { describe, expect, it, vi } from 'vitest'
import { formatDate, newDate } from '../../datepicker-core/utils/date'
import { useDatePickerState } from '../use-date-picker-state'
import { useDays } from '../use-days'

describe('useDays', () => {
  it('useDays should return correct selected and formatted dates', () => {
    const d1 = newDate(2022, 11, 9)
    const d2 = newDate(2022, 11, 11)
    const stateResult = useDatePickerState({
      onDatesChange: vi.fn(),
      selectedDates: [d1, d2],
    })

    const result = useDays(stateResult)

    const { locale } = stateResult.config

    expect(result.value.selectedDates).toEqual([d1, d2])
    expect(result.value.formattedDates).toEqual([
      formatDate(d1, locale),
      formatDate(d2, locale),
    ])
  })
})

// TODO: fix soon
// describe('useDaysPropGetters', () => {
//   it('dayButton should set date correctly', () => {
//     const state = ref<Date[]>([])
//     const stateResult = useDatePickerState({
//       selectedDates: state.value,
//       onDatesChange: v => state.value = v,
//     })
//
//     const calendarsResult = useCalendars(stateResult)
//
//     const dayButtonResult = useDaysPropGetters(stateResult)
//
//     const { onClick } = dayButtonResult.dayButton(
//       calendarsResult.value.calendars[0].days[11],
//     )
//
//     onClick?.()
//
//     expect(state.value).toEqual([
//       calendarsResult.value.calendars[0].days[11].$date,
//     ])
//   })
// })
