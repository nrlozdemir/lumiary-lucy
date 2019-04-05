/*
 *
 * Panoptic reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  GET_DATA: 'Panoptic/GET_DATA',
  GET_DATA_SUCCESS: 'Panoptic/GET_DATA_SUCCESS',
  GET_DATA_ERROR: 'Panoptic/GET_DATA_ERROR',

  GET_VIDEO_RELEASES_DATA: 'Panoptic/GET_VIDEO_RELEASES_DATA',
  GET_VIDEO_RELEASES_DATA_SUCCESS: 'Panoptic/GET_VIDEO_RELEASES_DATA_SUCCESS',
  GET_VIDEO_RELEASES_DATA_ERROR: 'Panoptic/GET_VIDEO_RELEASES_DATA_ERROR',

  GET_COLOR_TEMPERATURE_DATA: 'Panoptic/GET_COLOR_TEMPERATURE_DATA',
  GET_COLOR_TEMPERATURE_DATA_SUCCESS:
    'Panoptic/GET_COLOR_TEMPERATURE_DATA_SUCCESS',
  GET_COLOR_TEMPERATURE_DATA_ERROR: 'Panoptic/GET_COLOR_TEMPERATURE_DATA_ERROR',

  GET_FILTERING_SECTION_DATA: 'Panoptic/GET_FILTERING_SECTION_DATA',
  GET_FILTERING_SECTION_DATA_SUCCESS:
    'Panoptic/GET_FILTERING_SECTION_DATA_SUCCESS',
  GET_FILTERING_SECTION_DATA_ERROR: 'Panoptic/GET_FILTERING_SECTION_DATA_ERROR',

  GET_PACING_CARD_DATA: 'Panoptic/GET_PACING_CARD_DATA',
  GET_PACING_CARD_DATA_SUCCESS: 'Panoptic/GET_PACING_CARD_DATA_SUCCESS',
  GET_PACING_CARD_DATA_ERROR: 'Panoptic/GET_PACING_CARD_DATA_ERROR',

  GET_COMPARE_SHARES_DATA: 'Panoptic/GET_COMPARE_SHARES_DATA',
  GET_COMPARE_SHARES_DATA_SUCCESS: 'Panoptic/GET_COMPARE_SHARES_DATA_SUCCESS',
  GET_COMPARE_SHARES_DATA_ERROR: 'Panoptic/GET_COMPARE_SHARES_DATA_ERROR',

  GET_AUDIENCE_DATA: 'Panoptic/GET_AUDIENCE_DATA',
  GET_AUDIENCE_DATA_SUCCESS: 'Panoptic/GET_AUDIENCE_DATA_SUCCESS',
  GET_AUDIENCE_DATA_ERROR: 'Panoptic/GET_AUDIENCE_DATA_ERROR',

  UPDATE_AUDIENCE_PERFORMANCE: 'Panoptic/UPDATE_AUDIENCE_PERFORMANCE',
  UPDATE_AUDIENCE_PERFORMANCE_SUCCESS:
    'Panoptic/UPDATE_AUDIENCE_PERFORMANCE_SUCCESS',
  UPDATE_AUDIENCE_PERFORMANCE_ERROR:
    'Panoptic/UPDATE_AUDIENCE_PERFORMANCE_ERROR',
}

export const actions = {
  getData: () => ({ type: types.GET_DATA }),
  getDataSuccess: (payload) => ({ type: types.GET_DATA_SUCCESS, payload }),
  getDataError: (error) => ({ type: types.GET_DATA_ERROR, error }),

  getVideoReleasesData: (data) => {
    return {
      type: types.GET_VIDEO_RELEASES_DATA,
      data,
    }
  },
  getVideoReleasesDataSuccess: (payload) => ({
    type: types.GET_VIDEO_RELEASES_DATA_SUCCESS,
    payload,
  }),
  getVideoReleasesDataError: (error) => ({
    type: types.GET_VIDEO_RELEASES_DATA_ERROR,
    error,
  }),

  getColorTemperatureData: (data) => {
    return {
      type: types.GET_COLOR_TEMPERATURE_DATA,
      data,
    }
  },
  getColorTemperatureDataSuccess: (payload) => ({
    type: types.GET_COLOR_TEMPERATURE_DATA_SUCCESS,
    payload,
  }),
  getColorTemperatureDataError: (error) => ({
    type: types.GET_COLOR_TEMPERATURE_DATA_ERROR,
    error,
  }),

  getFilteringSectionData: (data) => {
    return {
      type: types.GET_FILTERING_SECTION_DATA,
      data,
    }
  },
  getFilteringSectionDataSuccess: (payload) => ({
    type: types.GET_FILTERING_SECTION_DATA_SUCCESS,
    payload,
  }),
  getFilteringSectionDataError: (error) => ({
    type: types.GET_FILTERING_SECTION_DATA_ERROR,
    error,
  }),

  getPacingCardData: (data) => {
    return {
      type: types.GET_PACING_CARD_DATA,
      data,
    }
  },
  getPacingCardDataSuccess: (payload) => ({
    type: types.GET_PACING_CARD_DATA_SUCCESS,
    payload,
  }),
  getPacingCardDataError: (error) => ({
    type: types.GET_PACING_CARD_DATA_ERROR,
    error,
  }),

  getCompareSharesData: (data) => {
    return {
      type: types.GET_COMPARE_SHARES_DATA,
      data,
    }
  },
  getCompareSharesDataSuccess: (payload) => ({
    type: types.GET_COMPARE_SHARES_DATA_SUCCESS,
    payload,
  }),
  getCompareSharesDataError: (error) => ({
    type: types.GET_COMPARE_SHARES_DATA_ERROR,
    error,
  }),

  getAudienceData: () => ({ type: types.GET_AUDIENCE_DATA }),
  getAudienceDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_DATA_SUCCESS,
    payload,
  }),
  getAudienceDataError: (error) => ({
    type: types.GET_AUDIENCE_DATA_ERROR,
    error,
  }),

  updateAudiencePerformance: (payload) => ({
    type: types.UPDATE_AUDIENCE_PERFORMANCE,
    payload,
  }),
  updateAudiencePerformanceSuccess: (payload) => ({
    type: types.UPDATE_AUDIENCE_PERFORMANCE_SUCCESS,
    payload,
  }),
  updateAudiencePerformanceError: (error) => ({
    type: types.UPDATE_AUDIENCE_PERFORMANCE_ERROR,
    error,
  }),
}

export const initialState = fromJS({
  data: {},
  videoReleasesData: {
    data: [],
    loading: false,
    error: null,
  },
  colorTempData: {
    data: [],
    loading: false,
    error: null,
  },
  filteringSectionData: {
    data: {},
    loading: false,
    error: null,
  },
  pacingChartData: {
    data: {},
    loading: false,
    error: null,
  },
  compareSharesData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceData: null,
  loading: false,
  error: false,
})

const panopticReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return state.set('loading', fromJS(true))

    case types.GET_DATA_SUCCESS:
      return state
        .set('data', fromJS(action.payload))
        .set('loading', fromJS(false))

    case types.GET_DATA_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_VIDEO_RELEASES_DATA:
      return state.setIn(['videoReleasesData', 'loading'], fromJS(true))

    case types.GET_VIDEO_RELEASES_DATA_SUCCESS:
      return state
        .setIn(['videoReleasesData', 'data'], fromJS(action.payload))
        .setIn(['videoReleasesData', 'loading'], fromJS(false))

    case types.GET_VIDEO_RELEASES_DATA_ERROR:
      return state
        .setIn(['videoReleasesData', 'error'], fromJS(action.error))
        .setIn(['videoReleasesData', 'loading'], fromJS(false))

    case types.GET_COLOR_TEMPERATURE_DATA:
      return state.setIn(['colorTempData', 'loading'], fromJS(true))

    case types.GET_COLOR_TEMPERATURE_DATA_SUCCESS:
      return state
        .setIn(['colorTempData', 'data'], fromJS(action.payload))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_COLOR_TEMPERATURE_DATA_ERROR:
      return state
        .setIn(['colorTempData', 'error'], fromJS(action.error))
        .setIn(['colorTempData', 'loading'], fromJS(false))

    case types.GET_FILTERING_SECTION_DATA:
      return state.setIn(['filteringSectionData', 'loading'], fromJS(true))

    case types.GET_FILTERING_SECTION_DATA_SUCCESS:
      return state
        .setIn(['filteringSectionData', 'data'], fromJS(action.payload))
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    case types.GET_FILTERING_SECTION_DATA_ERROR:
      return state
        .setIn(['filteringSectionData', 'error'], fromJS(action.error))
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    case types.GET_PACING_CARD_DATA:
      return state.setIn(['pacingChartData', 'loading'], fromJS(true))

    case types.GET_PACING_CARD_DATA_SUCCESS:
      return state
        .setIn(['pacingChartData', 'data'], fromJS(action.payload))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_PACING_CARD_DATA_ERROR:
      return state
        .setIn(['pacingChartData', 'error'], fromJS(action.error))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_COMPARE_SHARES_DATA:
      return state.setIn(['compareSharesData', 'loading'], fromJS(true))

    case types.GET_COMPARE_SHARES_DATA_SUCCESS:
      return state
        .setIn(['compareSharesData', 'data'], fromJS(action.payload))
        .setIn(['compareSharesData', 'loading'], fromJS(false))

    case types.GET_COMPARE_SHARES_DATA_ERROR:
      return state
        .setIn(['compareSharesData', 'error'], fromJS(action.error))
        .setIn(['compareSharesData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_DATA:
      return state.set('loading', fromJS(true))

    case types.GET_AUDIENCE_DATA_SUCCESS:
      return state
        .set('audienceData', fromJS(action.payload))
        .set('loading', fromJS(false))

    case types.GET_AUDIENCE_DATA_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.UPDATE_AUDIENCE_PERFORMANCE:
      return state.set('loading', fromJS(true))

    case types.UPDATE_AUDIENCE_PERFORMANCE_SUCCESS:
      return state
        .mergeIn(['audienceData', 'performance'], fromJS(action.payload))
        .set('loading', fromJS(false))

    case types.UPDATE_AUDIENCE_PERFORMANCE_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    default:
      return state
  }
}

export const selectPanopticDomain = (state) => state.Panoptic

export const makeSelectPanoptic = () =>
  createSelector(
    selectPanopticDomain,
    (substate) => substate.toJS()
  )

const selectPanopticVideoReleasesDomain = (state) =>
  state.Panoptic.get('videoReleasesData')

export const makeSelectPanopticVideoReleases = () =>
  createSelector(
    selectPanopticVideoReleasesDomain,
    (substate) => substate.toJS()
  )

const selectPanopticColorTemperatureDomain = (state) =>
  state.Panoptic.get('colorTempData')

export const makeSelectPanopticColorTemperature = () =>
  createSelector(
    selectPanopticColorTemperatureDomain,
    (substate) => substate.toJS()
  )

const selectPanopticFilteringSectionDomain = (state) =>
  state.Panoptic.get('filteringSectionData')

export const makeSelectPanopticFilteringSection = () =>
  createSelector(
    selectPanopticFilteringSectionDomain,
    (substate) => substate.toJS()
  )

const selectPanopticPacingCardDomain = (state) =>
  state.Panoptic.get('pacingChartData')

export const makeSelectPanopticPacingCard = () =>
  createSelector(
    selectPanopticPacingCardDomain,
    (substate) => substate.toJS()
  )

const selectPanopticCompareSharesDomain = (state) =>
  state.Panoptic.get('compareSharesData')

export const makeSelectPanopticCompareShares = () =>
  createSelector(
    selectPanopticCompareSharesDomain,
    (substate) => substate.toJS()
  )

export default panopticReducer
