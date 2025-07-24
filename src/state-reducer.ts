import type {
  DPReducerState,
} from './types'
import { inject } from 'vue'
import { DateKey } from './install'

// const SET_FOCUS_DATE_ACTION = 'SET_FOCUS_DATE' as const
// const SET_OFFSET_DATE_ACTION = 'SET_OFFSET_DATE' as const
// const SET_RANGE_END_ACTION = 'SET_RANGE_END' as const
// const SET_YEAR_ACTION = 'SET_YEAR' as const

// export const stateReducer = (
//   state: DPReducerState,
//   action: DPReducerAction,
// ): DPReducerState => {
//   switch (action.type) {
//     case SET_FOCUS_DATE_ACTION:
//       return {
//         ...state,
//         focusDate: action.date,
//       }
//     case SET_OFFSET_DATE_ACTION:
//       return {
//         ...state,
//         offsetDate: action.date,
//       }
//     case SET_RANGE_END_ACTION:
//       return {
//         ...state,
//         rangeEnd: action.date,
//       }
//     case SET_YEAR_ACTION:
//       return {
//         ...state,
//         offsetYear: action.year,
//       }
//     default:
//       return state
//   }
// }

export function setFocus(
  // dispatch: Dispatch<DPSetFocusDate>,
  date: DPReducerState['focusDate'],
): void {
  const { setFocus } = inject(DateKey)!
  setFocus(date)
}

export function setOffset(
  // dispatch: Dispatch<DPSetOffsetDate>,
  date: Date,
): void {
  const { setOffset } = inject(DateKey)!
  setOffset(date)
}

export function setRangeEnd(
  // dispatch: Dispatch<DPSetRangeEndAction>,
  date: DPReducerState['rangeEnd'],
): void {
  const { setRangeEnd } = inject(DateKey)!
  setRangeEnd(date)
}

export function setYear(
  // dispatch: Dispatch<DPSetYearAction>,
  year: number,
): void {
  const { setYear } = inject(DateKey)!
  setYear(year)
}
