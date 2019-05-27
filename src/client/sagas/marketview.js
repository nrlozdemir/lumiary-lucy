import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

import { types, actions } from 'Reducers/marketview'
import marketviewCompetitorVideosData from 'Api/mocks/marketviewCompetitorVideos.json'
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json'
import marketviewSimilarPropertiesData from 'Api/mocks/marketviewSimilarProperties.json'
import marketviewBubbleChartData from 'Api/mocks/marketviewBubbleChartMock.json'
import marketviewPacingChartData from 'Api/mocks/marketviewPacingChartMock.json'
import marketviewFormatChartData from 'Api/mocks/marketviewFormatChartMock.json'
import marketviewTotalViewsData from 'Api/mocks/marketviewTotalViewsMock.json'
import marketviewTotalCompetitorViewsData from 'Api/mocks/marketviewTotalCompetitorViewsMock.json'
import marketviewTimeMockData from 'Api/mocks/marketviewTimeMock.json'
import marketviewTopPerformingProperties from 'Api/mocks/marketviewPlatformTopPerformingProperty.json'
import marketviewTopPerformingPropertiesCompetitors from 'Api/mocks/marketviewPlatformTopPerformingPropertyCompetitors.json'

import {
  convertMultiRequestDataIntoDatasets,
  getBrandAndCompetitors,
  convertDataIntoDatasets,
  getMaximumValueIndexFromArray,
} from 'Utils'
import { getDataFromApi } from 'Utils/api'

import { selectAuthProfile } from 'Reducers/auth'

function getCompetitorVideosApi() {
  return axios('/').then((res) => marketviewCompetitorVideosData)
}

function getBubbleChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewBubbleChartData)
}

function getPacingChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewPacingChartData)
}

function getFormatChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewFormatChartData)
}

function getTotalViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTotalViewsData)
}

function getTotalCompetitorViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTotalCompetitorViewsData)
}

function getMarketviewDaysApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTimeMockData)
}

function getGetTopPerformingPropertiesApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTopPerformingProperties)
}

function getGetTopPerformingPropertiesByCompetitorsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => marketviewTopPerformingPropertiesCompetitors)
}

function* getCompetitorVideosMarketview() {
  try {
    const payload = yield call(getCompetitorVideosApi)
    yield put(actions.getCompetitorVideosSuccess(payload))
  } catch (error) {
    yield put(actions.getCompetitorVideosFailure({ error }))
  }
}

function* getCompetitorTopVideosMarketview({
  data: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      metric,
      dateRange,
      property: [property],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
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

function* getSimilarProperties({ data: dateRange }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const expectedValues = [
      { key: 'color', title: 'Dominant Color' },
      { key: 'pacing', title: 'Pacing' },
      { key: 'duration', title: 'Duration' },
    ]

    const parameters = {
      dateRange,
      metric: 'views',
      platform: 'all',
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
    }

    const payloads = yield all(
      expectedValues.map((item) =>
        call(getReportDataApi, { ...parameters, property: [item.key] })
      )
    )

    const createCustomBackground = (data) => {
      return Object.values(data).map((item, idx) => {
        if (Object.values(data).includes(100)) {
          return '#2FD7C4'
        }
        return idx === getMaximumValueIndexFromArray(data)
          ? '#2FD7C4'
          : '#ffffff'
      })
    }

    yield put(
      actions.getSimilarPropertiesSuccess(
        expectedValues.map((item, idx) =>
          convertDataIntoDatasets(
            payloads[idx],
            {
              ...parameters,
              property: [item.key],
            },
            {
              singleDataset: true,
              backgroundColor: createCustomBackground(
                payloads[idx].data[payload.key]
              ),
            }
          )
        )
      )
    )
  } catch (error) {
    yield put(actions.getSimilarPropertiesFailure(error))
  }
}

function* getBubbleChartData() {
  try {
    const payload = yield call(getBubbleChartApi)
    yield put(actions.getBubleChartSuccess(payload))
  } catch (error) {
    yield put(actions.getBubleChartFailure(error))
  }
}

function* getPacingChartData() {
  try {
    const payload = yield call(getPacingChartApi)
    yield put(actions.getPacingChartSuccess(payload))
  } catch (error) {
    yield put(actions.getPacingChartFailure(error))
  }
}

function* getFormatChartData() {
  try {
    const payload = yield call(getFormatChartApi)
    yield put(actions.getFormatChartSuccess(payload))
  } catch (error) {
    yield put(actions.getFormatChartFailure(error))
  }
}

function* getTotalViewsData(data) {
  try {
    const payload = yield call(getTotalViewsApi)
    yield put(actions.getTotalViewsSuccess(payload))
  } catch (error) {
    yield put(actions.getTotalViewsFailure(error))
  }
}

function* getTotalCompetitorViewsData() {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)
    const options = {
      metric: 'views',
      platform: 'all',
      dateRange: 'week',
      dateBucket: 'none',
      property: ['duration'],
      brands: [...competitors],
    }
    const payload = yield call(getDataFromApi, { ...options })
    yield put(
      actions.getTotalCompetitorViewsSuccess(
        convertDataIntoDatasets(payload, options)
      )
    )
  } catch (error) {
    yield put(actions.getTotalCompetitorViewsFailure(error))
  }
}

function* getmarketviewTimeMockData() {
  try {
    const payload = yield call(getMarketviewDaysApi)
    yield put(actions.getMarketviewDetailTimeSuccess(payload))
  } catch (error) {
    yield put(actions.getMarketviewDetailTimeFailure(error))
  }
}

function* getTopPerformingPropertiesData({
  payload: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      metric,
      dateRange,
      property: [property],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
    }

    const [facebook, instagram, twitter, youtube] = yield all([
      call(getReportDataApi, { ...options, platform: 'facebook' }),
      call(getReportDataApi, { ...options, platform: 'instagram' }),
      call(getReportDataApi, { ...options, platform: 'twitter' }),
      call(getReportDataApi, { ...options, platform: 'youtube' }),
    ])

    yield put(
      actions.getTopPerformingPropertiesSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            facebook,
            instagram,
            twitter,
            youtube,
          },
          options,
          true // for revert labels datas
        )
      )
    )
  } catch (error) {
    yield put(actions.getTopPerformingPropertiesFailure(error))
  }
}

function* getTopPerformingPropertiesByCompetitorsData() {
  try {
    const payload = yield call(getGetTopPerformingPropertiesByCompetitorsApi)
    yield put(actions.getTopPerformingPropertiesByCompetitorsSuccess(payload))
  } catch (error) {
    yield put(actions.getTopPerformingPropertiesByCompetitorsFailure(error))
  }
}

function* getTopPerformingPropertiesByTimeData({ payload: { property } }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const options = {
      metric: 'views',
      property: [property],
      dateBucket: 'dayOfWeek',
      display: 'percentage',
      brands: [brand.uuid],
    }
    const data = yield call(getReportDataApi, options)
    yield put(
      actions.getTopPerformingTimeSuccess(
        convertDataIntoDatasets(data, options, {
          singleDataset: false,
        })
      )
    )
  } catch (error) {
    yield put(actions.getTopPerformingTimeFailure(error))
  }
}

export default [
  takeLatest(
    types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST,
    getCompetitorTopVideosMarketview
  ),
  takeLatest(
    types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST,
    getCompetitorVideosMarketview
  ),
  takeLatest(
    types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST,
    getSimilarProperties
  ),
  takeLatest(types.GET_MARKETVIEW_BUBBLECHART_REQUEST, getBubbleChartData),
  takeLatest(types.GET_MARKETVIEW_PACINGCHART_REQUEST, getPacingChartData),
  takeLatest(types.GET_MARKETVIEW_FORMATCHART_REQUEST, getFormatChartData),
  takeLatest(types.GET_MARKETVIEW_TOTALVIEWS_REQUEST, getTotalViewsData),
  takeLatest(
    types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST,
    getTotalCompetitorViewsData
  ),
  takeLatest(
    types.GET_MARKETVIEW_DETAIL_TIME_REQUEST,
    getmarketviewTimeMockData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST,
    getTotalCompetitorViewsData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST,
    getTopPerformingPropertiesData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST,
    getTopPerformingPropertiesByCompetitorsData
  ),
  takeLatest(
    types.GET_MARKETVIEW_DETAIL_PEFORMING_TIME_REQUEST,
    getTopPerformingPropertiesByTimeData
  ),
]
