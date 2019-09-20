import expect from 'expect'
import {
  types,
  actions,
  audienceReducer,
  initialState,
} from 'Reducers/auth'
import { actionTester } from './utils'

describe('Auth Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
