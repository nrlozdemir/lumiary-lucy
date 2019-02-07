/*
*
* Panoptic reducer
*
*/

import { fromJS } from 'immutable';

export const types = {
	GET_DATA: "Panoptic/GET_VIDEO_RELEASES",
	GET_DATA_SUCCESS: "Panoptic/GET_VIDEO_RELEASES_SUCCESS",
	GET_DATA_ERROR: "Panoptic/GET_VIDEO_RELEASES_ERROR",
};

export const actions = {
	getData: () => ({ type: types.GET_DATA }),
	getDataSuccess: payload => ({ type: types.GET_DATA_SUCCESS, payload }),
	getDataError: error => ({type: types.GET_DATA_ERROR, error}),
};

export const initialState = fromJS({
	data: {},
	loading: false,
	error: false,
});

const panopticReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_DATA:
			return state.set("loading", fromJS(true));
		case types.GET_DATA_SUCCESS:
			return state
				.set("data", fromJS(action.payload))
				.set("loading", fromJS(false));
		case types.GET_DATA_ERROR:
			return state
				.set("error", fromJS(action.error))
				.set("loading", fromJS(false));
		default:
			return state;
	}
};

export default panopticReducer;
