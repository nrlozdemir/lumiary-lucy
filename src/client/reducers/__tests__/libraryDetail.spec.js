import expect from 'expect'
import {
  types,
  actions,
  libraryDetailReducer,
  initialState,
} from 'Reducers/libraryDetail'
import { actionTester } from './utils'

describe('LibraryDetail Reducer', () => {
  describe('Actions', () => {
    actionTester(actions)
  })

  describe('Reducer', () => {})
})
