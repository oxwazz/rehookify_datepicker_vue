import { describe, expect, it, vi } from 'vitest'

import { useDatePicker } from '../use-date-picker'
import { getDateParts, newDate } from '../utils/date'

describe('useDatePicker', () => {
  // TODO: wait provide inject
  // it('useDatePicker returns correct selectedDates with default config', () => {
  //   const state = ref<Date[]>([])
  //   const result = useDatePicker({
  //     selectedDates: state.value,
  //     onDatesChange: vi.fn(),
  //   })
  //
  //   const d1 = result.data.value.calendars[0].days[1]
  //   const d2 = result.data.value.calendars[0].days[2]
  //
  //   // Test date selection by clicking from propGetter
  //   result.propGetters.dayButton(d1).onClick?.()
  //   expect(state.value[0]).toBe(d1.$date)
  //
  //   // Test date selection by clicking from act
  //   result.propGetters.dayButton(d2).onClick?.()
  //   expect(state.value[0]).toBe(d2.$date)
  // })

  // TODO: wait provide inject
  // it('useDatePicker return correct selectDates with multiple mode and toggle', () => {
  //   const state = ref<Date[]>([])
  //   const result = useDatePicker({
  //     selectedDates: state.value,
  //     onDatesChange: vi.fn(),
  //     dates: {
  //       mode: 'multiple',
  //       toggle: true,
  //     },
  //   })
  //
  //   const d1 = result.data.value.calendars[0].days[1]
  //   const d2 = result.data.value.calendars[0].days[2]
  //
  //   // Test date selection by clicking from propGetter
  //   result.propGetters.dayButton(d1).onClick?.()
  //   expect(state.value[0]).toEqual([d1.$date])
  //
  //   // Test date selection by clicking from action
  //   result.propGetters.dayButton(d2).onClick?.()
  //   expect(state.value[0]).toEqual([d1.$date, d2.$date])
  //
  //   // Toggle first selected date
  //   result.propGetters.dayButton(d1).onClick?.()
  //   expect(state.value[0]).toEqual([d2.$date])
  //
  //   // Toggle second selected date
  //   result.propGetters.dayButton(d2).onClick?.()
  //   expect(state.value[0]).toEqual([])
  // })

  it.skip('useDatePicker: test edges with minDate and maxDate', () => {
    // For this test we will set min and max dates in the middle of the month
    // Since 9 and 11 are my favorite digit and number it will be 9-11 :)
    const NOW = newDate()
    const { Y, M } = getDateParts(NOW)
    const minDate = 9
    const maxDate = 11

    const result = useDatePicker({
      selectedDates: [],
      onDatesChange: vi.fn(),
      dates: {
        minDate: newDate(Y, M, minDate),
        maxDate: newDate(Y, M, maxDate),
      },
    })

    // Ensure that next month button is disabled
    expect(result.propGetters.addOffset({ months: 1 }).disabled).toBe(
      true,
    )
    expect(
      result.propGetters.subtractOffset({ months: 1 }).disabled,
    ).toBe(undefined)

    // Ensure that all months disabled expect current
    const enabledMonths = result.data.value.months.filter(
      ({ disabled }) => !disabled,
    )
    expect(enabledMonths.length).toBe(1)

    // Ensure that next/previous years buttons are disabled
    expect(result.propGetters.nextYearsButton().disabled).toBe(true)
    expect(result.propGetters.previousYearsButton().disabled).toBe(
      true,
    )

    // Ensure that all years disabled expect current
    const enabledYears = result.data.value.years.filter(
      ({ disabled }) => !disabled,
    )
    expect(enabledYears.length).toBe(1)

    // Ensure that we have only 3 enabled days
    // 9 10 and 11 of current month
    const enabledDays = result.data.value.calendars[0].days.filter(
      ({ disabled }) => !disabled,
    )
    expect(enabledDays.length).toBe(3)
    const [leftEdge] = result.data.value.calendars[0].days.filter(
      ({ $date }) => $date.getDate() === minDate - 1,
    )
    const [rightEdge] = result.data.value.calendars[0].days.filter(
      ({ $date }) => $date.getDate() === maxDate + 1,
    )

    // Ensure that buttons beyond range has no onCLick and disabled
    expect(result.propGetters.dayButton(leftEdge).onClick).toBeFalsy()
    expect(result.propGetters.dayButton(leftEdge).disabled).toBe(true)

    expect(result.propGetters.dayButton(rightEdge).onClick).toBeFalsy()
    expect(result.propGetters.dayButton(rightEdge).disabled).toBe(true)
  })
})
