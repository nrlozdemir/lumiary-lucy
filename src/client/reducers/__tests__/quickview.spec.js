import expect from 'expect'
import {
  types,
  actions,
  quickviewReducer,
  initialState,
} from 'Reducers/audience'
import { actionTester } from './utils'

describe('QuickView Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
