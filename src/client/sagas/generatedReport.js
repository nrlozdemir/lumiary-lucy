import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/generatedReport'

import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

import {
  convertDataIntoDatasets,
  getDateBucketFromRange,
  convertMultiRequestDataIntoDatasets,
} from 'Utils'
import { getDataFromApi } from 'Utils/api'
import _ from 'lodash'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
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

function* getFilteringSectionData({ data: { dateRange, reportId } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      reportId,
      dateRange,
      metric: 'views',
      platform: 'all',
      dateBucket: 'none',
      display: 'percentage',
      property: ['duration'],
      url: '/report',
      brands: [brand.uuid],
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

    if (
      !!doughnutData.data &&
      !!doughnutData.data[brand.name] &&
      !!doughnutData.data[brand.name]['duration'] &&
      stackedChartData.data
    ) {
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
    } else {
      throw 'Error fetching FilteringSection data'
    }
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
        actions.getPacingCardDataFailure('Error fetching Pacing Card data')
      )
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getPacingCardDataFailure(err))
  }
}

function* getCompetitorTopVideos({ data: { resolution } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      metric: 'views',
      dateRange: '24hours',
      property: ['resolution'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
      url: '/report',
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
