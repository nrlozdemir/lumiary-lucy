import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { types, actions } from 'Reducers/marketview';
import { getCompetitorVideos } from 'Api/Marketview';
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json';

function getCompetitorTopVideosApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewCompetitorTopVideosData)
}

function* getCompetitorVideosMarketview() {
  try {
    const payload = yield call(getCompetitorVideos);
    yield put(actions.getCompetitorVideosSuccess(payload));
  } catch (error) {
    yield put(actions.getCompetitorVideosFailure({ error }));
  }
}

function* getCompetitorTopVideosMarketview() {
  try{
    const payload = yield call(getCompetitorTopVideosApi);
    yield put(actions.getCompetitorTopVideosSuccess(payload));
  }catch(e) {
    yield put(actions.getCompetitorTopVideosFailure({ e }));
  }
}

export default [
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideosMarketview),
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST, getCompetitorVideosMarketview)
];