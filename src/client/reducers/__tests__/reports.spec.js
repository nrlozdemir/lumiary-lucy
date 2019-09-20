import expect from 'expect'
import { types, actions, reportsReducer, initialState } from 'Reducers/reports'
import { actionTester } from './utils'

describe('Reports Reducer', () => {
  describe('Actions', () => {
    actionTester(actions, [
      {
        action: 'loadDeleteReport',
        payload: { id: 'hi', isGetAllReports: 'hi' },
        paramName: 'payload',
        actionFunc: actions.loadDeleteReport('hi', 'hi')
      },
      {
        action: 'brandInsightFormSubmit',
        payload: { params: 'lol123', onlySave: 'blabla' },
        paramName: 'payload',
        actionFunc: actions.brandInsightFormSubmit('lol123', 'blabla')
      },
         {
        action: 'compareBrandFormSubmit',
        payload: { params: 'lol123', onlySave: 'blabla' },
        paramName: 'payload',
        actionFunc: actions.compareBrandFormSubmit('lol123', 'blabla')
      },
    ])
  })

  describe('Reducer', () => {})
})
