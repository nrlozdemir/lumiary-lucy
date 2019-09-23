import expect from 'expect'
import {
  types,
  actions,
  audienceReducer,
  initialState,
} from 'Reducers/audience'
import { actionTester } from './utils'

describe('Audience Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
