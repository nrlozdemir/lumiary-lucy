import expect from 'expect'
import {
  types,
  actions,
  panopticReducer,
  initialState,
} from 'Reducers/panoptic'
import { actionTester } from './utils'

describe('Panoptic Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
