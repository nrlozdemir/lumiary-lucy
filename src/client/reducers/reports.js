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

  LOAD_MORE_REPORTS: 'Reports/LOAD_MORE_REPORTS',
  LOAD_MORE_REPORTS_SUCCESS: 'Reports/LOAD_MORE_REPORTS_SUCCESS',
  LOAD_MORE_REPORTS_ERROR: 'Reports/LOAD_MORE_REPORTS_ERROR',
}
export const actions = {
  // LOAD REPORTS
  loadReports: () => ({ type: types.LOAD_REPORTS }),
  loadReportsSuccess: (payload) => ({
    type: types.LOAD_REPORTS_SUCCESS,
    payload,
  }),
  loadReportsError: (error) => ({ type: types.LOAD_MORE_REPORTS, error }),

  // LOAD MORE REPORTS
  loadMoreReports: () => ({ type: types.LOAD_MORE_REPORTS }),
  loadMoreReportsSuccess: (payload) => ({
    type: types.LOAD_MORE_REPORTS_SUCCESS,
    payload,
  }),
  loadMoreReportsError: (error) => ({ type: types.LOAD_MORE_REPORTS, error }),
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

    /** START load reports */
    case types.LOAD_REPORTS_SUCCESS:
      return state
        .set('reports', fromJS(action.payload))
        .set('loading', fromJS(false))

    case types.LOAD_REPORTS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.LOAD_MORE_REPORTS:
      return state.set('loading', fromJS(true))
    /** END load reports */

    /** START load more reports */
    case types.LOAD_MORE_REPORTS_SUCCESS:
      return state
        .set('reports', state.get('reports').concat(action.payload))
        .set('loading', fromJS(false))

    case types.LOAD_MORE_REPORTS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END load more reports */

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
