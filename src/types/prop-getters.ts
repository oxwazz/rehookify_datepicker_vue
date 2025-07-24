import type { MouseEvent } from 'happy-dom'

export interface DPPropsGetterConfig extends Record<string, unknown> {
  onClick?: (evt?: MouseEvent, date?: Date) => void
  disabled?: boolean
}

export interface DPPropGetter extends Record<string, unknown> {
  'role': 'button'
  'tabIndex': number
  'disabled'?: boolean
  'aria-disabled'?: boolean
  'aria-selected'?: boolean
  'onClick'?: (evt?: MouseEvent) => void
}
