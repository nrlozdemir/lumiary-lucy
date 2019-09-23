import expect from 'expect'
import {
  types,
  actions,
  generatedReportsReducer,
  initialState,
} from 'Reducers/generatedReport'
import { actionTester } from './utils'

describe('Generated Report Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
