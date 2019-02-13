import { takeLatest, call, put } from 'redux-saga/effects';

import { types, actions } from 'Reducers/marketview';
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json';

function getCompetitorTopVideosApi() {
  return marketviewCompetitorTopVideosData;
}

function* getCompetitorTopVideosMarketview() {
  try{
    const payload = yield call(getCompetitorTopVideosApi);
    yield put(actions.getCompetitorTopVideosSuccess(payload));
  }catch(e) {
    yield put(actions.getCompetitorTopVideosFailure({ e }));
  }
}

export default [takeLatest(types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideosMarketview)];