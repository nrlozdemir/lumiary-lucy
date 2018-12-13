import { fromJS } from "immutable";

export const types = {
	SET_VIDEO_OBJECT: "LIBRARY/SET_VIDEO_OBJECT",
	SET_COMPARE_VIDEO: "LIBRARY/SET_COMPARE_VIDEO",
	RESET_COMPARE_VIDEOS: "LIBRARY/RESET_COMPARE_VIDEOS"
};

export const actions = {
	setVideoObject: payload => ({ type: types.SET_VIDEO_OBJECT, payload }),
	setCompareVideo: payload => ({ type: types.SET_COMPARE_VIDEO, payload }),
	resetCompareVideos: () => ({ type: types.RESET_COMPARE_VIDEOS })
};

export const initialState = fromJS({
	video: null,
	compareVideos: []
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_VIDEO_OBJECT:
			return state.set("video", fromJS(action.payload));
		case types.SET_COMPARE_VIDEO: {
			const val = state.get("compareVideos").indexOf(action.payload);
			if (val !== -1) {
				return state.update("compareVideos", myList =>
					myList.filter(element => element.id !== action.payload.id)
				);
			} else {
				return state.update("compareVideos", myList =>
					myList.push(action.payload)
				);
			}
		}
		case types.RESET_COMPARE_VIDEOS:
			return state.set("compareVideos", fromJS([]));
		default:
			return state;
	}
};

export default reducer;
