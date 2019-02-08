import { takeLatest, call, put } from "redux-saga/effects";

import { types, actions } from "Reducers/Library";
import { getLibraryApi } from "Api/Library";

function* getVideos() {
	try {
		const payload = yield call(getLibraryApi);

		yield put(actions.loadVideosSuccess(payload));
	} catch (err) {
		yield put(actions.loadVideosError(err));
	}
}

export default [takeLatest(types.LOAD_VIDEOS, getVideos)];
