import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { types, actions } from 'Reducers/reports'
import reportsMockData from 'Api/mocks/reportsMock.json'
import { randomKey } from 'Utils/index'

function getReportsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => reportsMockData)
}

function* getReports() {
  try {
    const payload = yield call(getReportsApi)
    payload.map((item) => (item.id = randomKey(4)))
    yield put(actions.loadReportsSuccess(payload))
  } catch (err) {
    yield put(actions.loadReportsError(err))
  }
}

function* getMoreReports() {
  try {
    const payload = yield call(getReportsApi)
    payload.map((item) => (item.id = randomKey(4)))
    yield put(actions.loadMoreReportsSuccess(payload))
  } catch (err) {
    yield put(actions.loadMoreReportsError(err))
  }
}

function* deleteReport(data) {
  yield put(actions.loadDeleteReportSuccess(data.payload))
  // try {

  // } catch (err) {
  //   yield put(actions.loadDeleteReportError(err))
  // }
}

export default [
  takeLatest(types.LOAD_REPORTS, getReports),
  takeLatest(types.LOAD_MORE_REPORTS, getMoreReports),
  takeLatest(types.DELETE_REPORT, deleteReport),
]
