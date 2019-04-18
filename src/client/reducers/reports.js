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

  DELETE_REPORT: 'Reports/DELETE_REPORT',
  DELETE_REPORT_SUCCESS: 'Reports/DELETE_REPORT_SUCCESS',
  DELETE_REPORT_ERROR: 'Reports/DELETE_REPORT_ERROR',

  BRAND_INSIGHT_REQUEST: 'Reports/BRAND_INSIGHT_REQUEST',
  BRAND_INSIGHT_REQUEST_SUCCESS: 'Reports/BRAND_INSIGHT_REQUEST_SUCCESS',
  BRAND_INSIGHT_REQUEST_ERROR: 'Reports/BRAND_INSIGHT_REQUEST_ERROR',

  COMPARE_BRAND_REQUEST: 'Reports/COMPARE_BRAND_REQUEST',
  COMPARE_BRAND_REQUEST_SUCCESS: 'Reports/COMPARE_BRAND_REQUEST_SUCCESS',
  COMPARE_BRAND_REQUEST_ERROR: 'Reports/COMPARE_BRAND_REQUEST_ERROR',

  PREDEFINED_BRAND_REQUEST: 'Reports/PREDEFINED_BRAND_REQUEST',
  PREDEFINED_BRAND_REQUEST_SUCCESS: 'Reports/PREDEFINED_BRAND_REQUEST_SUCCESS',
  PREDEFINED_BRAND_REQUEST_ERROR: 'Reports/PREDEFINED_BRAND_REQUEST_ERROR',
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

  // SUBMIT NEW BRAND INSIGHT
  brandInsightFormSubmit: (values) => ({
    type: types.BRAND_INSIGHT_REQUEST,
    payload: values,
  }),
  brandInsightFormSubmitSuccess: (payload) => ({
    type: types.BRAND_INSIGHT_REQUEST_SUCCESS,
    payload,
  }),
  brandInsightFormSubmitError: (error) => ({
    type: types.BRAND_INSIGHT_REQUEST_ERROR,
    error,
  }),
  compareBrandFormSubmit: (values) => ({
    type: types.COMPARE_BRAND_REQUEST,
    payload: values,
  }),
  compareBrandFormSubmitSuccess: (payload) => ({
    type: types.COMPARE_BRAND_REQUEST_SUCCESS,
    payload,
  }),
  compareBrandFormSubmitError: (error) => ({
    type: types.COMPARE_BRAND_REQUEST_ERROR,
    error,
  }),
  predefinedReportFormSubmit: (values) => ({
    type: types.PREDEFINED_REPORT_REQUEST,
    payload: values,
  }),
  predefinedReportFormSubmitSuccess: (payload) => ({
    type: types.PREDEFINED_REPORT_REQUEST_SUCCESS,
    payload,
  }),
  predefinedReportFormSubmitError: (error) => ({
    type: types.PREDEFINED_REPORT_REQUEST_ERROR,
    error,
  }),
}
export const initialState = fromJS({
  reports: [],
  error: false,
  loading: false,
  brandInsightValues: null,
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

    /** START submit brand insight form */
    case types.BRAND_INSIGHT_REQUEST:
      return state.set('loading', fromJS(true))

    case types.BRAND_INSIGHT_REQUEST_SUCCESS: {
      return state
        .set('brandInsightValues', fromJS(action.payload))
        .set('loading', fromJS(false))
    }
    case types.BRAND_INSIGHT_REQUEST_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END submit brand insight form */

    /** START submit brand insight form */
    case types.COMPARE_BRAND_REQUEST:
      return state.set('loading', fromJS(true))

    case types.COMPARE_BRAND_REQUEST_SUCCESS: {
      return state
        .set('comparebrandValues', fromJS(action.payload))
        .set('loading', fromJS(false))
    }
    case types.COMPARE_BRAND_REQUEST_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END submit brand insight form */

    /** START submit brand insight form */
    case types.PREDEFINED_REPORT_REQUEST:
      return state.set('loading', fromJS(true))

    case types.PREDEFINED_REPORT_REQUEST_SUCCESS: {
      return state
        .set('predefinedReportValues', fromJS(action.payload))
        .set('loading', fromJS(false))
    }
    case types.PREDEFINED_REPORT_REQUEST_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END submit brand insight form */
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
