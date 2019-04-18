import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'
import { types, actions } from 'Reducers/reports'
import reportsMockData from 'Api/mocks/reportsMock.json'
import { randomKey } from 'Utils/index'
import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
}

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

function* brandInsightSubmit(values) {
  console.log(values)
  try {
    const payload = yield call(getGeneratedReportApi)
    yield put(actions.brandInsightFormSubmitSuccess(payload))
    yield put(push('/reports/asdas'))
  } catch (err) {
    yield put(actions.brandInsightFormSubmitError(err))
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
  takeLatest(types.BRAND_INSIGHT_REQUEST, brandInsightSubmit),
  takeLatest(types.DELETE_REPORT, deleteReport),
]
