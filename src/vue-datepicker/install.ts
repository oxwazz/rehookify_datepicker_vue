import type { App, InjectionKey, Plugin, Ref } from 'vue'
import type { DPReducerState } from '../datepicker-core/types'
import { ref } from 'vue'

// Define proper types for provided values
interface LocationService {
  location: Ref<string>
  updateLocation: () => void
}

// Define proper types for provided values
interface DateService {
  focusDate: Ref<DPReducerState['focusDate']>
  offsetDate: Ref<Date>
  rangeEnd: Ref<DPReducerState['rangeEnd']>
  offsetYear: Ref<number>
  setFocus: (date: DPReducerState['focusDate']) => void
  setOffset: (date: Date) => void
  setRangeEnd: (date: DPReducerState['rangeEnd']) => void
  setYear: (year: number) => void
}

// Use injection keys for better type safety
const LocationServiceKey: InjectionKey<LocationService> = Symbol('location')
const DateKey: InjectionKey<DateService> = Symbol('date')

const datePlugin: Plugin = {
  install(app: App): void {
    const location = ref('North Pole')
    function updateLocation(): void {
      location.value = 'South Pole'
    }

    const locationService: LocationService = {
      location,
      updateLocation,
    }

    const focusDate = ref<DPReducerState['focusDate']>(new Date())
    const offsetDate = ref<Date>(new Date())
    const rangeEnd = ref<DPReducerState['rangeEnd']>(new Date())
    const offsetYear = ref<number>(2019)

    function setFocus(date: DPReducerState['focusDate']): void {
      focusDate.value = date
    }

    function setOffset(date: Date): void {
      offsetDate.value = date
    }

    function setRangeEnd(date: DPReducerState['rangeEnd']): void {
      rangeEnd.value = date
    }

    function setYear(year: number): void {
      offsetYear.value = year
    }

    const dateService: DateService = {
      focusDate,
      offsetDate,
      rangeEnd,
      offsetYear,
      setFocus,
      setOffset,
      setRangeEnd,
      setYear,
    }

    app.provide(LocationServiceKey, locationService)
    app.provide(DateKey, dateService)
  },
}

export {
  DateKey,
  type DateService,
  type LocationService,
  LocationServiceKey,
}
export default datePlugin
