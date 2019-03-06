import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { types, actions } from 'Reducers/marketview';
import marketviewCompetitorVideosData from 'Api/mocks/marketviewCompetitorVideos.json';
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json';
import marketviewSimilarPropertiesData from 'Api/mocks/marketviewSimilarProperties.json';
import marketviewBubleChartData from 'Api/mocks/marketviewBubleChartMock.json';
import marketviewPacingChartData from 'Api/mocks/marketviewPacingChartMock.json';
import marketviewFormatChartData from 'Api/mocks/marketviewFormatChartMock.json';
import marketviewTotalViewsData from 'Api/mocks/marketviewTotalViewsMock.json';
import marketviewTotalCompetitorViewsData from 'Api/mocks/marketviewTotalCompetitorViewsMock.json';

function getCompetitorVideosApi() {
  return axios('/')
  .then(res => marketviewCompetitorVideosData);
}

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

function getBubleChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewBubleChartData)
}

function getPacingChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewPacingChartData)
}

function getFormatChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewFormatChartData)
}

function getTotalViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewTotalViewsData)
}

function getTotalCompetitorViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => marketviewTotalCompetitorViewsData)
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

function* getSimilarProperties() {
  try {
    const payload = yield call(getSimilarPropertiesApi);
    yield put(actions.getSimilarPropertiesSuccess(payload));
  } catch (error) {
    yield put(actions.getSimilarPropertiesFailure(error));
  }
}

function* getBubleChartData() {
  try {
    const payload = yield call(getBubleChartApi);
    yield put(actions.getBubleChartSuccess(payload));
  } catch (error) {
    yield put(actions.getBubleChartFailure(error));
  }
}

function* getPacingChartData() {
  try {
    const payload = yield call(getPacingChartApi);
    yield put(actions.getPacingChartSuccess(payload));
  } catch (error) {
    yield put(actions.getPacingChartFailure(error));
  }
}

function* getFormatChartData() {
  try {
    const payload = yield call(getFormatChartApi);
    yield put(actions.getFormatChartSuccess(payload));
  } catch (error) {
    yield put(actions.getFormatChartFailure(error));
  }
}

function* getTotalViewsData() {
  try {
    const payload = yield call(getTotalViewsApi);
    yield put(actions.getTotalViewsSuccess(payload));
  } catch (error) {
    yield put(actions.getTotalViewsFailure(error));
  }
}

function* getTotalCompetitorViewsData() {
  try {
    const payload = yield call(getTotalCompetitorViewsApi);
    yield put(actions.getTotalCompetitorViewsSuccess(payload));
  } catch (error) {
    yield put(actions.getTotalCompetitorViewsFailure(error));
  }
}

export default [
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideosMarketview),
  takeLatest(types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST, getCompetitorVideosMarketview),
  takeLatest(types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST, getSimilarProperties),
  takeLatest(types.GET_MARKETVIEW_BUBLECHART_REQUEST, getBubleChartData),
  takeLatest(types.GET_MARKETVIEW_PACINGCHART_REQUEST, getPacingChartData),
  takeLatest(types.GET_MARKETVIEW_FORMATCHART_REQUEST, getFormatChartData),
  takeLatest(types.GET_MARKETVIEW_TOTALVIEWS_REQUEST, getTotalViewsData),
  takeLatest(types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST, getTotalCompetitorViewsData),
];