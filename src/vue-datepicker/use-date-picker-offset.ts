import type {
  DPOffsetValue,
  DPPropsGetterConfig,
  DPState,
} from '../datepicker-core/types'
import type { DPUseDatePickerOffsetPropGetters } from './types'
import { toValue, unref } from 'vue'
import { callAll, skipFirst } from '../datepicker-core/utils/call-all'
import { createPropGetter } from '../datepicker-core/utils/create-prop-getter'
import {
  getEdgedOffsetDate,
  getNextOffsetDate,
  setDPOffset,
} from '../datepicker-core/utils/offset'
import { maxDateAndAfter, minDateAndBefore } from '../datepicker-core/utils/predicates'

export const useDatePickerOffsetPropGetters: DPUseDatePickerOffsetPropGetters
  = (state) => {
    const {
      config: { dates },
    } = state
    const { minDate, maxDate } = dates

    const state_: DPState = {
      ...state,
      state: unref(state.state),
      offsetDate: unref(state.offsetDate),
      dispatch: v => state.dispatch.value.offsetDate = v,
    }

    const addOffset = (
      offsetValue: DPOffsetValue,
      { disabled, onClick, ...rest }: DPPropsGetterConfig = {},
    ) => {
      const offsetDate = getEdgedOffsetDate(
        toValue(state.offsetDate),
        offsetValue,
        maxDate,
      )
      const nextDate = getNextOffsetDate(offsetDate, offsetValue)

      const isDisabled = !!disabled || maxDateAndAfter(maxDate, nextDate)

      return createPropGetter(
        isDisabled,
        evt =>
          callAll(onClick, skipFirst(setDPOffset(state_)))(evt, nextDate),
        rest,
      )
    }

    const subtractOffset = (
      { days = 0, months = 0, years = 0 }: DPOffsetValue,
      { disabled, onClick, ...rest }: DPPropsGetterConfig = {},
    ) => {
      const negativeOffsetValue = {
        days: -days,
        months: -months,
        years: -years,
      }

      const offsetDate = getEdgedOffsetDate(
        toValue(state.offsetDate),
        negativeOffsetValue,
        minDate,
      )
      const nextDate = getNextOffsetDate(offsetDate, negativeOffsetValue)

      const isDisabled = !!disabled || minDateAndBefore(minDate, nextDate)

      return createPropGetter(
        isDisabled,
        evt =>
          callAll(onClick, skipFirst(setDPOffset(state_)))(evt, nextDate),
        rest,
      )
    }

    const setOffset = (d: Date, { disabled, onClick, ...rest }: DPPropsGetterConfig = {}) => {
      const isDisabled
          = !!disabled
            || minDateAndBefore(minDate, d)
            || maxDateAndAfter(maxDate, d)

      return createPropGetter(
        isDisabled,
        evt => callAll(onClick, skipFirst(setDPOffset(state_)))(evt, d),
        rest,
      )
    }

    return {
      addOffset,
      setOffset,
      subtractOffset,
    }
  }
