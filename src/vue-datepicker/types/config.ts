import type { MaybeRef } from 'vue'
import type {
  DPCalendarConfig,
  DPDatesConfig,
  DPExcludeConfig,
  DPLocaleConfig,
  DPTimeConfig,
  DPYearsConfig,
} from '../../datepicker-core/types'

export interface DPUserConfig {
  calendar?: Partial<DPCalendarConfig>
  dates?: Partial<DPDatesConfig>
  exclude?: DPExcludeConfig
  focusDate?: Date
  locale?: Partial<DPLocaleConfig>
  offsetDate?: MaybeRef<Date>
  onOffsetChange?: (d: Date) => void
  onDatesChange: (d: Date[]) => void
  selectedDates: Date[]
  time?: Partial<DPTimeConfig>
  years?: Partial<DPYearsConfig>
}
