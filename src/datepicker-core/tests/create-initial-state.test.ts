import { describe, expect, it, vi } from 'vitest'

import { INITIAL_STATE } from '../../vue-datepicker/mocks/initial-state'
import { createConfig } from '../utils/config'
import { createInitialState } from '../utils/create-initial-state'

describe('createInitialState', () => {
  it('createInitialState should create correct state', () => {
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
    })
    const state = createInitialState(config)

    expect(state).toEqual(INITIAL_STATE)
  })
})
