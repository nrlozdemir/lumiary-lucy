import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import axios from 'axios'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/generatedReport'

import generatedReportMockData from 'Api/mocks/generatedReportMock.json'
import reportsMockData from 'Api/mocks/reports.json'

import {
  convertDataIntoDatasets,
  getDateBucketFromRange,
  convertMultiRequestDataIntoDatasets,
  getBrandAndCompetitors,
  getFilteredCompetitors,
} from 'Utils'
import { getDataFromApi } from 'Utils/api'
import _ from 'lodash'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
}

function getReportsApi() {
  return axios.get('/').then((res) => reportsMockData)
}

function* saveReport({ data }) {
  try {
    const { category } = data

    if (category === 'Brands Insights') {
      const { brands, social, engagement, date, title } = data

      const parameters = {
        baseUrl: true,
        url: '/createReport',
        brand: brands[0],
        social,
        engagement,
        date,
        title,
      }

      const response = yield call(getDataFromApi, parameters)

      yield put(actions.saveReportSuccess(response))
      yield put(push(`/reports/brand-insight/${response.id}`))
    } else if (category === 'Compare Brands') {
      const { title, brands } = data

      const parameters = {
        baseUrl: true,
        url: '/createCompareReport',
        title,
        brands,
      }

      const response = yield call(getDataFromApi, parameters)

      yield put(actions.saveReportSuccess(response))
      yield put(push(`/reports/compare-brands/${response.id}`))
    }
  } catch (err) {
    yield put(actions.saveReportFailure(err))
  }
}

function* getReport({ data: { id } }) {
  try {
    let { reports, compareReports } = yield call(getReportsApi)

    const report = [...reports, ...compareReports].find(
      (report) => report.id === id
    )

    yield put(actions.getReportSuccess(report))
  } catch (err) {
    yield put(actions.getReportFailure(err))
  }
}

function* getTopPerformingVideos() {
  try {
    let { topPerformingVideos } = yield call(getGeneratedReportApi)
    yield put(actions.getTopPerformingVideosSuccess(topPerformingVideos))
  } catch (err) {
    yield put(actions.getTopPerformingVideosFailure(err))
  }
}

function* getVideoReleasesBarChart() {
  try {
    let { videoReleasesData } = yield call(getGeneratedReportApi)
    yield put(actions.getVideoReleasesBarChartSuccess(videoReleasesData))
  } catch (err) {
    yield put(actions.getVideoReleasesBarChartFailure(err))
  }
}

function* getColorTempData() {
  try {
    let { colorTempData } = yield call(getGeneratedReportApi)
    yield put(actions.getColorTempDataSuccess(colorTempData))
  } catch (err) {
    yield put(actions.getColorTempDataFailure(err))
  }
}

function* getFilteringSectionData({ data: { dateRange, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const options = {
      dateRange,
      metric: report.engagement,
      platform: report.social,
      dateBucket: 'none',
      display: 'percentage',
      property: ['duration'],
      url: '/report',
      brands: [...filteredCompetitors],
    }

    const doughnutData = yield call(getDataFromApi, options)

    const dateBucket = getDateBucketFromRange(dateRange)

    const stackedChartData =
      dateBucket !== 'none'
        ? yield call(getDataFromApi, {
            ...options,
            dateBucket,
          })
        : { data: {} }

    yield put(
      actions.getFilteringSectionDataSuccess({
        doughnutData: convertDataIntoDatasets(doughnutData, options, {
          singleDataset: true,
        }),
        stackedChartData:
          (!_.isEmpty(stackedChartData.data) &&
            convertDataIntoDatasets(
              stackedChartData,
              { ...options, dateBucket },
              { borderWidth: { top: 3, right: 0, bottom: 0, left: 0 } }
            )) ||
          {},
        property: 'duration',
      })
    )
  } catch (err) {
    yield put(
      // empty data
      actions.getFilteringSectionDataSuccess({
        doughnutData: {
          total: 0,
        },
        stackedChartData: {},
      })
    )
    yield put(actions.getFilteringSectionDataFailure(err))
  }
}

function* getPacingCardData({ data: { report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const options = {
      metric: report.engagement,
      platform: report.social,
      dateRange: report.date,
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      url: '/report',
      brands: [...filteredCompetitors],
    }

    const [stadiumData, horizontalStackedBarData] = yield all([
      call(getDataFromApi, options),
      call(getDataFromApi, {
        ...options,
        proportionOf: 'format',
      }),
    ])

    yield put(
      actions.getPacingCardDataSuccess({
        stadiumData: convertDataIntoDatasets(stadiumData, options),
        horizontalStackedBarData: convertDataIntoDatasets(
          horizontalStackedBarData,
          {
            ...options,
            proportionOf: 'format',
          }
        ),
      })
    )
  } catch (err) {
    console.log(err)
    yield put(actions.getPacingCardDataFailure(err))
  }
}

function* getCompetitorTopVideos({ data: { property, report } }) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const filteredCompetitors = getFilteredCompetitors(competitors, report)

    const options = {
      metric: report.engagement,
      platform: report.social,
      dateRange: report.date,
      property: [property],
      dateBucket: 'none',
      display: 'percentage',
      url: '/report',
      brands: [...filteredCompetitors],
    }

    const [facebook, instagram, twitter, youtube] = yield all([
      call(getDataFromApi, { ...options, platform: 'facebook' }),
      call(getDataFromApi, { ...options, platform: 'instagram' }),
      call(getDataFromApi, { ...options, platform: 'twitter' }),
      call(getDataFromApi, { ...options, platform: 'youtube' }),
    ])

    yield put(
      actions.getCompetitorTopVideosSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            facebook,
            instagram,
            twitter,
            youtube,
          },
          options
        )
      )
    )
  } catch (error) {
    yield put(actions.getCompetitorTopVideosFailure(error))
  }
}

export default [
  takeLatest(types.GET_REPORT_REQUEST, getReport),
  takeLatest(types.SAVE_REPORT_REQUEST, saveReport),
  takeLatest(types.GET_PACING_CARD_DATA_REQUEST, getPacingCardData),
  takeLatest(types.GET_COMPETITOR_TOP_VIDEOS_REQUEST, getCompetitorTopVideos),
  takeLatest(types.GET_TOP_PERFORMING_VIDEOS_REQUEST, getTopPerformingVideos),
  takeLatest(
    types.GET_VIDEO_RELEASES_BAR_CHART_REQUEST,
    getVideoReleasesBarChart
  ),
  takeLatest(types.GET_COLOR_TEMP_DATA_REQUEST, getColorTempData),
  takeLatest(types.GET_FILTERING_SECTION_DATA_REQUEST, getFilteringSectionData),
]
