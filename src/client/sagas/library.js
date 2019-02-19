import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';

import { types, actions } from "Reducers/library";
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

export default [takeLatest(types.LOAD_VIDEOS, getVideos)];
