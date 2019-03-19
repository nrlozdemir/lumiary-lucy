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
  GET_MARKETVIEW_BUBLECHART_REQUEST:
    'Marketview/GET_MARKETVIEW_BUBLECHART_REQUEST',
  GET_MARKETVIEW_BUBLECHART_SUCCESS:
    'Marketview/GET_MARKETVIEW_BUBLECHART_SUCCESS',
  GET_MARKETVIEW_BUBLECHART_FAILURE:
    'Marketview/GET_MARKETVIEW_BUBLECHART_FAILURE',
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
  getCompetitorTopVideosRequest: () => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST,
  }),
  getCompetitorTopVideosSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS,
    payload,
  }),
  getCompetitorTopVideosFailure: (error) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE,
    error,
  }),
  getSimilarPropertiesRequest: () => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST,
  }),
  getSimilarPropertiesSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS,
    payload,
  }),
  getSimilarPropertiesFailure: (error) => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE,
    error,
  }),
  getBubleChartRequest: () => ({
    type: types.GET_MARKETVIEW_BUBLECHART_REQUEST,
  }),
  getBubleChartSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_BUBLECHART_SUCCESS,
    payload,
  }),
  getBubleChartFailure: (error) => ({
    type: types.GET_MARKETVIEW_BUBLECHART_FAILURE,
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
  getTotalViewsRequest: () => ({
    type: types.GET_MARKETVIEW_TOTALVIEWS_REQUEST,
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
  getTopPerformingPropertiesRequest: () => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST,
  }),
  getTopPerformingPropertiesSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS,
    payload,
  }),
  getTopPerformingPropertiesFailure: (error) => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE,
    error,
  }),
  getTopPerformingPropertiesByCompetitorsRequest: () => ({
    type: types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST,
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
  competitorTopVideos: null,
  videos: null,
  selectedVideo: null,
  similarProperties: null,
  bubleChartData: null,
  pacingChartData: null,
  formatChartData: null,
  totalViewsData: null,
  totalCompetitorViewsData: null,
  marketviewDetailTime: null,
  error: false,
  loading: false,
  topPerformingPropertiesData: null,
  topPerformingPropertiesByCompetitorsData: null,
})

const marketviewReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return state.set('loading', fromJS(true))

    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
      return state
        .set('competitorTopVideos', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_BUBLECHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_BUBLECHART_SUCCESS:
      return state
        .set('bubleChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_BUBLECHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_PACINGCHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_PACINGCHART_SUCCESS:
      return state
        .set('pacingChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_PACINGCHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_FORMATCHART_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_FORMATCHART_SUCCESS:
      return state
        .set('formatChartData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_FORMATCHART_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_TOTALVIEWS_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_TOTALVIEWS_SUCCESS:
      return state
        .set('totalViewsData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_TOTALVIEWS_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS:
      return state
        .set('similarProperties', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_DETAIL_TIME_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_DETAIL_TIME_SUCCESS:
      return state
        .set('marketviewDetailTime', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_DETAIL_TIME_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST:
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST:
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST:
      return state.set('loading', fromJS(true))
    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_SUCCESS:
      return state
        .set('totalCompetitorViewsData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_SUCCESS:
      return state
        .set('topPerformingPropertiesData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_SUCCESS:
      return state
        .set('topPerformingPropertiesByCompetitorsData', fromJS(action.payload))
        .set('loading', fromJS(false))
    case types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_FAILURE:
    case types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_FAILURE:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    default:
      return state
  }
}

export const selectMarketviewDomain = (state) => state.Marketview

export const makeSelectMarketview = () =>
  createSelector(
    selectMarketviewDomain,
    (substate) => substate.toJS()
  )

export default marketviewReducer
