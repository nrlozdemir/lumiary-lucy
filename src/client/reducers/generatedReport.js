/*
 *
 * GeneratedReport reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  // Generated report
  LOAD_GENERATED_REPORT: 'GeneratedReport/LOAD_GENERATED_REPORT',
  LOAD_GENERATED_REPORT_SUCCESS:
    'GeneratedReport/LOAD_GENERATED_REPORT_SUCCESS',
  LOAD_GENERATED_REPORT_ERROR: 'GeneratedReport/LOAD_GENERATED_REPORT_ERROR',
  SET_GENERATED_REPORT_COMPETITOR_SELECTED_VIDEO:
    'GeneratedReport/SET_GENERATED_REPORT_COMPETITOR_SELECTED_VIDEO',

  GET_PACING_CARD_DATA: 'GeneratedReport/GET_PACING_CARD_DATA',
  GET_PACING_CARD_DATA_SUCCESS: 'GeneratedReport/GET_PACING_CARD_DATA_SUCCESS',
  GET_PACING_CARD_DATA_ERROR: 'GeneratedReport/GET_PACING_CARD_DATA_ERROR',
}
export const actions = {
  // LOAD GENERATED REPORT
  loadGeneratedReport: () => ({ type: types.LOAD_GENERATED_REPORT }),
  loadGeneratedReportSuccess: (payload) => ({
    type: types.LOAD_GENERATED_REPORT_SUCCESS,
    payload,
  }),
  loadGeneratedReportError: (error) => ({
    type: types.LOAD_GENERATED_REPORT,
    error,
  }),
  setSelectedVideo: (payload) => ({
    type: types.SET_GENERATED_REPORT_COMPETITOR_SELECTED_VIDEO,
    payload,
  }),

  getPacingCardData: (data) => ({
    type: types.GET_PACING_CARD_DATA,
    data,
  }),
  getPacingCardDataSuccess: (payload) => ({
    type: types.GET_PACING_CARD_DATA_SUCCESS,
    payload,
  }),
  getPacingCardDataError: (error) => ({
    type: types.GET_PACING_CARD_DATA_ERROR,
    error,
  }),
}
export const initialState = fromJS({
  data: {},
  error: false,
  loading: false,
  selectedVideo: null,

  pacingChartData: {
    data: {},
    loading: false,
    error: null,
  },
})

const generatedReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    /** START load generated report */
    case types.LOAD_GENERATED_REPORT:
      return state.set('loading', fromJS(true))

    case types.LOAD_GENERATED_REPORT_SUCCESS:
      return state
        .set('data', fromJS(action.payload))
        .set('selectedVideo', fromJS(action.payload.topPerformingVideos[0]))
        .set('loading', fromJS(false))

    case types.LOAD_GENERATED_REPORT_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))
    /** END load generated report */
    case types.SET_GENERATED_REPORT_COMPETITOR_SELECTED_VIDEO:
      return state.set('selectedVideo', fromJS(action.payload))

    case types.GET_PACING_CARD_DATA:
      return state.setIn(['pacingChartData', 'loading'], fromJS(true))

    case types.GET_PACING_CARD_DATA_SUCCESS:
      const { stadiumData, horizontalStackedBarData } = action.payload

      return state
        .setIn(
          ['pacingChartData', 'data'],
          fromJS({
            stadiumData,
            horizontalStackedBarData,
          })
        )
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_PACING_CARD_DATA_ERROR:
      return state
        .setIn(['pacingChartData', 'error'], fromJS(action.error))
        .setIn(['pacingChartData', 'loading'], fromJS(false))
    default:
      return state
  }
}

export const selectGeneratedReport = (state) => state.GeneratedReport

export const makeSelectGeneratedReport = () =>
  createSelector(
    selectGeneratedReport,
    (substate) => substate.toJS()
  )

export const selectPacingChartData = (state) =>
  state.GeneratedReport.get('pacingChartData')

export const makeSelectReportsPacingCard = () =>
  createSelector(
    selectPacingChartData,
    (substate) => substate.toJS()
  )

export default generatedReportsReducer
