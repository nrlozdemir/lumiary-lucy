import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';

import { types, actions } from "Reducers/libraryDetail";
import libraryDetailMockData from 'Api/mocks/libraryDetailMock.json';

function getLibraryDetailApi({ libraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => libraryDetailMockData)
}

function* getLibraryDetail({ payload: { LibraryDetailId } }) {
	try {
		const payload = yield call(getLibraryDetailApi, {
			LibraryDetailId
		});
		yield put(actions.getLibraryDetailSuccess(payload));
	} catch (error) {
		yield put(actions.getLibraryDetailFailure({ error }));
	}
}

export default [takeLatest(types.GET_LIBRARY_DETAIL_REQUEST, getLibraryDetail)];
