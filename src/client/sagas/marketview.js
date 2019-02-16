import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { types, actions } from 'Reducers/marketview';
import { getCompetitorVideos } from 'Api/Marketview';

//mocks
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json';
import marketviewSimilarPropertiesData from 'Api/mocks/marketviewSimilarProperties.json';

function getCompetitorTopVideosApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewCompetitorTopVideosData)
}

function getSimilarPropertiesApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewSimilarPropertiesData)
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

function* getSimilarProperties() {
  try {
    const payload = yield call(getSimilarPropertiesApi);
    yield put(actions.getSimilarPropertiesSuccess(payload));
  } catch (error) {
    yield put(actions.getSimilarPropertiesFailure(error));
  }
}

export default [
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideosMarketview),
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST, getCompetitorVideosMarketview),
  takeLatest(types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST, getSimilarProperties)
];