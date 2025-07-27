import type { DPDayInteger } from './day'

export type DPDatePart = 'year' | 'month' | 'date'
export interface DPDateParts {
  D: number
  M: number
  Y: number
}

export type DPDatesMode = 'single' | 'multiple' | 'range'

export interface DPDateExclude {
  day?: DPDayInteger[]
  date?: Date[]
}
