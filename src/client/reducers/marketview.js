/*
 *
 * Marketview reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO:
    'Marketview/SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST:
    'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS:
    'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE:
    'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST:
    'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
    'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
    'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST:
    'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS:
    'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE:
    'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE',
  GET_MARKETVIEW_BUBBLECHART_REQUEST:
    'Marketview/GET_MARKETVIEW_BUBBLECHART_REQUEST',
  GET_MARKETVIEW_BUBBLECHART_SUCCESS:
    'Marketview/GET_MARKETVIEW_BUBBLECHART_SUCCESS',
  GET_MARKETVIEW_BUBBLECHART_FAILURE:
    'Marketview/GET_MARKETVIEW_BUBBLECHART_FAILURE',
  GET_MARKETVIEW_PACINGCHART_REQUEST:
    'Marketview/GET_MARKETVIEW_PACINGCHART_REQUEST',
  GET_MARKETVIEW_PACINGCHART_SUCCESS:
    'Marketview/GET_MARKETVIEW_PACINGCHART_SUCCESS',
  GET_MARKETVIEW_PACINGCHART_FAILURE:
    'Marketview/GET_MARKETVIEW_PACINGCHART_FAILURE',
  GET_MARKETVIEW_FORMATCHART_REQUEST:
    'Marketview/GET_MARKETVIEW_FORMATCHART_REQUEST',
  GET_MARKETVIEW_FORMATCHART_SUCCESS:
    'Marketview/GET_MARKETVIEW_FORMATCHART_SUCCESS',
  GET_MARKETVIEW_FORMATCHART_FAILURE:
    'Marketview/GET_MARKETVIEW_FORMATCHART_FAILURE',
  GET_MARKETVIEW_TOTALVIEWS_REQUEST:
    'Marketview/GET_MARKETVIEW_TOTALVIEWS_REQUEST',
  GET_MARKETVIEW_TOTALVIEWS_SUCCESS:
    'Marketview/GET_MARKETVIEW_TOTALVIEWS_SUCCESS',
  GET_MARKETVIEW_TOTALVIEWS_FAILURE:
    'Marketview/GET_MARKETVIEW_TOTALVIEWS_FAILURE',
  GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST:
    'Marketview/GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST',
  GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS:
    'Marketview/GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS',
  GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE:
    'Marketview/GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE',

  GET_MARKETVIEW_DETAIL_TIME_REQUEST:
    'Marketview/GET_MARKETVIEW_DETAIL_TIME_REQUEST',
  GET_MARKETVIEW_DETAIL_TIME_SUCCESS:
    'Marketview/GET_MARKETVIEW_DETAIL_TIME_SUCCESS',
  GET_MARKETVIEW_DETAIL_TIME_FAILURE:
    'Marketview/GET_MARKETVIEW_DETAIL_TIME_FAILURE',

  GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST:
    'Marketview/GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST',
  GET_MARKETVIEW_DETAIL_PEFORMING_TIME_SUCCESS:
    'Marketview/GET_MARKETVIEW_DETAIL_PEFORMING_TIME_SUCCESS',
  GET_MARKETVIEW_DETAIL_PEFORMING_TIME_FAILURE:
    'Marketview/GET_MARKETVIEW_DETAIL_PEFORMING_TIME_FAILURE',

  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST',
  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS',
  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE',
  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST',
  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_SUCCESS:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_SUCCESS',
  GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_FAILURE:
    'Marketview/GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_FAILURE',
}
export const actions = {
  getCompetitorVideosRequest: () => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST,
  }),
  getCompetitorVideosSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS,
    payload,
  }),
  getCompetitorVideosFailure: (error) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE,
    error,
  }),
  setSelectedVideo: (payload) => ({
    type: types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO,
    payload,
  }),
  getCompetitorTopVideosRequest: (data) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST,
    data,
  }),
  getCompetitorTopVideosSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS,
    payload,
  }),
  getCompetitorTopVideosFailure: (error) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE,
    error,
  }),
  getSimilarPropertiesRequest: (data) => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST,
    data,
  }),
  getSimilarPropertiesSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS,
    payload,
  }),
  getSimilarPropertiesFailure: (error) => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE,
    error,
  }),
  getBubbleChartRequest: () => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_REQUEST,
  }),
  getBubleChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_SUCCESS,
    payload,
  }),
  getBubleChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_FAILURE,
    error,
  }),
  getPacingChartRequest: () => ({
    type: types.GET_MARKETVIEW_PACINGCHART_REQUEST,
  }),
  getPacingChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_PACINGCHART_SUCCESS,
    payload,
  }),
  getPacingChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_PACINGCHART_FAILURE,
    error,
  }),
  getFormatChartRequest: () => ({
    type: types.GET_MARKETVIEW_FORMATCHART_REQUEST,
  }),
  getFormatChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_FORMATCHART_SUCCESS,
    payload,
  }),
  getFormatChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_FORMATCHART_FAILURE,
    error,
  }),
  getTotalViewsRequest: (data, moduleKey) => ({
    type: types.GET_MARKETVIEW_TOTALVIEWS_REQUEST,
    data,
    moduleKey,
  }),
  getTotalViewsSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_TOTALVIEWS_SUCCESS,
    payload,
  }),
  getTotalViewsFailure: (error) => ({
    type: types.GET_MARKETVIEW_TOTALVIEWS_FAILURE,
    error,
  }),
  getTotalCompetitorViewsRequest: () => ({
    type: types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST,
  }),
  getTotalCompetitorViewsSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS,
    payload,
  }),
  getTotalCompetitorViewsFailure: (error) => ({
    type: types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE,
    error,
  }),
  getMarketviewDetailTimeRequest: () => ({
    type: types.GET_MARKETVIEW_DETAIL_TIME_REQUEST,
  }),
  getMarketviewDetailTimeSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_DETAIL_TIME_SUCCESS,
    payload,
  }),
  getMarketviewDetailTimeFailure: (error) => ({
    type: types.GET_MARKETVIEW_DETAIL_TIME_FAILURE,
    error,
  }),
  getTopPerformingTimeRequest: (payload) => ({
    type: types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST,
    payload,
  }),
  getTopPerformingTimeSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_SUCCESS,
    payload,
  }),
  getTopPerformingTimeFailure: (error) => ({
    type: types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_FAILURE,
    error,
  }),
  getTopPerformingPropertiesRequest: (payload) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST,
    payload,
  }),
  getTopPerformingPropertiesSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS,
    payload,
  }),
  getTopPerformingPropertiesFailure: (error) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE,
    error,
  }),
  getTopPerformingPropertiesByCompetitorsRequest: (payload) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST,
    payload,
  }),
  getTopPerformingPropertiesByCompetitorsSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_SUCCESS,
    payload,
  }),
  getTopPerformingPropertiesByCompetitorsFailure: (error) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_FAILURE,
    error,
  }),
}
export const initialState = fromJS({
  competitorTopVideos: {
    data: [],
    loading: false,
    error: null,
  },
  videos: [],
  selectedVideo: null,
  similarProperties: {
    data: [],
    loading: false,
    error: null,
  },
  bubbleChartData: [],
  pacingChartData: {
    data: {},
    loading: false,
    error: null,
  },
  formatChartData: {
    data: null,
    video: null,
    currentDay: null,
    loading: false,
    error: null,
  },
  totalViewsData: {
    data: {},
    loading: false,
    error: null,
  },
  totalCompetitorViewsData: {
    data: [],
    loading: false,
    error: null,
  },
  marketviewDetailTime: {},
  error: false,
  loading: false,
  topPerformingPropertiesData: {
    data: [],
    loading: false,
    error: null,
  },
  topPerformingPropertiesByCompetitorsData: {
    data: [],
    loading: false,
    error: null,
  },
})

const marketviewReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO:
      return state.set('selectedVideo', fromJS(action.payload))

    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS:
      return state
        .set('videos', fromJS(action.payload))
        .set('loading', fromJS(false))
        .set('selectedVideo', fromJS(action.payload[0]))
    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST:
      return state.setIn(['competitorTopVideos', 'loading'], fromJS(true))

    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
      return state
        .setIn(['competitorTopVideos', 'data'], fromJS(action.payload))
        .setIn(['competitorTopVideos', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
      return state
        .setIn(['competitorTopVideos', 'error'], fromJS(action.error))
        .setIn(['competitorTopVideos', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_BUBBLECHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_BUBBLECHART_SUCCESS:
      return state
        .set('bubbleChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_BUBBLECHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    // PACING CHART
    case types.GET_MARKETVIEW_PACINGCHART_REQUEST:
      return state.setIn(['pacingChartData', 'loading'], fromJS(true))

    case types.GET_MARKETVIEW_PACINGCHART_SUCCESS:
      return state
        .setIn(['pacingChartData', 'data'], fromJS(payload))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_PACINGCHART_FAILURE:
      return state
        .setIn(['pacingChartData', 'error'], fromJS(action.error))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    // FORMAT CHART
    case types.GET_MARKETVIEW_FORMATCHART_REQUEST:
      return state.setIn(['formatChartData', 'loading'], fromJS(true))

    case types.GET_MARKETVIEW_FORMATCHART_SUCCESS:
      return state.set(
        'formatChartData',
        fromJS({ ...action.payload, loading: false, error: null })
      )

    case types.GET_MARKETVIEW_FORMATCHART_FAILURE:
      return state
        .setIn(['formatChartData', 'error'], fromJS(action.error))
        .setIn(['formatChartData', 'loading'], fromJS(false))

    // TOTAL VIEWS
    case types.GET_MARKETVIEW_TOTALVIEWS_REQUEST:
      return state.setIn(['totalViewsData', 'loading'], fromJS(true))

    case types.GET_MARKETVIEW_TOTALVIEWS_SUCCESS:
      const { doughnutData, barData } = payload

      return state
        .setIn(
          ['totalViewsData', 'data'],
          fromJS({
            doughnutData,
            barData,
          })
        )
        .setIn(['totalViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOTALVIEWS_FAILURE:
      return state
        .setIn(['totalViewsData', 'error'], fromJS(action.error))
        .setIn(['totalViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST:
      return state.setIn(['similarProperties', 'loading'], fromJS(true))
    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS:
      return state
        .setIn(['similarProperties', 'data'], fromJS(action.payload))
        .setIn(['similarProperties', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE:
      return state
        .setIn(['similarProperties', 'error'], fromJS(action.error))
        .setIn(['similarProperties', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_DETAIL_TIME_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_DETAIL_TIME_SUCCESS:
      return state
        .setIn(['marketviewDetailTime', 'data'], fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_DETAIL_TIME_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_SUCCESS:
      return state
        .setIn(
          ['marketviewDetailTime', 'topPerformingData'],
          fromJS(action.payload)
        )
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST:
      return state.setIn(['totalCompetitorViewsData', 'loading'], fromJS(true))
    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS:
      return state
        .setIn(['totalCompetitorViewsData', 'data'], fromJS(action.payload))
        .setIn(['totalCompetitorViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE:
      return state
        .setIn(['totalCompetitorViewsData', 'error'], fromJS(action.error))
        .setIn(['totalCompetitorViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST:
      return state.setIn(['similarProperties', 'loading'], fromJS(true))
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_SUCCESS:
      return state
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'data'],
          fromJS(action.payload)
        )
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'loading'],
          fromJS(false)
        )
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_FAILURE:
      return state
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'loading'],
          fromJS(false)
        )
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST:
      return state.setIn(
        ['topPerformingPropertiesData', 'loading'],
        fromJS(true)
      )

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS:
      return state
        .setIn(['topPerformingPropertiesData', 'data'], fromJS(action.payload))
        .setIn(['topPerformingPropertiesData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE:
      return state
        .setIn(['topPerformingPropertiesData', 'error'], fromJS(action.error))
        .setIn(['topPerformingPropertiesData', 'loading'], fromJS(false))

    default:
      return state
  }
}

const selectMarketviewBubbleChartDomain = (state) =>
  state.Marketview.get('bubbleChartData')

const selectMarketviewFormatCardDomain = (state) =>
  state.Marketview.get('formatChartData')

const selectMarketviewPacingChartDomain = (state) =>
  state.Marketview.get('pacingChartData')

const selectMarketviewTotalViewDomain = (state) =>
  state.Marketview.get('totalViewsData')

const selectMarketviewSimilarPropertiesDomain = (state) =>
  state.Marketview.get('similarProperties')

const selectMarketviewtotalCompetitorViewDomain = (state) =>
  state.Marketview.get('totalCompetitorViewsData')

const selectMarketviewVideosDomain = (state) => state.Marketview.get('videos')
const selectMarketviewCompetitorTopVideosDomain = (state) =>
  state.Marketview.get('competitorTopVideos')

const selectMarketviewTopPerformingPropertiesByCompetitorsDataDomain = (
  state
) => state.Marketview.get('topPerformingPropertiesByCompetitorsData')

const selectMarketviewTopPerformingPropertiesDataDomain = (state) =>
  state.Marketview.get('topPerformingPropertiesData')

export const selectMarketviewDomain = (state) => state.Marketview

export const makeSelectMarketview = () =>
  createSelector(
    selectMarketviewDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewBubbleChart = () =>
  createSelector(
    selectMarketviewBubbleChartDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewFormatCard = () =>
  createSelector(
    selectMarketviewFormatCardDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewPacingChart = () =>
  createSelector(
    selectMarketviewPacingChartDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewTotalView = () =>
  createSelector(
    selectMarketviewTotalViewDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewCompetitorView = () =>
  createSelector(
    selectMarketviewtotalCompetitorViewDomain,
    (substate) => substate.toJS()
  )

export const selectMarketviewVideosView = () =>
  createSelector(
    selectMarketviewVideosDomain,
    (substate) => substate.toJS()
  )
export const selectMarketviewSelectedVideoView = () =>
  createSelector(
    selectMarketviewDomain,
    (substate) => substate.toJS().selectedVideo
  )

export const selectMarketviewCompetitorTopVideosView = () =>
  createSelector(
    selectMarketviewCompetitorTopVideosDomain,
    (substate) => substate.toJS()
  )
export const selectMarketviewSimilarPropertiesView = () =>
  createSelector(
    selectMarketviewSimilarPropertiesDomain,
    (substate) => substate.toJS()
  )

export const selectMarketviewTopPerformingPropertiesByCompetitorsDataView = () =>
  createSelector(
    selectMarketviewTopPerformingPropertiesByCompetitorsDataDomain,
    (substate) => substate.toJS()
  )

export const selectMarketviewTopPerformingPropertiesDataView = () =>
  createSelector(
    selectMarketviewTopPerformingPropertiesDataDomain,
    (substate) => substate.toJS()
  )

export default marketviewReducer
