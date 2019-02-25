/*
 *
 * Reports reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  LOAD_REPORTS: 'Reports/LOAD_REPORTS',
  LOAD_REPORTS_SUCCESS: 'Reports/LOAD_REPORTS_SUCCESS',
  LOAD_REPORTS_ERROR: 'Reports/LOAD_REPORTS_ERROR',
}
export const actions = {
  loadReports: () => ({ type: types.LOAD_REPORTS }),
  loadReportsSuccess: (payload) => ({
    type: types.LOAD_REPORTS_SUCCESS,
    payload,
  }),
  loadReportsError: (error) => ({ type: types.LOAD_REPORTS, error }),
}
export const initialState = fromJS({
  reports: [],
  error: false,
  loading: false,
})

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_REPORTS:
      return state.set('loading', fromJS(true))

    case types.LOAD_REPORTS_SUCCESS:
      return state
        .set('reports', fromJS(action.payload))
        .set('loading', fromJS(false))

    case types.LOAD_REPORTS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    default:
      return state
  }
}

export const selectReports = (state) => state.Reports

export const makeSelectReports = () =>
  createSelector(
    selectReports,
    (substate) => substate.toJS()
  )

export default reportsReducer
