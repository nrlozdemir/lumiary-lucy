import { fromJS } from "immutable";

export const types = {
	SET_VIDEO_OBJECT: "LIBRARY/SET_VIDEO_OBJECT"
};

export const actions = {
	setVideoObject: payload => ({ type: types.SET_VIDEO_OBJECT, payload })
};

export const initialState = fromJS({
	video: null
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_VIDEO_OBJECT:
			return state.set("video", fromJS(action.payload));
		default:
			return state;
	}
};

export default reducer;
