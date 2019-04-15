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

  GET_AUDIENCE_PERFORMANCE_DATA: 'Panoptic/GET_AUDIENCE_PERFORMANCE_DATA',
  GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS',
  GET_AUDIENCE_PERFORMANCE_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_PERFORMANCE_DATA_ERROR',

  GET_AUDIENCE_AGE_SLIDER_DATA: 'Panoptic/GET_AUDIENCE_AGE_SLIDER_DATA',
  GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS',
  GET_AUDIENCE_AGE_SLIDER_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_AGE_SLIDER_DATA_ERROR',

  GET_AUDIENCE_GENDER_DATA: 'Panoptic/GET_AUDIENCE_GENDER_DATA',
  GET_AUDIENCE_GENDER_DATA_SUCCESS: 'Panoptic/GET_AUDIENCE_GENDER_DATA_SUCCESS',
  GET_AUDIENCE_GENDER_DATA_ERROR: 'Panoptic/GET_AUDIENCE_GENDER_DATA_ERROR',

  GET_AUDIENCE_COLOR_TEMPERATURE_DATA:
    'Panoptic/GET_AUDIENCE_COLOR_TEMPERATURE_DATA',
  GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS',
  GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR',

  GET_AUDIENCE_CHANGE_OVER_TIME_DATA:
    'Panoptic/GET_AUDIENCE_CHANGE_OVER_TIME_DATA',
  GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS',
  GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR',

  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA:
    'Panoptic/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA',
  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS',
  GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR',

  GET_AUDIENCE_DOMINANT_COLOR_DATA: 'Panoptic/GET_AUDIENCE_DOMINANT_COLOR_DATA',
  GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS:
    'Panoptic/GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS',
  GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR:
    'Panoptic/GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR',

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

  getAudiencePerformanceData: () => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA,
  }),
  getAudiencePerformanceDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS,
    payload,
  }),
  getAudiencePerformanceDataError: (error) => ({
    type: types.GET_AUDIENCE_PERFORMANCE_DATA_ERROR,
    error,
  }),

  getAudienceAgeSliderData: () => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA,
  }),
  getAudienceAgeSliderDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS,
    payload,
  }),
  getAudienceAgeSliderDataError: (error) => ({
    type: types.GET_AUDIENCE_AGE_SLIDER_DATA_ERROR,
    error,
  }),

  getAudienceGenderData: () => ({
    type: types.GET_AUDIENCE_GENDER_DATA,
  }),
  getAudienceGenderDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_GENDER_DATA_SUCCESS,
    payload,
  }),
  getAudienceGenderDataError: (error) => ({
    type: types.GET_AUDIENCE_GENDER_DATA_ERROR,
    error,
  }),

  getAudienceColorTemperatureData: () => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA,
  }),
  getAudienceColorTemperatureDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS,
    payload,
  }),
  getAudienceColorTemperatureDataError: (error) => ({
    type: types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR,
    error,
  }),

  getAudienceChangeOverTimeData: () => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA,
  }),
  getAudienceChangeOverTimeDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS,
    payload,
  }),
  getAudienceChangeOverTimeDataError: (error) => ({
    type: types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR,
    error,
  }),

  getAudienceContentVitalityScoreData: () => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA,
  }),
  getAudienceContentVitalityScoreDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS,
    payload,
  }),
  getAudienceContentVitalityScoreDataError: (error) => ({
    type: types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR,
    error,
  }),

  getAudienceDominantColorData: () => ({
    type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
  }),
  getAudienceDominantColorDataSuccess: (payload) => ({
    type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS,
    payload,
  }),
  getAudienceDominantColorDataError: (error) => ({
    type: types.GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR,
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
    data: {},
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
  audiencePerformanceData: {
    data: {},
    loading: false,
    error: null,
  },
  audienceAgeSliderData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceGenderData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceColorTemperatureData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceChangeOverTimeData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceContentVitalityScoreData: {
    data: [],
    loading: false,
    error: null,
  },
  audienceDominantColorData: {
    data: {},
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

    case types.GET_AUDIENCE_PERFORMANCE_DATA:
      return state.setIn(['audiencePerformanceData', 'loading'], fromJS(true))

    case types.GET_AUDIENCE_PERFORMANCE_DATA_SUCCESS:
      return state
        .setIn(['audiencePerformanceData', 'data'], fromJS(action.payload))
        .setIn(['audiencePerformanceData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_PERFORMANCE_DATA_ERROR:
      return state
        .setIn(['audiencePerformanceData', 'error'], fromJS(action.error))
        .setIn(['audiencePerformanceData', 'loading'], fromJS(false))

    case types.UPDATE_AUDIENCE_PERFORMANCE_SUCCESS:
      return state.mergeIn(
        ['audiencePerformanceData', 'data'],
        fromJS(action.payload)
      )

    case types.UPDATE_AUDIENCE_PERFORMANCE_ERROR:
      return state.setIn(
        ['audiencePerformanceData', 'error'],
        fromJS(action.error)
      )

    case types.GET_AUDIENCE_AGE_SLIDER_DATA:
      return state.setIn(['audienceAgeSliderData', 'loading'], fromJS(true))

    case types.GET_AUDIENCE_AGE_SLIDER_DATA_SUCCESS:
      return state
        .setIn(['audienceAgeSliderData', 'data'], fromJS(action.payload))
        .setIn(['audienceAgeSliderData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_AGE_SLIDER_DATA_ERROR:
      return state
        .setIn(['audienceAgeSliderData', 'error'], fromJS(action.error))
        .setIn(['audienceAgeSliderData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_GENDER_DATA:
      return state.setIn(['audienceGenderData', 'loading'], fromJS(true))

    case types.GET_AUDIENCE_GENDER_DATA_SUCCESS:
      return state
        .setIn(['audienceGenderData', 'data'], fromJS(action.payload))
        .setIn(['audienceGenderData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_GENDER_DATA_ERROR:
      return state
        .setIn(['audienceGenderData', 'error'], fromJS(action.error))
        .setIn(['audienceGenderData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA:
      return state.setIn(
        ['audienceColorTemperatureData', 'loading'],
        fromJS(true)
      )

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_SUCCESS:
      return state
        .setIn(['audienceColorTemperatureData', 'data'], fromJS(action.payload))
        .setIn(['audienceColorTemperatureData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA_ERROR:
      return state
        .setIn(['audienceColorTemperatureData', 'error'], fromJS(action.error))
        .setIn(['audienceColorTemperatureData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA:
      return state.setIn(
        ['audienceChangeOverTimeData', 'loading'],
        fromJS(true)
      )

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_SUCCESS:
      return state
        .setIn(['audienceChangeOverTimeData', 'data'], fromJS(action.payload))
        .setIn(['audienceChangeOverTimeData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA_ERROR:
      return state
        .setIn(['audienceChangeOverTimeData', 'error'], fromJS(action.error))
        .setIn(['audienceChangeOverTimeData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA:
      return state.setIn(
        ['audienceContentVitalityScoreData', 'loading'],
        fromJS(true)
      )

    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_SUCCESS:
      return state
        .setIn(
          ['audienceContentVitalityScoreData', 'data'],
          fromJS(action.payload)
        )
        .setIn(['audienceContentVitalityScoreData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA_ERROR:
      return state
        .setIn(
          ['audienceContentVitalityScoreData', 'error'],
          fromJS(action.error)
        )
        .setIn(['audienceContentVitalityScoreData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA:
      return state.setIn(['audienceDominantColorData', 'loading'], fromJS(true))

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA_SUCCESS:
      return state
        .setIn(['audienceDominantColorData', 'data'], fromJS(action.payload))
        .setIn(['audienceDominantColorData', 'loading'], fromJS(false))

    case types.GET_AUDIENCE_DOMINANT_COLOR_DATA_ERROR:
      return state
        .setIn(['audienceDominantColorData', 'error'], fromJS(action.error))
        .setIn(['audienceDominantColorData', 'loading'], fromJS(false))

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

const selectAudiencePerformanceDomain = (state) =>
  state.Panoptic.get('audiencePerformanceData')

export const makeSelectAudiencePerformance = () =>
  createSelector(
    selectAudiencePerformanceDomain,
    (substate) => substate.toJS()
  )

const selectAudienceAgeSliderDomain = (state) =>
  state.Panoptic.get('audienceAgeSliderData')

export const makeSelectAudienceAgeSlider = () =>
  createSelector(
    selectAudienceAgeSliderDomain,
    (substate) => substate.toJS()
  )

const selectAudienceGenderDomain = (state) =>
  state.Panoptic.get('audienceGenderData')

export const makeSelectAudienceGender = () =>
  createSelector(
    selectAudienceGenderDomain,
    (substate) => substate.toJS()
  )

const selectAudienceColorTemperatureDomain = (state) =>
  state.Panoptic.get('audienceColorTemperatureData')

export const makeSelectAudienceColorTemperature = () =>
  createSelector(
    selectAudienceColorTemperatureDomain,
    (substate) => substate.toJS()
  )

const selectAudienceChangeOverTimeDomain = (state) =>
  state.Panoptic.get('audienceChangeOverTimeData')

export const makeSelectAudienceChangeOverTime = () =>
  createSelector(
    selectAudienceChangeOverTimeDomain,
    (substate) => substate.toJS()
  )

const selectAudienceContentVitalityScoreDomain = (state) =>
  state.Panoptic.get('audienceContentVitalityScoreData')

export const makeSelectAudienceContentVitalityScore = () =>
  createSelector(
    selectAudienceContentVitalityScoreDomain,
    (substate) => substate.toJS()
  )

const selectAudienceDominantColorDomain = (state) =>
  state.Panoptic.get('audienceDominantColorData')

export const makeSelectAudienceDominantColor = () =>
  createSelector(
    selectAudienceDominantColorDomain,
    (substate) => substate.toJS()
  )

export default panopticReducer
