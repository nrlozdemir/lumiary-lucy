import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/panoptic'

import panopticMockData from 'Api/mocks/panopticMock.json'

import {
  compareSharesData,
  radarChartCalculate,
  convertDataIntoDatasets,
  getDateBucketFromRange,
  getBrandAndCompetitors,
} from 'Utils'

import { getDataFromApi } from 'Utils/api'

import _ from 'lodash'
import { dayOfWeek } from 'Utils/globals'

function getMockPanopticDataApi() {
  return axios.get('/').then((res) => panopticMockData)
}

function* getVideoReleasesData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getVideoReleasesDataSuccess(payload.videoReleasesData))
  } catch (err) {
    yield put(actions.getVideoReleasesDataError(err))
  }
}

function* getColorTemperatureData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    let shuffleData = payload.colorTempData
    shuffleData = shuffleData.map((data) => {
      data.data.map((item) => {
        item.x = _.random(-50, 50)
        item.y = _.random(-50, 50)
      })
      return data
    })

    const colors = [
      'rgba(82, 146, 229, 0.8)',
      '#acb0be',
      'rgba(133, 103, 240, 0.8)',
      'rgba(81, 173, 192, 0.8)',
    ]
    shuffleData = shuffleData.map((data) => {
      data.data.map((item, i) => {
        item.color = colors[i]
      })
      return data
    })
    yield put(actions.getColorTemperatureDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getColorTemperatureDataError(err))
  }
}

function* getFilteringSectionData({ data }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const { property, metric, platform, dateRange } = data

    const options = {
      metric,
      platform,
      dateRange,
      dateBucket: 'none',
      display: 'percentage',
      property: [property],
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
      !!doughnutData.data[brand.name][property] &&
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

          property,
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
    yield put(actions.getFilteringSectionDataError(err))
  }
}

function* getPacingCardData({ data }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const { metric, dateRange } = data

    const options = {
      metric,
      dateRange,
      platform: 'all',
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      url: '/report',
      brands: [brand.uuid],
    }

    const stadiumData = yield call(getDataFromApi, options)
    const horizontalStackedBarData = yield call(getDataFromApi, {
      ...options,
      proportionOf: 'format',
    })

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

function* getCompareSharesData({ data: { dateRange } }) {
  try {
    const parameters = {
      dateRange,
      metric: 'shares',
      property: ['color'],
      dateBucket: 'none',
      url: '/report',
    }

    const payload = yield all([
      call(getDataFromApi, {
        ...parameters,
        platform: 'facebook',
      }),
      call(getDataFromApi, {
        ...parameters,
        platform: 'youtube',
      }),
    ])

    yield put(
      actions.getCompareSharesDataSuccess(
        radarChartCalculate(compareSharesData(payload))
      )
    )
  } catch (err) {
    yield put(actions.getCompareSharesDataError(err))
  }
}

function* getData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getDataSuccess(payload))
  } catch (err) {
    yield put(actions.getDataError(err))
  }
}

function* getFlipCardsData() {
  try {
    const metrics = yield call(getDataFromApi, {
      url: '/metric',
      requestType: 'GET',
    })
    const payloads = Object.assign(
      {},
      ...Object.keys(metrics).map((metric) => ({
        [metric]: {
          percentage: metrics[metric].changeOverPrevious,
          data: dayOfWeek.map((day) => metrics[metric][day]),
          isEmpty: dayOfWeek.every((day) =>
            metrics[metric][day] === 0 ? true : false
          ),
        },
      }))
    )
    yield put(actions.getFlipCardsDataSuccess(payloads))
  } catch (err) {
    console.log(err)
    yield put(actions.getFlipCardsDataError(err))
  }
}

function* getTopPerformingFormatData({ data }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const { platform = 'all' } = data

    const options = {
      platform,
      metric: 'cvScore',
      dateRange: 'week',
      dateBucket: 'dayOfWeek',
      display: 'percentage',
      property: ['format'],
      url: '/report',
      brands: [brand.uuid],
    }

    const topPerformingFormatData = yield call(getDataFromApi, options)

    const payload = yield call(getMockPanopticDataApi)

    if (
      !!topPerformingFormatData.data &&
      !!topPerformingFormatData.data[brand.name] &&
      !!topPerformingFormatData.data[brand.name].format
    ) {
      console.log('api payload', topPerformingFormatData)
    }

    yield put(
      actions.getTopPerformingFormatDataSuccess(payload.topPerformingFormatData)
    )
  } catch (err) {
    console.log('getTopPerformingFormatData error', err)
    yield put(actions.getTopPerformingFormatDataError(err))
  }
}

export default [
  takeLatest(types.GET_DATA, getData),
  takeLatest(types.GET_VIDEO_RELEASES_DATA, getVideoReleasesData),
  takeLatest(types.GET_COLOR_TEMPERATURE_DATA, getColorTemperatureData),
  takeLatest(types.GET_FILTERING_SECTION_DATA, getFilteringSectionData),
  takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
  takeLatest(types.GET_COMPARE_SHARES_DATA, getCompareSharesData),
  takeLatest(types.GET_FLIPCARDS_DATA, getFlipCardsData),
  takeLatest(types.GET_TOP_PERFORMING_FORMAT_DATA, getTopPerformingFormatData),
]
