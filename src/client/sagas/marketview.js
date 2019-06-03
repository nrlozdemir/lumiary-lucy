import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'
import { types, actions } from 'Reducers/marketview'
import { selectAuthProfile } from 'Reducers/auth'

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
  compareSharesData,
  convertMultiRequestDataIntoDatasets,
  getBrandAndCompetitors,
  convertDataIntoDatasets,
  getDateBucketFromRange,
  getMaximumValueIndexFromArray,
} from 'Utils'
import { dayOfWeek } from 'Utils/globals'
import { getDataFromApi } from 'Utils/api'

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

function* getSimilarProperties(props) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const {
      data: {
        date: { dateRange },
        themeColors,
      },
    } = props
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
      url: '/report',
    }

    const payloads = yield expectedValues.map((item) =>
      call(getDataFromApi, { ...parameters, property: [item.key] })
    )

    const createCustomBackground = (data) => {
      return Object.values(data).map((item, idx) => {
        if (Object.values(data).includes(100)) {
          return '#2FD7C4'
        }
        return idx === getMaximumValueIndexFromArray(data)
          ? '#2FD7C4'
          : themeColors.textColor
      })
    }

    const val = expectedValues.map((payload, idx) => ({
      ...payload,
      doughnutChartValues: convertDataIntoDatasets(
        payloads[idx],
        {
          ...parameters,
          property: [payload.key],
        },
        {
          singleDataset: true,
          backgroundColor: createCustomBackground(
            payloads[idx].data[Object.keys(payloads[idx].data)[0]][payload.key]
          ),
        }
      ),
    }))
    yield put(actions.getSimilarPropertiesSuccess(val))
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
    const { brand } = yield select(selectAuthProfile)

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const options = {
      competitors,
    }

    const url = `/brand/${brand.uuid}/properties?metric=shares&daterange=month`
    //${!!competitors ? '&allcompetitors=true' : ''}`

    const payload = yield call(getDataFromApi, options, url, 'GET')

    const pacingChartData = convertDataIntoDatasets(
      payload,
      { property: ['pacing'] },
      { customBorderColor: '#373F5B', singleDataset: true, noBrandKeys: true }
    )

    yield put(actions.getPacingChartSuccess(pacingChartData))
  } catch (error) {
    console.log(error)
    yield put(actions.getPacingChartFailure(error))
  }
}

function* getFormatChartData() {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    const options = {
      metric: 'shares',
      dateRange: '3months',
      property: ['format'],
      dateBucket: 'dayOfWeek',
      display: 'none',
      platform: 'all',
      brands: [...competitors.map((c) => c.uuid)],
    }

    // video is still being pulled from mock
    const { video } = yield call(getFormatChartApi)

    const response = yield call(getDataFromApi, options, '/report')

    // reduce reponse into array of categories and their count
    // based on the current day
    if (!!response && !!response.data) {
      const currentDay = dayOfWeek[new Date().getDay()]

      const formatCountsObj = Object.keys(response.data).reduce(
        (all, brand) => {
          const formatObj = response.data[brand].format

          Object.keys(formatObj).forEach((formatKey) => {
            const currentCount = formatObj[formatKey][currentDay]

            if (!!all[formatKey]) {
              all[formatKey] = all[formatKey] + currentCount
            } else {
              all[formatKey] = currentCount
            }
          })
          return all
        },
        {}
      )

      const formatCountsArr = Object.keys(formatCountsObj).map((formatKey) => ({
        name: formatKey,
        count: formatCountsObj[formatKey],
      }))

      yield put(
        actions.getFormatChartSuccess({
          currentDay,
          data: formatCountsArr,
          video,
        })
      )
    } else {
      throw 'MarketView/FormatChart Fetch Data Error'
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getFormatChartFailure(error))
  }
}

function* getTotalViewsData({ data }) {
  try {
    const { metric, dateRange, platform } = data

    const profile = yield select(selectAuthProfile)

    const url = `/metric/totals?metric=${metric}&platform=${platform}&daterange=${dateRange}`

    const options = {
      metric,
      platform,
      dateRange,
      display: 'percentage',
      property: [metric],
    }

    const dateBucket = getDateBucketFromRange(dateRange)

    const [barData, doughnutData] = yield all([
      call(getDataFromApi, null, `${url}&datebucket=${dateBucket}`, 'GET'),
      call(getDataFromApi, null, `${url}&datebucket=none`, 'GET'),
    ])

    const convertedBarData =
      dateBucket === 'none'
        ? {}
        : convertDataIntoDatasets(
            barData,
            { ...options, dateBucket },
            {
              isMetric: true,
            }
          )

    const convertedDoughnutData = convertDataIntoDatasets(
      doughnutData,
      { ...options, dateBucket: 'none' },
      {
        hoverBG: true,
        singleDataset: true,
        useBrandLabels: true,
        isMetric: true,
      }
    )
    yield put(
      actions.getTotalViewsSuccess({
        barData: convertedBarData,
        doughnutData: convertedDoughnutData,
      })
    )
  } catch (error) {
    console.log(error)
    yield put(actions.getTotalViewsFailure(error))
  }
}

function* getTotalCompetitorViewsData() {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)
    const options = {
      url: '/report',
      metric: 'views',
      platform: 'all',
      dateRange: 'week',
      dateBucket: 'none',
      property: ['duration'],
      brands: [...competitors.map((c) => c.uuid)],
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
      url: '/report',
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
    console.log('error =>', error)
    yield put(actions.getTopPerformingPropertiesFailure(error))
  }
}

function* getTopPerformingPropertiesByCompetitorsData({
  payload: { dateRange },
}) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)
    const options = {
      url: '/report',
      metric: 'views',
      // platform: 'all',
      dateRange: dateRange,
      dateBucket: 'none',
      property: ['pacing'],
      brands: [...competitors.map((c) => c.uuid)],
    }
    const payload = yield call(getDataFromApi, { ...options })
    yield put(
      actions.getTopPerformingPropertiesByCompetitorsSuccess(
        convertDataIntoDatasets(payload, options, {
          useBrandLabels: true,
        })
      )
    )
  } catch (error) {
    console.log('error', error)
    yield put(actions.getTopPerformingPropertiesByCompetitorsFailure(error))
  }
}

function* getTopPerformingPropertiesByTimeData({ payload: { property } }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const options = {
      url: '/report',
      metric: 'views',
      property: [property],
      dateBucket: 'dayOfWeek',
      display: 'percentage',
      brands: [brand.uuid],
    }
    const data = yield call(getDataFromApi, options)
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
