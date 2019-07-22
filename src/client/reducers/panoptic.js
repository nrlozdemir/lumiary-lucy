/*
 *
 * Panoptic reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
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

  GET_FLIPCARDS_DATA: 'Panoptic/GET_FLIPCARDS_DATA',
  GET_FLIPCARDS_DATA_SUCCESS: 'Panoptic/GET_FLIPCARDS_DATA_SUCCESS',
  GET_FLIPCARDS_DATA_ERROR: 'Panoptic/GET_FLIPCARDS_DATA_ERROR',

  GET_TOP_PERFORMING_FORMAT_DATA: 'Panoptic/GET_TOP_PERFORMING_FORMAT_DATA',
  GET_TOP_PERFORMING_FORMAT_DATA_SUCCESS:
    'Panoptic/GET_TOP_PERFORMING_FORMAT_DATA_SUCCESS',
  GET_TOP_PERFORMING_FORMAT_DATA_ERROR:
    'Panoptic/GET_TOP_PERFORMING_FORMAT_DATA_ERROR',
}

export const actions = {
  getVideoReleasesData: (data) => ({
    type: types.GET_VIDEO_RELEASES_DATA,
    data,
  }),
  getVideoReleasesDataSuccess: (payload) => ({
    type: types.GET_VIDEO_RELEASES_DATA_SUCCESS,
    payload,
  }),
  getVideoReleasesDataError: (error) => ({
    type: types.GET_VIDEO_RELEASES_DATA_ERROR,
    error,
  }),

  getColorTemperatureData: (data) => ({
    type: types.GET_COLOR_TEMPERATURE_DATA,
    data,
  }),
  getColorTemperatureDataSuccess: (payload) => ({
    type: types.GET_COLOR_TEMPERATURE_DATA_SUCCESS,
    payload,
  }),
  getColorTemperatureDataError: (error) => ({
    type: types.GET_COLOR_TEMPERATURE_DATA_ERROR,
    error,
  }),

  getFilteringSectionData: (data) => ({
    type: types.GET_FILTERING_SECTION_DATA,
    data,
  }),
  getFilteringSectionDataSuccess: (payload) => ({
    type: types.GET_FILTERING_SECTION_DATA_SUCCESS,
    payload,
  }),
  getFilteringSectionDataError: (error) => ({
    type: types.GET_FILTERING_SECTION_DATA_ERROR,
    error,
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

  getCompareSharesData: (data) => ({
    type: types.GET_COMPARE_SHARES_DATA,
    data,
  }),
  getCompareSharesDataSuccess: (payload) => ({
    type: types.GET_COMPARE_SHARES_DATA_SUCCESS,
    payload,
  }),
  getCompareSharesDataError: (error) => ({
    type: types.GET_COMPARE_SHARES_DATA_ERROR,
    error,
  }),

  getFlipCardsData: (data) => ({
    type: types.GET_FLIPCARDS_DATA,
    data,
  }),
  getFlipCardsDataSuccess: (payload) => ({
    type: types.GET_FLIPCARDS_DATA_SUCCESS,
    payload,
  }),
  getFlipCardsDataError: (error) => ({
    type: types.GET_FLIPCARDS_DATA_ERROR,
    error,
  }),

  getTopPerformingFormatData: (data) => ({
    type: types.GET_TOP_PERFORMING_FORMAT_DATA,
    data,
  }),
  getTopPerformingFormatDataSuccess: (payload) => ({
    type: types.GET_TOP_PERFORMING_FORMAT_DATA_SUCCESS,
    payload,
  }),
  getTopPerformingFormatDataError: (error) => ({
    type: types.GET_TOP_PERFORMING_FORMAT_DATA_ERROR,
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
    data: {
      data: undefined,
      labels: [],
      platforms: [],
    },
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
    data: undefined,
    loading: false,
    error: null,
  },

  flipCardsData: {
    data: {},
    loading: false,
    error: null,
  },
  topPerformingFormatData: {
    data: {},
    loading: false,
    error: null,
  },
  loading: false,
  error: false,
})

const panopticReducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case types.GET_VIDEO_RELEASES_DATA:
      return state.setIn(['videoReleasesData', 'loading'], fromJS(true))

    case types.GET_VIDEO_RELEASES_DATA_SUCCESS:
      return state
        .setIn(['videoReleasesData', 'data'], fromJS(action.payload))
        .setIn(['videoReleasesData', 'loading'], fromJS(false))

    case types.GET_VIDEO_RELEASES_DATA_ERROR:
      return state
        .setIn(['videoReleasesData', 'data'], fromJS([]))
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
      const { doughnutData, stackedChartData } = payload

      return state
        .setIn(
          ['filteringSectionData', 'data'],
          fromJS({
            doughnutData,
            stackedChartData,
          })
        )
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    case types.GET_FILTERING_SECTION_DATA_ERROR:
      return state
        .setIn(['filteringSectionData', 'data'], fromJS({}))
        .setIn(['filteringSectionData', 'error'], fromJS(action.error))
        .setIn(['filteringSectionData', 'loading'], fromJS(false))

    case types.GET_PACING_CARD_DATA:
      return state.setIn(['pacingChartData', 'loading'], fromJS(true))

    case types.GET_PACING_CARD_DATA_SUCCESS:
      const { stadiumData, horizontalStackedBarData } = payload

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
        .setIn(['pacingChartData', 'data'], fromJS({}))
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
        .setIn(['compareSharesData', 'data'], fromJS(undefined))
        .setIn(['compareSharesData', 'error'], fromJS(action.error))
        .setIn(['compareSharesData', 'loading'], fromJS(false))

    case types.GET_FLIPCARDS_DATA:
      return state.setIn(['flipCardsData', 'loading'], fromJS(true))

    case types.GET_FLIPCARDS_DATA_SUCCESS:
      return state
        .setIn(['flipCardsData', 'data'], fromJS(action.payload))
        .setIn(['flipCardsData', 'loading'], fromJS(false))

    case types.GET_FLIPCARDS_DATA_ERROR:
      return state
        .setIn(['flipCardsData', 'data'], fromJS({}))
        .setIn(['flipCardsData', 'error'], fromJS(action.error))
        .setIn(['flipCardsData', 'loading'], fromJS(false))

    case types.GET_TOP_PERFORMING_FORMAT_DATA:
      return state.setIn(['topPerformingFormatData', 'loading'], fromJS(true))

    case types.GET_TOP_PERFORMING_FORMAT_DATA_SUCCESS:
      return state
        .setIn(['topPerformingFormatData', 'data'], fromJS(action.payload))
        .setIn(['topPerformingFormatData', 'loading'], fromJS(false))

    case types.GET_TOP_PERFORMING_FORMAT_DATA_ERROR:
      return state
        .setIn(['topPerformingFormatData', 'data'], fromJS({}))
        .setIn(['topPerformingFormatData', 'error'], fromJS(action.error))
        .setIn(['topPerformingFormatData', 'loading'], fromJS(false))

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

const selectFlipCardsDomain = (state) => state.Panoptic.get('flipCardsData')

export const makeSelectFlipCards = () =>
  createSelector(
    selectFlipCardsDomain,
    (substate) => substate.toJS()
  )

const selectTopPerformingFormatDomain = (state) =>
  state.Panoptic.get('topPerformingFormatData')

export const makeSelectTopPerformingFormat = () =>
  createSelector(
    selectTopPerformingFormatDomain,
    (substate) => substate.toJS()
  )

export default panopticReducer
