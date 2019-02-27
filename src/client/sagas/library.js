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

function* getFilteredVideos({ filterText }) {
	try {
		let payload = yield call(getLibraryApi);
		if(filterText.length && payload){
			payload = payload.filter(item => {
				return item.title.includes(filterText);
			});
			yield put(actions.filterVideosSuccess(payload))
		} else{
			yield put(actions.filterVideosSuccess(payload))
		}
	} catch (err) {
		yield put(actions.filterVideosError(err))
	}
}

function* getFilteredTitles({ filterText }) {
	try {
		let payload = yield call(getLibraryApi);
		if(filterText.length && payload){
			payload = payload.filter(item => {
				return item.title.includes(filterText);
			}).map(item => {return {label: item.title, value:item.id}});
			console.log('Payload', payload)
			yield put(actions.filterTextListSuccess(payload))
		}
	} catch (err) {
		yield put(actions.filterTextListError(err))
	}
}

export default [
	takeLatest(types.LOAD_VIDEOS, getVideos),
	takeLatest(types.FILTER_VIDEOS, getFilteredVideos),
	takeLatest(types.FILTER_TEXT_LIST, getFilteredTitles)
];
