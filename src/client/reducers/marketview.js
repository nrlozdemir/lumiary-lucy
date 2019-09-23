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
  GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_REQUEST:
    'Marketview/GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_REQUEST',
  GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_SUCCESS:
    'Marketview/GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_SUCCESS',
  GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_FAILURE:
    'Marketview/GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_FAILURE',
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
  SET_MARKETVIEW_COMPETITOR_TOP_PROPERTY:
    'Marketview/SET_MARKETVIEW_COMPETITOR_TOP_PROPERTY',

  GET_CONTENT_VITALITY_SCORE_DATA: 'Marketview/GET_CONTENT_VITALITY_SCORE_DATA',
  GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS:
    'Marketview/GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS',
  GET_CONTENT_VITALITY_SCORE_DATA_ERROR:
    'Marketview/GET_CONTENT_VITALITY_SCORE_DATA_ERROR',
}
export const actions = {
  getCompetitorVideosRequest: (payload) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST,
    payload,
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
  getPlatformTopVideosRequest: (data) => ({
    type: types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_REQUEST,
    data,
  }),
  getPlatformTopVideosSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_SUCCESS,
    payload,
  }),
  getPlatformTopVideosFailure: (error) => ({
    type: types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_FAILURE,
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
  getBubbleChartRequest: (payload) => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_REQUEST,
    payload,
  }),
  getBubleChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_SUCCESS,
    payload,
  }),
  getBubleChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_BUBBLECHART_FAILURE,
    error,
  }),
  getPacingChartRequest: (payload) => ({
    type: types.GET_MARKETVIEW_PACINGCHART_REQUEST,
    payload,
  }),
  getPacingChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_PACINGCHART_SUCCESS,
    payload,
  }),
  getPacingChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_PACINGCHART_FAILURE,
    error,
  }),
  getFormatChartRequest: (payload) => ({
    type: types.GET_MARKETVIEW_FORMATCHART_REQUEST,
    payload,
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
  setCompetitorTopProperty: (payload) => ({
    type: types.SET_MARKETVIEW_COMPETITOR_TOP_PROPERTY,
    payload,
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
}

export const initialState = fromJS({
  competitorTopVideos: {
    data: [],
    loading: false,
    error: null,
  },
  platformTopVideos: {
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
  bubbleChartData: {
    data: [],
    loading: false,
    error: null,
  },
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
    data: {},
    loading: false,
    error: null,
  },
  marketviewDetailTime: {},
  error: false,
  loading: false,
  topPerformingPropertiesData: {
    data: {},
    loading: false,
    error: null,
  },
  topPerformingPropertiesByCompetitorsData: {
    data: {},
    loading: false,
    error: null,
  },
  topPerformingDataForTime: {
    data: {},
    loading: false,
    error: null,
  },
  topProperty: null,
  contentVitalityScoreData: {
    data: {
      data: {},
    },
    error: false,
    loading: false,
  },
})

export const marketviewReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO:
      return state.set('selectedVideo', fromJS(action.payload))

    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST:
      return state.set('loading', fromJS(true)).set('videos', fromJS([]))

    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS:
      return state
        .set('videos', fromJS(action.payload))
        .set('loading', fromJS(false))
        .set('selectedVideo', fromJS(action.payload[0]))
    case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE:
      return state
        .set('videos', fromJS([]))
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST:
      return state
        .setIn(['competitorTopVideos', 'loading'], fromJS(true))
        .setIn(
          ['competitorTopVideos', 'data'],
          fromJS(initialState.toJS().competitorTopVideos.data)
        )

    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
      return state
        .setIn(['competitorTopVideos', 'data'], fromJS(action.payload))
        .setIn(['competitorTopVideos', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
      return state
        .setIn(
          ['competitorTopVideos', 'data'],
          fromJS(initialState.toJS().competitorTopVideos.data)
        )
        .setIn(['competitorTopVideos', 'error'], fromJS(action.error))
        .setIn(['competitorTopVideos', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_REQUEST:
      return state
        .setIn(['platformTopVideos', 'loading'], fromJS(true))
        .setIn(
          ['platformTopVideos', 'data'],
          fromJS(initialState.toJS().platformTopVideos.data)
        )

    case types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_SUCCESS:
      return state
        .setIn(['platformTopVideos', 'data'], fromJS(action.payload))
        .setIn(['platformTopVideos', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_FAILURE:
      return state
        .setIn(
          ['platformTopVideos', 'data'],
          fromJS(initialState.toJS().platformTopVideos.data)
        )
        .setIn(['platformTopVideos', 'error'], fromJS(action.error))
        .setIn(['platformTopVideos', 'loading'], fromJS(false))

    // BUBBLE CHART
    case types.GET_MARKETVIEW_BUBBLECHART_REQUEST:
      return state
        .setIn(['bubbleChartData', 'loading'], fromJS(true))
        .setIn(
          ['bubbleChartData', 'data'],
          fromJS(initialState.toJS().bubbleChartData.data)
        )

    case types.GET_MARKETVIEW_BUBBLECHART_SUCCESS:
      return state
        .setIn(['bubbleChartData', 'data'], fromJS(action.payload))
        .setIn(['bubbleChartData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_BUBBLECHART_FAILURE:
      return state
        .setIn(
          ['bubbleChartData', 'data'],
          fromJS(initialState.toJS().bubbleChartData.data)
        )
        .setIn(['bubbleChartData', 'error'], fromJS(action.error))
        .setIn(['bubbleChartData', 'loading'], fromJS(false))

    // PACING CHART
    case types.GET_MARKETVIEW_PACINGCHART_REQUEST:
      return state
        .setIn(['pacingChartData', 'loading'], fromJS(true))
        .setIn(
          ['pacingChartData', 'data'],
          fromJS(initialState.toJS().pacingChartData.data)
        )

    case types.GET_MARKETVIEW_PACINGCHART_SUCCESS:
      return state
        .setIn(['pacingChartData', 'data'], fromJS(payload))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_PACINGCHART_FAILURE:
      return state
        .setIn(
          ['pacingChartData', 'data'],
          fromJS(initialState.toJS().pacingChartData.data)
        )
        .setIn(['pacingChartData', 'error'], fromJS(action.error))
        .setIn(['pacingChartData', 'loading'], fromJS(false))

    // FORMAT CHART
    case types.GET_MARKETVIEW_FORMATCHART_REQUEST:
      return state
        .setIn(['formatChartData', 'loading'], fromJS(true))
        .setIn(
          ['formatChartData', 'data'],
          fromJS(initialState.toJS().formatChartData.data)
        )
    case types.GET_MARKETVIEW_FORMATCHART_SUCCESS:
      return state.set(
        'formatChartData',
        fromJS({ ...action.payload, loading: false, error: null })
      )

    case types.GET_MARKETVIEW_FORMATCHART_FAILURE:
      return state
        .setIn(
          ['formatChartData', 'data'],
          fromJS(initialState.toJS().formatChartData.data)
        )
        .setIn(['formatChartData', 'error'], fromJS(action.error))
        .setIn(['formatChartData', 'loading'], fromJS(false))

    // TOTAL VIEWS
    case types.GET_MARKETVIEW_TOTALVIEWS_REQUEST:
      return state
        .setIn(['totalViewsData', 'loading'], fromJS(true))
        .setIn(
          ['totalViewsData', 'data'],
          fromJS(initialState.toJS().totalViewsData.data)
        )

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
        .setIn(
          ['totalViewsData', 'data'],
          fromJS(initialState.toJS().totalViewsData.data)
        )
        .setIn(['totalViewsData', 'error'], fromJS(action.error))
        .setIn(['totalViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST:
      return state
        .setIn(['similarProperties', 'loading'], fromJS(true))
        .setIn(['similarProperties', 'error'], fromJS(null))
        .setIn(
          ['similarProperties', 'data'],
          fromJS(initialState.toJS().similarProperties.data)
        )

    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS:
      return state
        .setIn(['similarProperties', 'data'], fromJS(action.payload))
        .setIn(['similarProperties', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE:
      return state
        .setIn(['similarProperties', 'error'], fromJS(action.error))
        .setIn(['similarProperties', 'loading'], fromJS(false))
        .setIn(
          ['similarProperties', 'data'],
          fromJS(initialState.toJS().similarProperties.data)
        )
    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST:
      return state
        .setIn(['topPerformingDataForTime', 'loading'], fromJS(true))
        .setIn(
          ['topPerformingDataForTime', 'data'],
          fromJS(initialState.toJS().topPerformingDataForTime.data)
        )
    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_SUCCESS:
      return state
        .setIn(['topPerformingDataForTime', 'data'], fromJS(action.payload))
        .setIn(['topPerformingDataForTime', 'loading'], fromJS(false))
    case types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_FAILURE:
      return state
        .setIn(
          ['topPerformingDataForTime', 'data'],
          fromJS(initialState.toJS().topPerformingDataForTime.data)
        )
        .setIn(['topPerformingDataForTime', 'error'], fromJS(action.error))

        .setIn(['topPerformingDataForTime', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST:
      return state
        .setIn(['totalCompetitorViewsData', 'loading'], fromJS(true))
        .setIn(
          ['totalCompetitorViewsData', 'data'],
          fromJS(initialState.toJS().totalCompetitorViewsData.data)
        )
    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS:
      return state
        .setIn(['totalCompetitorViewsData', 'data'], fromJS(action.payload))
        .setIn(['totalCompetitorViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE:
      return state
        .setIn(
          ['totalCompetitorViewsData', 'data'],
          fromJS(initialState.toJS().totalCompetitorViewsData.data)
        )
        .setIn(['totalCompetitorViewsData', 'error'], fromJS(action.error))
        .setIn(['totalCompetitorViewsData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST:
      return state
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'loading'],
          fromJS(true)
        )
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'data'],
          fromJS(
            initialState.toJS().topPerformingPropertiesByCompetitorsData.data
          )
        )

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
          ['topPerformingPropertiesByCompetitorsData', 'data'],
          fromJS(
            initialState.toJS().topPerformingPropertiesByCompetitorsData.data
          )
        )
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'error'],
          fromJS(action.error)
        )
        .setIn(
          ['topPerformingPropertiesByCompetitorsData', 'loading'],
          fromJS(false)
        )
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST:
      return state
        .setIn(['topPerformingPropertiesData', 'loading'], fromJS(true))
        .setIn(
          ['topPerformingPropertiesData', 'data'],
          fromJS(initialState.toJS().topPerformingPropertiesData.data)
        )

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS:
      return state
        .setIn(['topPerformingPropertiesData', 'data'], fromJS(action.payload))
        .setIn(['topPerformingPropertiesData', 'loading'], fromJS(false))

    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE:
      return state
        .setIn(
          ['topPerformingPropertiesData', 'data'],
          fromJS(initialState.toJS().topPerformingPropertiesData.data)
        )
        .setIn(['topPerformingPropertiesData', 'error'], fromJS(action.error))
        .setIn(['topPerformingPropertiesData', 'loading'], fromJS(false))

    case types.SET_MARKETVIEW_COMPETITOR_TOP_PROPERTY:
      return state.set('topProperty', fromJS(action.payload))

    /** START content vitality score data */
    case types.GET_CONTENT_VITALITY_SCORE_DATA:
      return state
        .setIn(['contentVitalityScoreData', 'loading'], fromJS(true))
        .setIn(
          ['contentVitalityScoreData', 'data'],
          fromJS(initialState.toJS().contentVitalityScoreData.data)
        )

    case types.GET_CONTENT_VITALITY_SCORE_DATA_SUCCESS: {
      return state
        .setIn(['contentVitalityScoreData', 'data'], fromJS(action.payload))
        .setIn(['contentVitalityScoreData', 'loading'], fromJS(false))
    }
    case types.GET_CONTENT_VITALITY_SCORE_DATA_ERROR:
      return state
        .setIn(
          ['contentVitalityScoreData', 'data'],
          fromJS(initialState.toJS().contentVitalityScoreData.data)
        )
        .setIn(['contentVitalityScoreData', 'error'], fromJS(action.error))
        .setIn(['contentVitalityScoreData', 'loading'], fromJS(false))
    /** END content vitality score data */
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

const selectMarketviewPlatformTopVideosDomain = (state) =>
  state.Marketview.get('platformTopVideos')

const selectMarketviewTopPerformingPropertiesByCompetitorsDataDomain = (
  state
) => state.Marketview.get('topPerformingPropertiesByCompetitorsData')

const selectMarketviewTopPerformingPropertiesDataDomain = (state) =>
  state.Marketview.get('topPerformingPropertiesData')

const selectMarketviewTopPerformingDataDomain = (state) =>
  state.Marketview.get('topPerformingDataForTime')

const selectMarketviewContentVitalityScoreDomain = (state) =>
  state.Marketview.get('contentVitalityScoreData')

export const selectMarketviewDomain = (state) => state.Marketview

export const makeSelectMarketviewLoading = () =>
  createSelector(
    selectMarketviewDomain,
    (substate) => substate.toJS().loading
  )

export const makeSelectMarketviewTopProperty = (state) =>
  createSelector(
    selectMarketviewDomain,
    (substate) => substate.toJS().topProperty
  )

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

export const selectMarketviewTopPerformingDataView = () =>
  createSelector(
    selectMarketviewTopPerformingDataDomain,
    (substate) => substate.toJS()
  )

export const selectMarketviewPlatformTopVideosView = () =>
  createSelector(
    selectMarketviewPlatformTopVideosDomain,
    (substate) => substate.toJS()
  )

export const makeSelectMarketviewContentVitalityScore = () =>
  createSelector(
    selectMarketviewContentVitalityScoreDomain,
    (substate) => substate.toJS()
  )

export default marketviewReducer
