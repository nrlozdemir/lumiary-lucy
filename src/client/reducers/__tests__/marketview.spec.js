import expect from 'expect'
import {
  types,
  actions,
  marketviewReducer,
  initialState,
} from 'Reducers/marketview'
import { actionTester } from './utils'

describe('MarketView Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
