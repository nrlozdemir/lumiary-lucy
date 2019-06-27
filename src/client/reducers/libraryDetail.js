import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  GET_SELECTED_VIDEO_REQUEST: 'LibraryDetail/GET_SELECTED_VIDEO_REQUEST',
  GET_SELECTED_VIDEO_SUCCESS: 'LibraryDetail/GET_SELECTED_VIDEO_SUCCESS',
  GET_SELECTED_VIDEO_FAILURE: 'LibraryDetail/GET_SELECTED_VIDEO_FAILURE',

  GET_SELECTED_VIDEO_AVERAGE_REQUEST:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_REQUEST',
  GET_SELECTED_VIDEO_AVERAGE_SUCCESS:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_SUCCESS',
  GET_SELECTED_VIDEO_AVERAGE_FAILURE:
    'LibraryDetail/GET_SELECTED_VIDEO_AVERAGE_FAILURE',

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

  TOGGLE_INFO_SECTION: 'LibraryDetail/TOGGLE_INFO_SECTION',

  DOUGHNUT_INFO_SUCCESS: 'LibraryDetail/DOUGHNUT_INFO_SUCCESS',
  DOUGHNUT_INFO_FAILURE: 'LibraryDetail/DOUGHNUT_INFO_FAILURE',

  GET_SHOT_INFO_REQUEST: 'LibraryDetail/GET_SHOT_INFO_REQUEST',
  GET_SHOT_INFO_SUCCESS: 'LibraryDetail/GET_SHOT_INFO_SUCCESS',
  GET_SHOT_INFO_FAILURE: 'LibraryDetail/GET_SHOT_INFO_FAILURE',

  GET_RADAR_CHART_REQUEST: 'LibraryDetail/GET_RADAR_CHART_REQUEST',
  GET_RADAR_CHART_SUCCESS: 'LibraryDetail/GET_RADAR_CHART_SUCCESS',
  GET_RADAR_CHART_FAILURE: 'LibraryDetail/GET_RADAR_CHART_FAILURE',

  GET_PEOPLE_REQUEST: 'LibraryDetail/GET_PEOPLE_REQUEST',
  GET_PEOPLE_SUCCESS: 'LibraryDetail/GET_PEOPLE_SUCCESS',
  GET_PEOPLE_FAILURE: 'LibraryDetail/GET_PEOPLE_FAILURE',
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
  toggleInfoSection: (payload) => ({
    type: types.TOGGLE_INFO_SECTION,
    payload,
  }),
  doughnutInfoIndustrySuccess: (payload) => ({
    type: types.DOUGHNUT_INFO_SUCCESS,
    payload,
  }),
  doughnutInfoIndustryFailure: (payload) => ({
    type: types.DOUGHNUT_INFO_FAILURE,
    payload,
  }),
  getShotInfoRequest: (payload) => ({
    type: types.GET_SHOT_INFO_REQUEST,
    payload,
  }),
  getShotInfoSuccess: (payload) => ({
    type: types.GET_SHOT_INFO_SUCCESS,
    payload,
  }),
  getShotInfoFailure: (error) => ({ type: types.GET_SHOT_INFO_FAILURE, error }),
  getRadarChartRequest: (payload) => ({
    type: types.GET_RADAR_CHART_REQUEST,
    payload,
  }),
  getRadarChartSuccess: (payload) => ({
    type: types.GET_RADAR_CHART_SUCCESS,
    payload,
  }),
  getRadarChartFailure: (error) => ({
    type: types.GET_RADAR_CHART_FAILURE,
    error,
  }),
  getPeopleRequest: (payload) => ({ type: types.GET_PEOPLE_REQUEST, payload }),
  getPeopleSuccess: (payload) => ({
    type: types.GET_PEOPLE_SUCCESS,
    payload,
  }),
  getPeopleFailure: (error) => ({ type: types.GET_PEOPLE_FAILURE, error }),
}

export const initialState = fromJS({
  barChartData: null,
  doughnutData: {
    data: undefined,
    loading: false,
    error: null,
  },
  colorTempData: {
    data: undefined,
    loading: false,
    error: null,
  },
  shotByShotData: {
    data: null,
    loading: false,
    error: null,
  },
  shotInfoData: {},
  error: false,
  loading: false,
  selectedVideo: {},
  infoData: {
    loading: false,
    shownSectionData: null,
    modalData: null,
  },
  selectedVideoAverage: [],
  radarChartData: {},
  peopleData: {},
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
      return state.setIn(['doughnutData', 'loading'], fromJS(true))

    case types.GET_DOUGHNUT_CHART_SUCCESS:
      return state
        .setIn(['doughnutData', 'data'], fromJS(action.payload))
        .setIn(['doughnutData', 'loading'], fromJS(false))

    case types.GET_DOUGHNUT_CHART_FAILURE:
      return state
        .setIn(['doughnutData', 'data'], fromJS(action.payload))
        .setIn(['doughnutData', 'loading'], fromJS(false))

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
      return state.setIn(['shotByShotData', 'loading'], fromJS(true))

    case types.GET_SHOT_BY_SHOT_SUCCESS:
      return state
        .setIn(['shotByShotData', 'data'], fromJS(action.payload))
        .setIn(['shotByShotData', 'loading'], fromJS(false))

    case types.GET_SHOT_BY_SHOT_FAILURE:
      return state
        .setIn(['shotByShotData', 'error'], fromJS(action.error))
        .setIn(['shotByShotData', 'loading'], fromJS(false))

    case types.TOGGLE_INFO_SECTION:
      return state
        .setIn(['infoData', 'shownSectionData'], fromJS(action.payload))
        .setIn(['infoData', 'modalData'], fromJS(null))
        .setIn(['infoData', 'loading'], fromJS(true))

    case types.DOUGHNUT_INFO_SUCCESS:
      return state
        .setIn(['infoData', 'modalData'], fromJS(action.payload))
        .setIn(['infoData', 'loading'], fromJS(false))

    case types.DOUGHNUT_INFO_FAILURE:
      return state
        .setIn(['infoData', 'modalData'], fromJS(null))
        .setIn(['infoData', 'loading'], fromJS(false))

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

    case types.GET_PEOPLE_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_PEOPLE_SUCCESS:
      return state
        .set('peopleData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_PEOPLE_FAILURE:
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

export const selectLibraryDetailPeople = (state) =>
  state.LibraryDetail.get('peopleData')

export const selectLibraryDetailShotInfo = (state) =>
  state.LibraryDetail.get('shotInfoData')

export const selectShotInfoData = () =>
  createSelector(
    selectLibraryDetailShotInfo,
    (substate) => substate.toJS()
  )

export const selectPeopleData = () =>
  createSelector(
    selectLibraryDetailPeople,
    (substate) => substate.toJS()
  )

export const selectLibraryDetailRaharChart = (state) =>
  state.LibraryDetail.get('radarChartData')

export const selectColorsData = () =>
  createSelector(
    selectLibraryDetailRaharChart,
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
      return substate.toJS().uuid
    }
  )

const selectLibraryDetailColorTemperatureDomain = (state) =>
  state.LibraryDetail.get('colorTempData')

export const makeSelectLibraryDetailColorTemperature = () =>
  createSelector(
    selectLibraryDetailColorTemperatureDomain,
    (substate) => substate.toJS()
  )

function selectInfoData(state) {
  return state.LibraryDetail.get('infoData')
}

export function makeSelectInfoShowSection() {
  return createSelector(
    selectInfoData,
    (substate) =>
      substate.get('shownSectionData')
        ? substate.get('shownSectionData').toJS()
        : null
  )
}

export const makeSelectInfoData = () =>
  createSelector(
    selectInfoData,
    (substate) => substate.toJS()
  )

export function makeSelectInfoModalData() {
  return createSelector(
    selectInfoData,
    (substate) =>
      substate.get('modalData') ? substate.get('modalData').toJS() : null
  )
}

export function makeSelectDoughnutData() {
  return createSelector(
    selectLibraryDetailDomain,
    (substate) => substate.get('doughnutData').toJS()
  )
}

export function makeSelectLibDetailLoading() {
  return createSelector(
    selectLibraryDetailDomain,
    (substate) => substate.toJS().loading
  )
}

export default libraryDetailReducer
