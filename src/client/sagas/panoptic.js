import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/panoptic'

import panopticMockData from 'Api/mocks/panopticMock.json'

import { radarChartCalculate, convertDataIntoDatasets } from 'Utils'
import { compareSharesData } from 'Utils/api'

import { getReportDataApi } from 'Api'

import _ from 'lodash'

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

function* getFilteringSectionData(data) {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(
      actions.getFilteringSectionDataSuccess(payload.verticalStackedChartData)
    )
  } catch (err) {
    yield put(actions.getFilteringSectionDataError(err))
  }
}

function* getPacingCardData({ data }) {
  try {
    const { metric, dateRange } = data

    const options = {
      metric,
      dateRange,
      platform: 'all',
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
    }

    const stadiumData = yield call(getReportDataApi, options)
    const horizontalStackedBarData = yield call(getReportDataApi, {
      ...options,
      proportionOf: 'format',
    })

    if (
      !!stadiumData.data &&
      !!stadiumData.data.pacing &&
      !!horizontalStackedBarData.data &&
      !!horizontalStackedBarData.data.pacing
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
        actions.getPacingCardDataError('Error fetching pacing card data')
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
    }

    const payload = yield all([
      call(getReportDataApi, {
        ...parameters,
        platform: 'facebook',
      }),
      call(getReportDataApi, {
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
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getFlipCardsDataSuccess(payload.flipCardsData))
  } catch (err) {
    yield put(actions.getFlipCardsDataError(err))
  }
}

function* getTopPerformingFormatData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(
      actions.getTopPerformingFormatDataSuccess(payload.topPerformingFormatData)
    )
  } catch (err) {
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
