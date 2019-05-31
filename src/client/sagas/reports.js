import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'
import { types, actions } from 'Reducers/reports'
import reportsMockData from 'Api/mocks/reportsMock.json'
import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

import {
  randomKey,
  convertDataIntoDatasets,
  compareSharesData,
  radarChartCalculate,
  getBrandAndCompetitors,
} from 'Utils'

import { getDataFromApi } from 'Utils/api'
import { selectAuthProfile } from 'Reducers/auth'

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
    payload.reportsData.reportsData.map((item) => (item.id = randomKey(4)))
    yield put(actions.loadReportsSuccess(payload.reportsData))
  } catch (err) {
    yield put(actions.loadReportsError(err))
  }
}

function* getMoreReports() {
  try {
    const payload = yield call(getReportsApi)
    payload.reportsData.map((item) => (item.id = randomKey(4)))
    yield put(actions.loadMoreReportsSuccess(payload.reportsData))
  } catch (err) {
    yield put(actions.loadMoreReportsError(err))
  }
}

function* brandInsightSubmit(values) {
  const id = `${randomKey(4)}-${randomKey(4)}-${randomKey(4)}-${randomKey(4)}`
  try {
    const payload = yield call(getGeneratedReportApi)
    yield put(actions.brandInsightFormSubmitSuccess(payload))
    yield put(push(`/reports/brand-insight/${id}`))
  } catch (err) {
    yield put(actions.brandInsightFormSubmitError(err))
  }
}

function* compareBrandSubmit(values) {
  const id = `${randomKey(4)}-${randomKey(4)}-${randomKey(4)}-${randomKey(4)}`
  try {
    const payload = yield call(getGeneratedReportApi)
    yield put(actions.compareBrandFormSubmitSuccess(payload))
    yield put(push(`/reports/compare-brands/${id}`))
  } catch (err) {
    yield put(actions.compareBrandFormSubmitError(err))
  }
}

function* predefinedReportSubmit(values) {
  const id = `${randomKey(4)}-${randomKey(4)}-${randomKey(4)}-${randomKey(4)}`
  try {
    const payload = yield call(getGeneratedReportApi)
    yield put(actions.predefinedReportFormSubmitSuccess(payload))
    yield put(push(`/reports/predefined-reports/${id}`))
  } catch (err) {
    yield put(actions.predefinedReportFormSubmitError(err))
  }
}

function* deleteReport(data) {
  yield put(actions.loadDeleteReportSuccess(data.payload))
  // try {

  // } catch (err) {
  //   yield put(actions.loadDeleteReportError(err))
  // }
}

function* getContentVitalityScoreData() {
  try {
    const payload = yield call(getReportsApi)
    let shuffleData = payload.contentVitalityScoreData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(actions.getContentVitalityScoreDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getContentVitalityScoreDataError(err))
  }
}

function* getVideoComparisonData() {
  try {
    const payload = yield call(getReportsApi)
    let shuffleData = payload.videoComparisonData
    shuffleData[0].datasets[0].data = _.shuffle(shuffleData[0].datasets[0].data)
    shuffleData[1].datasets[0].data = _.shuffle(shuffleData[1].datasets[0].data)
    yield put(actions.getVideoComparisonDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getVideoComparisonDataError(err))
  }
}

function* getPerformanceComparisonData({ data: { metric, property } }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const parameters = {
      url: '/report',
      dateRange: '24hours',
      metric,
      property: [property],
      dateBucket: 'none',
      brands: [competitors[0], competitors[1]],
    }

    const payload = yield call(getDataFromApi, parameters)

    yield put(
      actions.getPerformanceComparisonDataSuccess(
        convertDataIntoDatasets(payload, parameters)
      )
    )
  } catch (err) {
    yield put(actions.getPerformanceComparisonDataError(err))
  }
}

function* getColorComparisonData({ data: { metric, dateRange } }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)
    const parameters = {
      url: '/report',
      dateRange,
      metric,
      property: ['color'],
      dateBucket: 'none',
      brands: [brand.uuid],
    }

    const payload = yield all([
      call(getDataFromApi, {
        ...parameters,
        brand: competitors[0],
      }),
      call(getDataFromApi, {
        ...parameters,
        brand: competitors[1],
      }),
    ])

    yield put(
      actions.getColorComparisonDataSuccess(
        radarChartCalculate(compareSharesData(payload))
      )
    )
  } catch (err) {
    console.log('err', err)
    yield put(actions.getColorComparisonDataError(err))
  }
}

export default [
  takeLatest(types.LOAD_REPORTS, getReports),
  takeLatest(types.LOAD_MORE_REPORTS, getMoreReports),
  takeLatest(types.BRAND_INSIGHT_REQUEST, brandInsightSubmit),
  takeLatest(types.COMPARE_BRAND_REQUEST, compareBrandSubmit),
  takeLatest(types.PREDEFINED_REPORT_REQUEST, predefinedReportSubmit),
  takeLatest(types.DELETE_REPORT, deleteReport),
  takeLatest(
    types.GET_CONTENT_VITALITY_SCORE_DATA,
    getContentVitalityScoreData
  ),
  takeLatest(types.LOAD_VIDEO_COMPARISON_DATA, getVideoComparisonData),
  takeLatest(
    types.LOAD_PERFORMANCE_COMPARISON_DATA,
    getPerformanceComparisonData
  ),
  takeLatest(types.LOAD_COLOR_COMPARISON_DATA, getColorComparisonData),
]
