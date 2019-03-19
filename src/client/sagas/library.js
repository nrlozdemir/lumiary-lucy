import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from 'axios';

import { types, actions, makeSelectVideoFilters } from "Reducers/library";
import { sortVideos } from "Utils/sort-videos";
import libraryMockData from 'Api/mocks/libraryMock.json';

function getLibraryApi() {
	//this will use ajax function in utils/api when real data is provided
	return axios.get('/')
		.then(res => libraryMockData)
}

function* getVideos() {
	try {
		const payload = yield call(getLibraryApi);
		yield put(actions.loadVideosSuccess(payload));
	} catch (err) {
		yield put(actions.loadVideosError(err));
	}
}

function* changeFilter() {
	try {
		const payload = yield call(getLibraryApi);
		const filter = yield select(makeSelectVideoFilters());
		const sorted = sortVideos(payload, filter);

		yield put(actions.loadVideosSuccess(sorted));
	} catch (err) {
		yield put(actions.loadVideosError(err));
	}
}

export default [
	takeLatest(types.LOAD_VIDEOS, getVideos),
	takeLatest(types.CHANGE_FILTER, changeFilter)
];
