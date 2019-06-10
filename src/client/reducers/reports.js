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

  PREDEFINED_REPORT_REQUEST: 'Reports/PREDEFINED_REPORT_REQUEST',
  PREDEFINED_REPORT_REQUEST_SUCCESS:
    'Reports/PREDEFINED_REPORT_REQUEST_SUCCESS',
  PREDEFINED_REPORT_REQUEST_ERROR: 'Reports/PREDEFINED_REPORT_REQUEST_ERROR',

  PREDEFINED_REPORT_CHART_REQUEST: 'Reports/PREDEFINED_REPORT_CHART_REQUEST',
  PREDEFINED_REPORT_CHART_REQUEST_SUCCESS:
    'Reports/PREDEFINED_REPORT_CHART_REQUEST:SUCCESS',
  PREDEFINED_REPORT_CHART_REQUEST_ERROR:
    'Reports/PREDEFINED_REPORT_CHART_REQUEST:ERROR',

  GET_CONTENT_VITALITY_SCORE_DATA: 'Reports/GET_CONTENT_VITALITY_SCORE_DATA',
  GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS:
    'Reports/GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS',
  GET_CONTENT_VITALITY_SCORE_DATA_ERROR:
    'Reports/GET_CONTENT_VITALITY_SCORE_DATA_ERROR',

  LOAD_VIDEO_COMPARISON_DATA: 'Reports/LOAD_VIDEO_COMPARISON_DATA',
  LOAD_VIDEO_COMPARISON_DATA_SUCCESS:
    'Reports/LOAD_VIDEO_COMPARISON_DATA_SUCCESS',
  LOAD_VIDEO_COMPARISON_DATA_ERROR: 'Reports/LOAD_VIDEO_COMPARISON_DATA_ERROR',

  LOAD_PERFORMANCE_COMPARISON_DATA: 'Reports/LOAD_PERFORMANCE_COMPARISON_DATA',
  LOAD_PERFORMANCE_COMPARISON_DATA_SUCCESS:
    'Reports/LOAD_PERFORMANCE_COMPARISON_DATA_SUCCESS',
  LOAD_PERFORMANCE_COMPARISON_DATA_ERROR:
    'Reports/LOAD_PERFORMANCE_COMPARISON_DATA_ERROR',

  LOAD_COLOR_COMPARISON_DATA: 'Reports/LOAD_COLOR_COMPARISON_DATA',
  LOAD_COLOR_COMPARISON_DATA_SUCCESS:
    'Reports/LOAD_COLOR_COMPARISON_DATA_SUCCESS',
  LOAD_COLOR_COMPARISON_DATA_ERROR: 'Reports/LOAD_COLOR_COMPARISON_DATA_ERROR',
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
  predefinedReportRequest: (payload) => ({
    type: types.PREDEFINED_REPORT_REQUEST,
    payload,
  }),
  predefinedReportRequestSuccess: (payload) => ({
    type: types.PREDEFINED_REPORT_REQUEST_SUCCESS,
    payload,
  }),
  predefinedReportRequestError: (error) => ({
    type: types.PREDEFINED_REPORT_REQUEST_ERROR,
    error,
  }),

  getContentVitalityScoreData: (payload) => ({
    type: types.GET_CONTENT_VITALITY_SCORE_DATA,
    payload,
  }),
  getContentVitalityScoreDataSuccess: (payload) => ({
    type: types.GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS,
    payload,
  }),
  getContentVitalityScoreDataError: (error) => ({
    type: types.GET_CONTENT_VITALITY_SCORE_DATA_ERROR,
    error,
  }),

  getVideoComparisonData: (data) => ({
    type: types.LOAD_VIDEO_COMPARISON_DATA,
    data,
  }),
  getVideoComparisonDataSuccess: (payload) => ({
    type: types.LOAD_VIDEO_COMPARISON_DATA_SUCCESS,
    payload,
  }),
  getVideoComparisonDataError: (error) => ({
    type: types.LOAD_VIDEO_COMPARISON_DATA_ERROR,
    error,
  }),

  getPerformanceComparisonData: (data) => ({
    type: types.LOAD_PERFORMANCE_COMPARISON_DATA,
    data,
  }),
  getPerformanceComparisonDataSuccess: (payload) => ({
    type: types.LOAD_PERFORMANCE_COMPARISON_DATA_SUCCESS,
    payload,
  }),
  getPerformanceComparisonDataError: (error) => ({
    type: types.LOAD_PERFORMANCE_COMPARISON_DATA_ERROR,
    error,
  }),

  getColorComparisonData: (data) => ({
    type: types.LOAD_COLOR_COMPARISON_DATA,
    data,
  }),
  getColorComparisonDataSuccess: (payload) => ({
    type: types.LOAD_COLOR_COMPARISON_DATA_SUCCESS,
    payload,
  }),
  getColorComparisonDataError: (error) => ({
    type: types.LOAD_COLOR_COMPARISON_DATA_ERROR,
    error,
  }),

  getPredefinedReportChartData: (data) => ({
    type: types.PREDEFINED_REPORT_CHART_REQUEST,
    payload: data,
  }),
}
export const initialState = fromJS({
  reports: {
    data: [],
    error: false,
    loading: false,
  },
  brandInsightValues: {
    data: null,
    error: false,
    loading: false,
  },
  contentVitalityScoreData: {
    data: [],
    error: false,
    loading: false,
  },
  comparebrandValues: {
    data: null,
    error: false,
    loading: false,
  },
  predefinedReportValues: {
    data: null,
    chartData: null,
    error: false,
    loading: false,
  },
  videoComparisonData: {
    data: null,
    error: false,
    loading: false,
  },
  performanceComparisonData: {
    data: null,
    error: false,
    loading: false,
  },
  colorComparisonData: {
    data: [],
    error: false,
    loading: false,
  },
})

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    /** START load reports */
    case types.LOAD_REPORTS:
      return state.setIn(['reports', 'loading'], fromJS(true))

    case types.LOAD_REPORTS_SUCCESS:
      return state
        .setIn(['reports', 'data'], fromJS(action.payload))
        .setIn(['reports', 'loading'], fromJS(false))

    case types.LOAD_REPORTS_ERROR:
      return state
        .setIn(['reports', 'error'], fromJS(action.error))
        .setIn(['reports', 'loading'], fromJS(false))
    /** END load reports */

    /** START load more reports */
    case types.LOAD_MORE_REPORTS:
      return state.setIn(['reports', 'loading'], fromJS(true))

    case types.LOAD_MORE_REPORTS_SUCCESS:
      return state
        .setIn(
          ['reports', 'data'],
          fromJS(
            state.getIn(['reports', 'data']).concat(fromJS(action.payload))
          )
        )
        .setIn(['reports', 'loading'], fromJS(false))

    case types.LOAD_MORE_REPORTS_ERROR:
      return state
        .setIn(['reports', 'error'], fromJS(action.error))
        .setIn(['reports', 'loading'], fromJS(false))
    /** END load more reports */

    /** START delete a report */
    case types.DELETE_REPORT:
      return state.setIn(['reports', 'loading'], fromJS(true))

    case types.DELETE_REPORT_SUCCESS: {
      return state
        .setIn(
          ['reports', 'data'],
          fromJS(
            state
              .getIn(['reports', 'data'])
              .filter((item) => item.toJS().id !== action.payload)
          )
        )
        .setIn(['reports', 'loading'], fromJS(false))
    }
    case types.DELETE_REPORT_ERROR:
      return state
        .setIn(['reports', 'error'], fromJS(action.error))
        .setIn(['reports', 'loading'], fromJS(false))
    /** END delete a report */

    /** START submit brand insight form */
    case types.BRAND_INSIGHT_REQUEST:
      return state.setIn(['brandInsightValues', 'loading'], fromJS(true))

    case types.BRAND_INSIGHT_REQUEST_SUCCESS: {
      return state
        .setIn(['brandInsightValues', 'data'], fromJS(action.payload))
        .setIn(['brandInsightValues', 'loading'], fromJS(false))
    }
    case types.BRAND_INSIGHT_REQUEST_ERROR:
      return state
        .setIn(['brandInsightValues', 'error'], fromJS(action.error))
        .setIn(['brandInsightValues', 'loading'], fromJS(false))
    /** END submit brand insight form */

    /** START submit brand insight form */
    case types.COMPARE_BRAND_REQUEST:
      return state.setIn(['comparebrandValues', 'loading'], fromJS(true))

    case types.COMPARE_BRAND_REQUEST_SUCCESS: {
      return state
        .setIn(['comparebrandValues', 'data'], fromJS(action.payload))
        .setIn(['comparebrandValues', 'loading'], fromJS(false))
    }
    case types.COMPARE_BRAND_REQUEST_ERROR:
      return state
        .setIn(['comparebrandValues', 'error'], fromJS(action.error))
        .setIn(['comparebrandValues', 'loading'], fromJS(false))
    /** END submit brand insight form */

    /** START Predefined Report form */
    case types.PREDEFINED_REPORT_REQUEST:
      return state.setIn(['predefinedReportValues', 'loading'], fromJS(true))

    case types.PREDEFINED_REPORT_REQUEST_SUCCESS: {
      return state
        .setIn(['predefinedReportValues', 'data'], fromJS(action.payload))
        .setIn(['predefinedReportValues', 'loading'], fromJS(false))
    }
    case types.PREDEFINED_REPORT_REQUEST_ERROR:
      return state
        .setIn(['predefinedReportValues', 'error'], fromJS(action.error))
        .setIn(['predefinedReportValues', 'loading'], fromJS(false))

    case types.PREDEFINED_REPORT_REQUEST:
      return state
    // return state.setIn([
    //   'predefinedReportValues',
    //   'chartData',
    //   fromJS({
    //     ...state.predefinedReportValues.chartData,
    //     ...action.payload,
    //   }),
    // ])

    case types.PREDEFINED_REPORT_CHART_REQUEST_SUCCESS:
      return state

    case types.PREDEFINED_REPORT_REQUEST_ERROR:
      return state
    /** END Predefined Report form */

    /** START video comparison data */
    case types.LOAD_VIDEO_COMPARISON_DATA:
      return state.setIn(['videoComparisonData', 'loading'], fromJS(true))

    case types.LOAD_VIDEO_COMPARISON_DATA_SUCCESS: {
      return state
        .setIn(['videoComparisonData', 'data'], fromJS(action.payload))
        .setIn(['videoComparisonData', 'loading'], fromJS(false))
    }
    case types.LOAD_VIDEO_COMPARISON_DATA_ERROR:
      return state
        .setIn(['videoComparisonData', 'error'], fromJS(action.error))
        .setIn(['videoComparisonData', 'loading'], fromJS(false))
    /** END video comparison data */

    /** START content vitality score data */
    case types.GET_CONTENT_VITALITY_SCORE_DATA:
      return state.setIn(['contentVitalityScoreData', 'loading'], fromJS(true))

    case types.GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS: {
      return state
        .setIn(['contentVitalityScoreData', 'data'], fromJS(action.payload))
        .setIn(['contentVitalityScoreData', 'loading'], fromJS(false))
    }
    case types.GET_CONTENT_VITALITY_SCORE_DATA_ERROR:
      return state
        .setIn(['contentVitalityScoreData', 'error'], fromJS(action.error))
        .setIn(['contentVitalityScoreData', 'loading'], fromJS(false))
    /** END content vitality score data */

    /** START load performance comparison data */
    case types.LOAD_PERFORMANCE_COMPARISON_DATA:
      return state.setIn(['performanceComparisonData', 'loading'], fromJS(true))

    case types.LOAD_PERFORMANCE_COMPARISON_DATA_SUCCESS: {
      return state
        .setIn(['performanceComparisonData', 'data'], fromJS(action.payload))
        .setIn(['performanceComparisonData', 'loading'], fromJS(false))
    }
    case types.LOAD_PERFORMANCE_COMPARISON_DATA_ERROR:
      return state
        .setIn(['performanceComparisonData', 'error'], fromJS(action.error))
        .setIn(['performanceComparisonData', 'loading'], fromJS(false))
    /** END load performance comparison data */

    /** START load color comparison data */
    case types.LOAD_COLOR_COMPARISON_DATA:
      return state.setIn(['colorComparisonData', 'loading'], fromJS(true))

    case types.LOAD_COLOR_COMPARISON_DATA_SUCCESS: {
      return state
        .setIn(['colorComparisonData', 'data'], fromJS(action.payload))
        .setIn(['colorComparisonData', 'loading'], fromJS(false))
    }
    case types.LOAD_COLOR_COMPARISON_DATA_ERROR:
      return state
        .setIn(['colorComparisonData', 'error'], fromJS(action.error))
        .setIn(['colorComparisonData', 'loading'], fromJS(false))
    /** END load color comparison data */

    default:
      return state
  }
}

// export const selectReports = (state) => state.Reports
//
// export const makeSelectReports = () =>
//   createSelector(
//     selectReports,
//     (substate) => substate.toJS()
//   )

const selectReportsDomain = (state) => state.Reports.get('reports')

export const makeSelectReports = () =>
  createSelector(
    selectReportsDomain,
    (substate) => substate.toJS()
  )

const selectReportsVideoComparisonDomain = (state) =>
  state.Reports.get('videoComparisonData')

export const makeSelectReportsVideoComparison = () =>
  createSelector(
    selectReportsVideoComparisonDomain,
    (substate) => substate.toJS()
  )

const selectReportsContentVitalityScoreDomain = (state) =>
  state.Reports.get('contentVitalityScoreData')

export const makeSelectReportsContentVitalityScore = () =>
  createSelector(
    selectReportsContentVitalityScoreDomain,
    (substate) => substate.toJS()
  )

const selectReportsPerformanceComparisonDomain = (state) =>
  state.Reports.get('performanceComparisonData')

export const makeSelectReportsPerformanceComparison = () =>
  createSelector(
    selectReportsPerformanceComparisonDomain,
    (substate) => substate.toJS()
  )

const selectReportsColorComparisonDomain = (state) =>
  state.Reports.get('colorComparisonData')

export const makeSelectReportsColorComparison = () =>
  createSelector(
    selectReportsColorComparisonDomain,
    (substate) => substate.toJS()
  )

const selectReportsBrandInsightValues = (state) =>
  state.Reports.get('brandInsightValues')

export const makeSelectReportsBrandInsightValues = () =>
  createSelector(
    selectReportsBrandInsightValues,
    (substate) => substate.toJS()
  )

const selectReportsComparebrandValues = (state) =>
  state.Reports.get('comparebrandValues')

export const makeSelectReportsComparebrandValues = () =>
  createSelector(
    selectReportsComparebrandValues,
    (substate) => substate.toJS()
  )

const selectReportsPredefinedReportValues = (state) =>
  state.Reports.get('predefinedReportValues')

export const makeSelectReportsPredefinedReportValues = () =>
  createSelector(
    selectReportsPredefinedReportValues,
    (substate) => substate.toJS()
  )

export default reportsReducer
