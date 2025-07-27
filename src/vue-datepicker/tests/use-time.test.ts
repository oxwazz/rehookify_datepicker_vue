import { describe, expect, it, vi } from 'vitest'
import { useDatePickerState } from '../use-date-picker-state'
import { useTime } from '../use-time'

describe('useTime', () => {
  it('should return correct time array', () => {
    const stateResult = useDatePickerState({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })

    const timeResult = useTime(stateResult)

    expect(timeResult.value.time.length).toBe(48)
  })
})

// TODO: fix soon
// describe('useTimePropGetters', () => {
//   it('timeButton should select time correctly', () => {
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
//     const timeResult = useTime(stateResult)
//
//     const timeButtonResult = useTimePropGetter(stateResult)
//
//     const { onClick } = dayButtonResult.dayButton(
//       calendarsResult.value.calendars[0].days[9],
//     )
//
//     onClick?.()
//
//     const t = timeResult.value.time[11]
//
//     const { onClick: onTimeClick } = timeButtonResult.timeButton(t)
//     onTimeClick?.()
//
//     expect(state.value).toEqual([t.$date])
//   })
// })
