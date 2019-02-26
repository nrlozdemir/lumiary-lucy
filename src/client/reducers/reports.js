/*
 *
 * Reports reducer
 *
 */

import { fromJS, toJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  LOAD_REPORTS: 'Reports/LOAD_REPORTS',
  LOAD_REPORTS_SUCCESS: 'Reports/LOAD_REPORTS_SUCCESS',
  LOAD_REPORTS_ERROR: 'Reports/LOAD_REPORTS_ERROR',

  LOAD_MORE_REPORTS: 'Reports/LOAD_MORE_REPORTS',
  LOAD_MORE_REPORTS_SUCCESS: 'Reports/LOAD_MORE_REPORTS_SUCCESS',
  LOAD_MORE_REPORTS_ERROR: 'Reports/LOAD_MORE_REPORTS_ERROR',

  DELETE_REPORT: 'Reports/LOAD_MORE_REPORT',
  DELETE_REPORT_SUCCESS: 'Reports/LOAD_MORE_REPORT_SUCCESS',
  DELETE_REPORT_ERROR: 'Reports/LOAD_MORE_REPORT_ERROR',
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

  // DELETE A REPORT
  loadDeleteReport: (id) => ({ type: types.DELETE_REPORT, payload: id }),
  loadDeleteReportSuccess: (payload) => ({
    type: types.DELETE_REPORT_SUCCESS,
    payload,
  }),
  loadDeleteReportError: (error) => ({
    type: types.DELETE_REPORT_ERROR,
    error,
  }),
}
export const initialState = fromJS({
  reports: [],
  error: false,
  loading: false,
})

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    /** START load reports */
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
    /** END load reports */

    /** START load more reports */
    case types.LOAD_MORE_REPORTS:
      return state.set('loading', fromJS(true))

    case types.LOAD_MORE_REPORTS_SUCCESS:
      return state
        .set(
          'reports',
          fromJS(state.get('reports').concat(fromJS(action.payload)))
        )
        .set('loading', fromJS(false))

    case types.LOAD_MORE_REPORTS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END load more reports */

    /** START delete a report */
    case types.DELETE_REPORT:
      return state.set('loading', fromJS(true))

    case types.DELETE_REPORT_SUCCESS: {
      return state
        .set(
          'reports',
          fromJS(
            state
              .get('reports')
              .filter((item) => item.toJS().id !== action.payload)
          )
        )
        .set('loading', fromJS(false))
    }
    case types.DELETE_REPORT_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END delete a report */

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
