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

function* getPerformanceComparisonData() {
  try {
    const payload = yield call(getReportsApi)

    let shuffleData = payload.performanceComparisonData
    shuffleData.doughnutData.datasets[0].data = _.shuffle(
      shuffleData.doughnutData.datasets[0].data
    )

    shuffleData.stackedChartData.datasets[0].data.forEach((item, index) => {
      let randomNumber = _.random(10, 90)
      shuffleData.stackedChartData.datasets[0].data[index] = randomNumber
      shuffleData.stackedChartData.datasets[1].data[index] = 100 - randomNumber
    })
    yield put(actions.getPerformanceComparisonDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getPerformanceComparisonDataError(err))
  }
}

function* getColorComparisonData() {
  try {
    const payload = yield call(getReportsApi)
    let shuffleData = payload.colorComparisonData
    shuffleData[0].datas.datasets[0].data = _.shuffle(
      shuffleData[0].datas.datasets[0].data
    )
    shuffleData[1].datas.datasets[0].data = _.shuffle(
      shuffleData[1].datas.datasets[0].data
    )
    yield put(actions.getColorComparisonDataSuccess(shuffleData))
  } catch (err) {
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
