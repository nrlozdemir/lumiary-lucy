import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { types, actions } from 'Reducers/marketview';
import marketviewCompetitorVideosData from 'Api/mocks/marketviewCompetitorVideos.json';
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json';

function getCompetitorVideosApi() {
  return axios('/')
  .then(res => marketviewCompetitorVideosData);
}

function getCompetitorTopVideosApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewCompetitorTopVideosData)
}

function* getCompetitorVideosMarketview() {
  try {
    const payload = yield call(getCompetitorVideosApi);
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