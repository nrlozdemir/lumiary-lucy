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
	GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE: 'Marketview/GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE'
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
	})
};
export const initialState = fromJS({
	videos: null,
	selectedVideo: null,
	error: false,
	loading: false
});

const marketviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST:
			return state.set('loading', fromJS(true));
		case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_SUCCESS:
			return state
				.set('videos', fromJS(action.payload))
				.set('loading', fromJS(false))
				.set('selectedVideo', fromJS(action.payload[0]));
		case types.GET_MARKETVIEW_COMPETITOR_VIDEOS_FAILURE:
			return state.set('error', fromJS(action.error)).set('loading', fromJS(false));
		case types.SET_MARKETVIEW_COMPETITOR_SELECTED_VIDEO:
			return state.set('selectedVideo', fromJS(action.payload));
		default:
			return state;
	}
};

export default marketviewReducer;
