import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { ajax } from 'Utils/api'
import qs from 'qs'

import {
  types,
  actions,
  makeSelectSelectedVideoID,
} from 'Reducers/libraryDetail'
import mock from 'Api/mocks/libraryMock.json'
import { findIdDetail } from 'Utils/api'

const RESOURCE = '/brand/d65aa957-d094-4cf3-8d37-dafe50e752ea'

function getOneVideo({ payload }) {
  return ajax({
    url: `${RESOURCE}/video/${payload}`,
    method: 'GET',
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function getBarChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'HeaderBarChartMock'))
}
function getDoughnutChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'DoughnutChartMock'))
}
function getColorTempApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  console.log(LibraryDetailId)
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'ColorTempMock'))
}
function getShotByShotApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'ShotByShotMock'))
}

function* getBarChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getBarChartApi, {
      LibraryDetailId,
    })
    yield put(actions.getBarChartSuccess(payload))
  } catch (error) {
    yield put(actions.getBarChartFailure({ error }))
  }
}

function* getDoughnutChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getDoughnutChartApi, {
      LibraryDetailId,
    })
    yield put(actions.getDoughnutChartSuccess(payload))
  } catch (error) {
    yield put(actions.getDoughnutChartFailure({ error }))
  }
}

function* getColorTemperatureData({ payload: { LibraryDetailId } }) {
  try {
    const id = yield select(makeSelectSelectedVideoID())
    console.log(id)
    const payload = yield call(getColorTempApi, {
      LibraryDetailId,
    })

    console.log(payload)

    yield put({
      type: types.GET_COLOR_TEMP_SUCCESS,
      payload: payload.colorTempData,
    })
  } catch (err) {
    yield put(actions.getColorTempFailure(err))
  }
}

function* getShotByShot({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getShotByShotApi, {
      LibraryDetailId,
    })
    yield put(actions.getShotByShotSuccess(payload))
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }))
  }
}

function* getSelectedVideo({ payload }) {
  try {
    const data = yield call(getOneVideo, {
      payload,
    })
    yield put(actions.getSelectedVideoSuccess(data.video))
  } catch (error) {
    yield put(actions.getSelectedVideoFailure({ error }))
  }
}

export default [
  takeLatest(types.GET_BAR_CHART_REQUEST, getBarChart),
  takeLatest(types.GET_DOUGHNUT_CHART_REQUEST, getDoughnutChart),
  takeLatest(types.GET_COLOR_TEMP_REQUEST, getColorTemperatureData),
  takeLatest(types.GET_SHOT_BY_SHOT_REQUEST, getShotByShot),
  takeLatest(types.GET_SELECTED_VIDEO_REQUEST, getSelectedVideo),
]
