/*
*
* Marketview reducer
*
*/


import { fromJS } from 'immutable';



export const types = {
  SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO: 'Marketview/SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST: 'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS: 'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS',
  GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE: 'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST: 'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS: 'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS',
  GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE: 'Marketview/GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE'
};
export const actions = {
  getCompetitorVideosRequest: () => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST
  }),
  getCompetitorVideosSuccess: payload => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS,
    payload
  }),
  getCompetitorVideosFailure: error => ({
    type: types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE,
    error
  }),
  setSelectedVideo: payload => ({
    type: types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO,
    payload
  }),
  getCompetitorTopVideosRequest: () => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST
  }),
  getCompetitorTopVideosSuccess: (payload) => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS,
    payload
  }),
  getCompetitorTopVideosFailure: error => ({
    type: types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE,
    error
  }),
  getSimilarPropertiesRequest: () => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST
  }),
  getSimilarPropertiesSuccess: payload => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS,
    payload
  }),
  getSimilarPropertiesFailure: error => ({
    type: types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS,
    error
  }),
};
export const initialState = fromJS({
  competitorTopVideos: null,
  videos: null,
  selectedVideo: null,
  similarProperties: null,
  error: false,
  loading: false
});

const marketviewReducer = (state = initialState, action) => {
switch (action.type) {
  case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST:
  case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST:
    return state.set('loading', fromJS(true));

  case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS:
    return state
      .set('videos', fromJS(action.payload))
      .set('loading', fromJS(false))
      .set('selectedVideo', fromJS(action.payload[0]));
      
  case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE:
  case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
  case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_FAILURE:
    return state.set('error', fromJS(action.error)).set('loading', fromJS(false));

  case types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO:
    return state.set('selectedVideo', fromJS(action.payload));

  case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST:
    return state.set('loading', fromJS(true));
    
  case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
    return state
      .set('competitorTopVideos', fromJS(action.payload))
      .set('loading', fromJS(false));

  case types.GET_MARKETVIEW_SIMILAR_PROPERTIES_SUCCESS:
    return state
    .set('similarProperties', fromJS(action.payload))
    .set('loading', fromJS(false));

  default:
    return state;
}
}

export default marketviewReducer;