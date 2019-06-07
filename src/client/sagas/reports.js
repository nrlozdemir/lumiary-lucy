import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { push } from 'connected-react-router'
import { types, actions } from 'Reducers/reports'
import generatedReportMockData from 'Api/mocks/generatedReportMock.json'
import reportsDataMockData from 'Api/mocks/reportsMock.json'
import reportsMockData from 'Api/mocks/reports.json'
import querystring from 'querystring'

import {
  randomKey,
  convertDataIntoDatasets,
  compareSharesData,
  radarChartCalculate,
  getBrandAndCompetitors,
  getFilteredCompetitors,
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

function getReportsMockApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => reportsDataMockData)
}

function* getReports() {
  try {
    const { reports, compareReports } = yield call(getReportsApi)
    yield put(actions.loadReportsSuccess([...reports, ...compareReports]))
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

function* brandInsightSubmit({ payload }) {
  try {
    const {
      brand: { value: brand },
      social: { value: social },
      engagement: { value: engagement },
      date: { value: date },
      title,
    } = payload

    const parameters = {
      brands: [brand],
      social,
      engagement,
      date,
      title,
    }

    yield put(actions.brandInsightFormSubmitSuccess(parameters))
    yield put(push(`/reports/brand-insight`))
  } catch (err) {
    yield put(actions.brandInsightFormSubmitError(err))
  }
}

function* compareBrandSubmit({ payload }) {
  try {
    const { title, ...brands } = payload

    const filteredBrands = Object.keys(brands).filter((brand) => brands[brand])

    const parameters = {
      title,
      brands: filteredBrands,
    }

    yield put(actions.compareBrandFormSubmitSuccess(parameters))
    yield put(push(`/reports/compare-brands`))
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
    const response = yield call((() => {
      return getDataFromApi(
        {}, 
        `/report/compare/brands?${querystring.stringify({
          "brands": [
            "d65aa957-d094-4cf3-8d37-dafe50e752ea",
            "1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6"
          ],
          "property": "cvScore",
          "mode": "sumVideos",
          "daterange": "3months",
          "platform": "all"
        })}`, 
        'GET'
      )
      .then((response) => {
        if(response.error) {
          throw response.error
        }

        return response
      })
    }), {})

    yield put(actions.getContentVitalityScoreDataSuccess(response))
  } catch (err) {
    console.log(err)
    yield put(actions.getContentVitalityScoreDataError(err))
  }
}

function* getVideoComparisonData({ data: { dateRange, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      url: '/report',
      dateRange,
      metric: 'views',
      property: ['format'],
      dateBucket: 'none',
      brands: [...filteredCompetitors],
    }

    const payload = yield call(getDataFromApi, parameters)

    yield put(
      actions.getVideoComparisonDataSuccess(
        convertDataIntoDatasets(payload, parameters)
      )
    )
  } catch (err) {
    yield put(actions.getVideoComparisonDataError(err))
  }
}

function* getPerformanceComparisonData({ data: { metric, property, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      url: '/report',
      dateRange: '24hours',
      metric,
      property: [property],
      dateBucket: 'none',
      brands: [...filteredCompetitors],
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

function* getColorComparisonData({ data: { metric, dateRange, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const parameters = {
      url: '/report',
      dateRange,
      metric,
      property: ['color'],
      dateBucket: 'none',
      brands: [...filteredCompetitors],
    }

    const payload = yield call(getDataFromApi, parameters)

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
