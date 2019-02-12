/*
*
* Marketview reducer
*
*/


import { fromJS } from 'immutable';



export const types = {
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS',
  GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE : 'Marketview/GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE'
};
export const actions = {
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
};
export const initialState = fromJS({
  competitorTopVideos: null
});

const marketviewReducer = (state = initialState, action) => {
switch (action.type) {
  case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_SUCCESS:
    return state
    .set('competitorTopVideos', fromJS(action.payload))

  case types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_FAILURE:
    return state.set('error', fromJS(action.error)).set('loading', fromJS(false));

  default:
    return state;
}
}

export default marketviewReducer;