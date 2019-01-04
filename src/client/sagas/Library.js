// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest, all } from "redux-saga/effects";
import { types } from "Reducers/Library";
import { actions } from "Reducers/Library";
import { get } from "Api/utils";

export function* getVideos() {
	const requestURL = `videos`;
	try {
		const videos = yield call(get, requestURL);
		yield put(actions.loadVideosSuccess(videos));
	} catch (err) {
		yield put(actions.loadVideosError(err));
	}
}
export default function* librarySaga() {
	yield takeLatest(types.LOAD_VIDEOS, getVideos);
}
