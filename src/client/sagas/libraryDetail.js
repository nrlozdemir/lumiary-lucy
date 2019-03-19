import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';

import { types, actions } from "Reducers/libraryDetail";
import mock from 'Api/mocks/libraryMock.json';
import { findIdDetail } from 'Utils/api'

function getBarChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => findIdDetail(mock, LibraryDetailId, 'HeaderBarChartMock'))
}
function getDoughnutChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => findIdDetail(mock, LibraryDetailId, 'DoughnutChartMock'))
}
function getColorTempApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => findIdDetail(mock, LibraryDetailId, 'ColorTempMock'))
}
function getShotByShotApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
    .then(res => findIdDetail(mock, LibraryDetailId, 'ShotByShotMock'))
}

function* getBarChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getBarChartApi, {
      LibraryDetailId
    });
    yield put(actions.getBarChartSuccess(payload));
  } catch (error) {
    yield put(actions.getBarChartFailure({ error }));
  }
}

function* getDoughnutChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getDoughnutChartApi, {
      LibraryDetailId
    });
    yield put(actions.getDoughnutChartSuccess(payload));
  } catch (error) {
    yield put(actions.getDoughnutChartFailure({ error }));
  }
}

function* getColorTemp({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getColorTempApi, {
      LibraryDetailId
    });
    yield put(actions.getColorTempSuccess(payload.colorTempData));
  } catch (error) {
    yield put(actions.getColorTempFailure({ error }));
  }
}

function* getShotByShot({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getShotByShotApi, {
      LibraryDetailId
    });
    yield put(actions.getShotByShotSuccess(payload));
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }));
  }
}

export default [
  takeLatest(types.GET_BAR_CHART_REQUEST, getBarChart),
  takeLatest(types.GET_DOUGHNUT_CHART_REQUEST, getDoughnutChart),
  takeLatest(types.GET_COLOR_TEMP_REQUEST, getColorTemp),
  takeLatest(types.GET_SHOT_BY_SHOT_REQUEST, getShotByShot),
];
