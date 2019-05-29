import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  SET_GENERATED_SELECTED_VIDEO: 'GeneratedReport/SET_GENERATED_SELECTED_VIDEO',

  GET_PACING_CARD_DATA_REQUEST: 'GeneratedReport/GET_PACING_CARD_DATA_REQUEST',
  GET_PACING_CARD_DATA_SUCCESS: 'GeneratedReport/GET_PACING_CARD_DATA_SUCCESS',
  GET_PACING_CARD_DATA_FAILURE: 'GeneratedReport/GET_PACING_CARD_DATA_FAILURE',

  GET_TOP_VIDEOS_CARD_REQUEST: 'GeneratedReport/GET_TOP_VIDEOS_CARD_REQUEST',
  GET_TOP_VIDEOS_CARD_SUCCESS: 'GeneratedReport/GET_TOP_VIDEOS_CARD_SUCCESS',
  GET_TOP_VIDEOS_CARD_FAILURE: 'GeneratedReport/GET_TOP_VIDEOS_CARD_FAILURE',

  GET_TOP_PERFORMING_VIDEOS_REQUEST:
    'GeneratedReport/GET_TOP_PERFORMING_VIDEOS_REQUEST',
  GET_TOP_PERFORMING_VIDEOS_SUCCESS:
    'GeneratedReport/GET_TOP_PERFORMING_VIDEOS_SUCCESS',
  GET_TOP_PERFORMING_VIDEOS_FAILURE:
    'GeneratedReport/GET_TOP_PERFORMING_VIDEOS_FAILURE',

  GET_VIDEO_RELEASES_BAR_CHART_REQUEST:
    'GeneratedReport/GET_VIDEO_RELEASES_BAR_CHART_REQUEST',
  GET_VIDEO_RELEASES_BAR_CHART_SUCCESS:
    'GeneratedReport/GET_VIDEO_RELEASES_BAR_CHART_SUCCESS',
  GET_VIDEO_RELEASES_BAR_CHART_FAILURE:
    'GeneratedReport/GET_VIDEO_RELEASES_BAR_CHART_FAILURE',

  GET_COLOR_TEMP_DATA_REQUEST: 'GeneratedReport/GET_COLOR_TEMP_DATA_REQUEST',
  GET_COLOR_TEMP_DATA_SUCCESS: 'GeneratedReport/GET_COLOR_TEMP_DATA_SUCCESS',
  GET_COLOR_TEMP_DATA_FAILURE: 'GeneratedReport/GET_COLOR_TEMP_DATA_FAILURE',

  GET_FILTERING_SECTION_DATA_REQUEST:
    'GeneratedReport/GET_FILTERING_SECTION_DATA_REQUEST',
  GET_FILTERING_SECTION_DATA_SUCCESS:
    'GeneratedReport/GET_FILTERING_SECTION_DATA_SUCCESS',
  GET_FILTERING_SECTION_DATA_FAILURE:
    'GeneratedReport/GET_FILTERING_SECTION_DATA_FAILURE',
}
export const actions = {
  setSelectedVideo: (payload) => ({
    type: types.SET_GENERATED_SELECTED_VIDEO,
    payload,
  }),

  getPacingCardDataRequest: (data) => ({
    type: types.GET_PACING_CARD_DATA_REQUEST,
    data,
  }),
  getPacingCardDataSuccess: (payload) => ({
    type: types.GET_PACING_CARD_DATA_SUCCESS,
    payload,
  }),
  getPacingCardDataFailure: (error) => ({
    type: types.GET_PACING_CARD_DATA_FAILURE,
    error,
  }),

  getTopVideosCardRequest: (data) => ({
    type: types.GET_TOP_VIDEOS_CARD_REQUEST,
    data,
  }),
  getTopVideosCardSuccess: (payload) => ({
    type: types.GET_TOP_VIDEOS_CARD_SUCCESS,
    payload,
  }),
  getTopVideosCardFailure: (error) => ({
    type: types.GET_TOP_VIDEOS_CARD_FAILURE,
    error,
  }),

  getTopPerformingVideosRequest: (data) => ({
    type: types.GET_TOP_PERFORMING_VIDEOS_REQUEST,
    data,
  }),
  getTopPerformingVideosSuccess: (payload) => ({
    type: types.GET_TOP_PERFORMING_VIDEOS_SUCCESS,
    payload,
  }),
  getTopPerformingVideosFailure: (error) => ({
    type: types.GET_TOP_PERFORMING_VIDEOS_FAILURE,
    error,
  }),

  getVideoReleasesBarChartRequest: (data) => ({
    type: types.GET_VIDEO_RELEASES_BAR_CHART_REQUEST,
    data,
  }),
  getVideoReleasesBarChartSuccess: (payload) => ({
    type: types.GET_VIDEO_RELEASES_BAR_CHART_SUCCESS,
    payload,
  }),
  getVideoReleasesBarChartFailure: (error) => ({
    type: types.GET_VIDEO_RELEASES_BAR_CHART_FAILURE,
    error,
  }),

  getColorTempDataRequest: (data) => ({
    type: types.GET_COLOR_TEMP_DATA_REQUEST,
    data,
  }),
  getColorTempDataSuccess: (payload) => ({
    type: types.GET_COLOR_TEMP_DATA_SUCCESS,
    payload,
  }),
  getColorTempDataFailure: (error) => ({
    type: types.GET_COLOR_TEMP_DATA_FAILURE,
    error,
  }),

  getFilteringSectionDataRequest: (data) => ({
    type: types.GET_FILTERING_SECTION_DATA_REQUEST,
    data,
  }),
  getFilteringSectionDataSuccess: (payload) => ({
    type: types.GET_FILTERING_SECTION_DATA_SUCCESS,
    payload,
  }),
  getFilteringSectionDataFailure: (error) => ({
    type: types.GET_FILTERING_SECTION_DATA_FAILURE,
    error,
  }),
}
export const initialState = fromJS({
  selectedVideo: null,

  pacingChartData: {
    data: null,
    loading: true,
    error: null,
  },

  topVideosCard: {
    data: null,
    loading: true,
    error: null,
  },

  topPerformingVideos: {
    data: null,
    loading: true,
    error: null,
    selectedVideo: null,
  },

  videoReleasesBarChart: {
    data: null,
    loading: true,
    error: null,
  },

  colorTempData: {
    data: null,
    loading: true,
    error: null,
  },

  filteringSectionData: {
    data: {},
    loading: false,
    error: null,
  },
})

const generatedReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GENERATED_SELECTED_VIDEO:
      return state.setIn(
        ['topPerformingVideos', 'selectedVideo'],
        fromJS(action.payload)
      )

    case types.GET_PACING_CARD_DATA_REQUEST:
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

    case types.GET_PACING_CARD_DATA_FAILURE:
      return state
        .setIn(['pacingChartData', 'error'], fromJS(action.error))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_TOP_VIDEOS_CARD_REQUEST:
      return state.setIn(['topVideosCard', 'loading'], fromJS(true))

    case types.GET_TOP_VIDEOS_CARD_SUCCESS:
      return state
        .setIn(['topVideosCard', 'data'], fromJS(action.payload))
        .setIn(['topVideosCard', 'loading'], fromJS(false))

    case types.GET_TOP_VIDEOS_CARD_FAILURE:
      return state
        .setIn(['topVideosCard', 'error'], fromJS(action.error))
        .setIn(['topVideosCard', 'loading'], fromJS(false))

    case types.GET_TOP_PERFORMING_VIDEOS_REQUEST:
      return state.setIn(['topPerformingVideos', 'loading'], fromJS(true))

    case types.GET_TOP_PERFORMING_VIDEOS_SUCCESS:
      return state
        .setIn(['topPerformingVideos', 'data'], fromJS(action.payload))
        .setIn(
          ['topPerformingVideos', 'selectedVideo'],
          fromJS(action.payload[0])
        )
        .setIn(['topPerformingVideos', 'loading'], fromJS(false))

    case types.GET_TOP_PERFORMING_VIDEOS_FAILURE:
      return state
        .setIn(['topPerformingVideos', 'error'], fromJS(action.error))
        .setIn(['topPerformingVideos', 'loading'], fromJS(false))

    case types.GET_VIDEO_RELEASES_BAR_CHART_REQUEST:
      return state.setIn(['videoReleasesBarChart', 'loading'], fromJS(true))

    case types.GET_VIDEO_RELEASES_BAR_CHART_SUCCESS:
      return state
        .setIn(['videoReleasesBarChart', 'data'], fromJS(action.payload))
        .setIn(['videoReleasesBarChart', 'loading'], fromJS(false))

    case types.GET_VIDEO_RELEASES_BAR_CHART_FAILURE:
      return state
        .setIn(['videoReleasesBarChart', 'error'], fromJS(action.error))
        .setIn(['videoReleasesBarChart', 'loading'], fromJS(false))

    case types.GET_COLOR_TEMP_DATA_REQUEST:
      return state.setIn(['colorTempData', 'loading'], fromJS(true))

    case types.GET_COLOR_TEMP_DATA_SUCCESS:
      return state
        .setIn(['colorTempData', 'data'], fromJS(action.payload))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_COLOR_TEMP_DATA_FAILURE:
      return state
        .setIn(['colorTempData', 'error'], fromJS(action.error))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_FILTERING_SECTION_DATA_REQUEST:
      return state.setIn(['filteringSectionData', 'loading'], fromJS(true))

    case types.GET_FILTERING_SECTION_DATA_SUCCESS:
      const { doughnutData, stackedChartData } = action.payload

      return state
        .setIn(
          ['filteringSectionData', 'data'],
          fromJS({
            doughnutData,
            stackedChartData,
          })
        )
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    case types.GET_FILTERING_SECTION_DATA_FAILURE:
      return state
        .setIn(['filteringSectionData', 'error'], fromJS(action.error))
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    default:
      return state
  }
}

export const selectPacingChartData = (state) =>
  state.GeneratedReport.get('pacingChartData')

export const makeSelectReportsPacingCard = () =>
  createSelector(
    selectPacingChartData,
    (substate) => substate.toJS()
  )

export const selectTopVideosCard = (state) =>
  state.GeneratedReport.get('topVideosCard')

export const makeSelectReportsTopVideosCard = () =>
  createSelector(
    selectTopVideosCard,
    (substate) => substate.toJS()
  )

export const selectTopPerformingVideos = (state) =>
  state.GeneratedReport.get('topPerformingVideos')

export const makeSelectReportsTopPerformingVideos = () =>
  createSelector(
    selectTopPerformingVideos,
    (substate) => substate.toJS()
  )

export const selectVideoReleasesBarChart = (state) =>
  state.GeneratedReport.get('videoReleasesBarChart')

export const makeSelectReportsVideoReleasesBarChart = () =>
  createSelector(
    selectVideoReleasesBarChart,
    (substate) => substate.toJS()
  )

export const selectColorTempData = (state) =>
  state.GeneratedReport.get('colorTempData')

export const makeSelectReportsColorTempData = () =>
  createSelector(
    selectColorTempData,
    (substate) => substate.toJS()
  )

const selectReportsFilteringSectionDomain = (state) =>
  state.GeneratedReport.get('filteringSectionData')

export const makeSelectReportsFilteringSection = () =>
  createSelector(
    selectReportsFilteringSectionDomain,
    (substate) => substate.toJS()
  )

export default generatedReportsReducer
