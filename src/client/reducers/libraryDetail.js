import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  GET_SELECTED_VIDEO_REQUEST: 'LibraryDetail/GET_SELECTED_VIDEO_REQUEST',
  GET_SELECTED_VIDEO_SUCCESS: 'LibraryDetail/GET_SELECTED_VIDEO_SUCCESS',
  GET_SELECTED_VIDEO_ERROR: 'LibraryDetail/GET_SELECTED_VIDEO_ERROR',

  GET_SELECTED_VIDEO_AVERAGE_REQUEST:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_REQUEST',
  GET_SELECTED_VIDEO_AVERAGE_SUCCESS:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_SUCCESS',
  GET_SELECTED_VIDEO_AVERAGE_ERROR:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_ERROR',

  GET_BAR_CHART_REQUEST: 'LibraryDetail/GET_BAR_CHART_REQUEST',
  GET_BAR_CHART_SUCCESS: 'LibraryDetail/GET_BAR_CHART_SUCCESS',
  GET_BAR_CHART_FAILURE: 'LibraryDetail/GET_BAR_CHART_FAILURE',

  GET_DOUGHNUT_CHART_REQUEST: 'LibraryDetail/GET_DOUGHNUT_CHART_REQUEST',
  GET_DOUGHNUT_CHART_SUCCESS: 'LibraryDetail/GET_DOUGHNUT_CHART_SUCCESS',
  GET_DOUGHNUT_CHART_FAILURE: 'LibraryDetail/GET_DOUGHNUT_CHART_FAILURE',

  GET_COLOR_TEMP_REQUEST: 'LibraryDetail/GET_COLOR_TEMP_REQUEST',
  GET_COLOR_TEMP_SUCCESS: 'LibraryDetail/GET_COLOR_TEMP_SUCCESS',
  GET_COLOR_TEMP_FAILURE: 'LibraryDetail/GET_COLOR_TEMP_FAILURE',

  GET_SHOT_BY_SHOT_REQUEST: 'LibraryDetail/GET_SHOT_BY_SHOT_REQUEST',
  GET_SHOT_BY_SHOT_SUCCESS: 'LibraryDetail/GET_SHOT_BY_SHOT_SUCCESS',
  GET_SHOT_BY_SHOT_FAILURE: 'LibraryDetail/GET_SHOT_BY_SHOT_FAILURE',

  GET_SHOT_INFO_REQUEST: 'LibraryDetail/GET_SHOT_INFO_REQUEST',
  GET_SHOT_INFO_SUCCESS: 'LibraryDetail/GET_SHOT_INFO_SUCCESS',
  GET_SHOT_INFO_FAILURE: 'LibraryDetail/GET_SHOT_INFO_FAILURE',

  GET_RADAR_CHART_REQUEST: 'LibraryDetail/GET_RADAR_CHART_REQUEST',
  GET_RADAR_CHART_SUCCESS: 'LibraryDetail/GET_RADAR_CHART_SUCCESS',
  GET_RADAR_CHART_FAILURE: 'LibraryDetail/GET_RADAR_CHART_FAILURE',
}
export const actions = {
  getSelectedVideoRequest: (payload) => ({
    type: types.GET_SELECTED_VIDEO_REQUEST,
    payload,
  }),
  getSelectedVideoSuccess: (payload) => ({
    type: types.GET_SELECTED_VIDEO_SUCCESS,
    payload,
  }),
  getSelectedVideoFailure: (error) => ({
    type: types.GET_SELECTED_VIDEO_FAILURE,
    error,
  }),
  getSelectedVideoAverageRequest: (id) => ({
    type: types.GET_SELECTED_VIDEO_AVERAGE_REQUEST,
    id,
  }),
  getSelectedVideoAverageSuccess: (payload) => ({
    type: types.GET_SELECTED_VIDEO_AVERAGE_SUCCESS,
    payload,
  }),
  getSelectedVideoAverageFailure: (error) => ({
    type: types.GET_SELECTED_VIDEO_AVERAGE_FAILURE,
    error,
  }),
  getBarChartRequest: (payload) => ({
    type: types.GET_BAR_CHART_REQUEST,
    payload,
  }),
  getBarChartSuccess: (payload) => ({
    type: types.GET_BAR_CHART_SUCCESS,
    payload,
  }),
  getBarChartFailure: (error) => ({
    type: types.GET_BAR_CHART_FAILURE,
    error,
  }),
  getDoughnutChartRequest: (payload) => ({
    type: types.GET_DOUGHNUT_CHART_REQUEST,
    payload,
  }),
  getDoughnutChartSuccess: (payload) => ({
    type: types.GET_DOUGHNUT_CHART_SUCCESS,
    payload,
  }),
  getDoughnutChartFailure: (error) => ({
    type: types.GET_DOUGHNUT_CHART_FAILURE,
    error,
  }),
  getColorTempRequest: (payload) => ({
    type: types.GET_COLOR_TEMP_REQUEST,
    payload,
  }),
  getColorTempSuccess: (payload) => ({
    type: types.GET_COLOR_TEMP_SUCCESS,
    payload,
  }),
  getColorTempFailure: (payload) => ({
    type: types.GET_COLOR_TEMP_FAILURE,
    payload,
  }),
  getShotByShotRequest: (payload) => ({
    type: types.GET_SHOT_BY_SHOT_REQUEST,
    payload,
  }),
  getShotByShotSuccess: (payload) => ({
    type: types.GET_SHOT_BY_SHOT_SUCCESS,
    payload,
  }),
  getShotByShotFailure: (payload) => ({
    type: types.GET_SHOT_BY_SHOT_FAILURE,
    payload,
  }),
  getShotInfoRequest: (payload) => ({ type: types.GET_SHOT_INFO_REQUEST, payload }),
  getShotInfoSuccess: (payload) => ({
    type: types.GET_SHOT_INFO_SUCCESS,
    payload,
  }),
  getShotInfoFailure: (error) => ({ type: types.GET_SHOT_INFO_FAILURE, error }),
  getRadarChartRequest: (payload) => ({ type: types.GET_RADAR_CHART_REQUEST, payload }),
  getRadarChartSuccess: (payload) => ({
    type: types.GET_RADAR_CHART_SUCCESS,
    payload,
  }),
  getRadarChartFailure: (error) => ({ type: types.GET_RADAR_CHART_FAILURE, error }),
}

export const initialState = fromJS({
  barChartData: null,
  doughnutLineChartData: null,
  colorTempData: {
    data: undefined,
    loading: false,
    error: null,
  },
  shotByShotData: null,
  shotInfoData: null,
  error: false,
  loading: false,
  selectedVideo: {},
  selectedVideoAverage: [],
  radarChartData: {},
})

const libraryDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SELECTED_VIDEO_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_SELECTED_VIDEO_SUCCESS:
      return state
        .set('selectedVideo', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_SELECTED_VIDEO_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_SELECTED_VIDEO_AVERAGE_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_SELECTED_VIDEO_AVERAGE_SUCCESS: {
      return state
        .set('selectedVideoAverage', fromJS(action.payload))
        .set('loading', fromJS(false))
    }
    case types.GET_SELECTED_VIDEO_AVERAGE_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_BAR_CHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_BAR_CHART_SUCCESS:
      return state
        .set('barChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_BAR_CHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_DOUGHNUT_CHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_DOUGHNUT_CHART_SUCCESS:
      return state
        .set('doughnutLineChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_DOUGHNUT_CHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_COLOR_TEMP_REQUEST:
      return state.setIn(['colorTempData', 'loading'], fromJS(true))

    case types.GET_COLOR_TEMP_SUCCESS:
      return state
        .setIn(['colorTempData', 'data'], fromJS(action.payload))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_COLOR_TEMP_FAILURE:
      return state
        .setIn(['colorTempData', 'error'], fromJS(action.error))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_SHOT_BY_SHOT_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_SHOT_BY_SHOT_SUCCESS:
      return state
        .set('shotByShotData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_SHOT_BY_SHOT_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_SHOT_INFO_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_SHOT_INFO_SUCCESS:
      return state
        .set('shotInfoData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_SHOT_INFO_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_RADAR_CHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_RADAR_CHART_SUCCESS:
      return state
        .set('radarChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_RADAR_CHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    default:
      return state
  }
}

export const selectLibraryDetailDomain = (state) => state.LibraryDetail
export const selectLibraryDetailSelectedVideo = (state) =>
  state.LibraryDetail.get('selectedVideo')

export const selectShotInfo = () =>
  createSelector(
    selectLibraryDetailSelectedVideo,
    (substate) => substate.toJS()
  )

export const makeSelectLibraryDetail = () =>
  createSelector(
    selectLibraryDetailDomain,
    (substate) => substate.toJS()
  )

export const makeSelectSelectedVideoID = () =>
  createSelector(
    selectLibraryDetailSelectedVideo,
    (substate) => {
      console.log(substate.toJS())
      // return substate.toJS().selectedVideo.uuid
    }
  )

const selectLibraryDetailColorTemperatureDomain = (state) =>
  state.LibraryDetail.get('colorTempData')

export const makeSelectLibraryDetailColorTemperature = () =>
  createSelector(
    selectLibraryDetailColorTemperatureDomain,
    (substate) => substate.toJS()
  )

export default libraryDetailReducer
