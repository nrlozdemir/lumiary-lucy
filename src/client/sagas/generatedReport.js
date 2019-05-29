import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/generatedReport'

import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

import { convertDataIntoDatasets } from 'Utils'
import { getDataFromApi } from 'Utils/api'
import _ from 'lodash'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
}

function* getTopVideosCard() {
  try {
    let { topVideosOverTime } = yield call(getGeneratedReportApi)
    yield put(actions.getTopVideosCardSuccess(topVideosOverTime))
  } catch (err) {
    yield put(actions.getTopVideosCardFailure(err))
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

function* getPacingCardData({ data: { reportId } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      reportId,
      metric: 'views',
      dateRange: '24hours',
      platform: 'all',
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
      url: '/report',
    }

    const [stadiumData, horizontalStackedBarData] = yield all([
      call(getDataFromApi, options),
      call(getDataFromApi, {
        ...options,
        proportionOf: 'format',
      }),
    ])

    if (
      !!stadiumData.data &&
      !!stadiumData.data[brand.name] &&
      !!stadiumData.data[brand.name].pacing &&
      !!horizontalStackedBarData.data &&
      !!horizontalStackedBarData.data[brand.name] &&
      !!horizontalStackedBarData.data[brand.name].pacing
    ) {
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
    } else {
      yield put(
        actions.getPacingCardDataError('Error fetching Pacing Card data')
      )
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getPacingCardDataError(err))
  }
}

export default [
  takeLatest(types.GET_PACING_CARD_DATA_REQUEST, getPacingCardData),
  takeLatest(types.GET_TOP_VIDEOS_CARD_REQUEST, getTopVideosCard),
  takeLatest(types.GET_TOP_PERFORMING_VIDEOS_REQUEST, getTopPerformingVideos),
  takeLatest(
    types.GET_VIDEO_RELEASES_BAR_CHART_REQUEST,
    getVideoReleasesBarChart
  ),
  takeLatest(types.GET_COLOR_TEMP_DATA_REQUEST, getColorTempData),
]
