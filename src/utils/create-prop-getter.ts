import type { MouseEvent } from 'happy-dom'
import type { DPPropGetter, DPPropsGetterConfig } from '../types'

export function createPropGetter(isDisabled: boolean, action: (evt?: MouseEvent) => void, props: DPPropsGetterConfig = {}, selected = false): DPPropGetter {
  return {
    role: 'button',
    tabIndex: 0,
    ...(isDisabled
      ? {
          'disabled': true,
          'aria-disabled': true,
        }
      : {
          onClick(evt?: MouseEvent) {
            action(evt)
          },
        }),
    ...(selected ? { 'aria-selected': true } : {}),
    ...props,
  }
}
