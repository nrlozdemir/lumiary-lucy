import { takeLatest, call, put } from 'redux-saga/effects';

import { types, actions } from 'Reducers/Marketview';
import { getCompetitorVideos } from 'Api/Marketview';

function* getCompetitorVideosMarketview() {
	try {
		const payload = yield call(getCompetitorVideos);
		console.log(payload);
		yield put(actions.getCompetitorVideosSuccess(payload));
	} catch (error) {
		yield put(actions.getCompetitorVideosFailure({ error }));
	}
}

export default [takeLatest(types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST, getCompetitorVideosMarketview)];
