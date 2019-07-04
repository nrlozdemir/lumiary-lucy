import { delay } from 'redux-saga'
import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'
import { types, actions } from 'Reducers/marketview'
import { selectAuthProfile } from 'Reducers/auth'
import querystring from 'querystring'
import {
  ucfirst,
  getLabelWithSuffix,
  getDateBucketFromRange,
  getBrandAndCompetitors,
  getNValuesOfObject,
} from 'Utils'

import {
  convertDataIntoDatasets,
  convertMultiRequestDataIntoDatasets,
} from 'Utils/datasets'

import { dayOfWeek, chartColors } from 'Utils/globals'
import { getDataFromApi, buildApiUrl } from 'Utils/api'

function* getCompetitorVideosApi({ payload }) {
  const requestObject = {
    ...payload,
  }

  if (payload.competitors) {
    requestObject.competitors = JSON.stringify(payload.competitors)
  }

  let response = yield call(
    getDataFromApi,
    {},
    `/brand/${payload.brandUuid}/topvideos?${querystring.stringify(
      requestObject
    )}`,
    'GET'
  )

  // return axios('/').then((res) => marketviewCompetitorVideosData)
  return response
}

function getMarketviewDaysApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTimeMockData)
}

function* getCompetitorVideosMarketview(params) {
  try {
    const payload = yield call(getCompetitorVideosApi, params)
    yield put(actions.getCompetitorVideosSuccess(payload))
  } catch (error) {
    yield put(actions.getCompetitorVideosFailure({ error }))
  }
}

function* getCompetitorTopVideosMarketview(payload) {
  const {
    data: { property, metric, dateRange },
  } = payload
  try {
    const { brand } = yield select(selectAuthProfile)

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const options = {
      metric,
      dateRange,
      property: [property],
      dateBucket: 'none',
      display: 'percentage',
      brands: competitors,
      platform: 'all',
    }

    if (property === 'format') {
      options.limit = 4
    }

    let response = yield call(getDataFromApi, options, '/report')

    // preliminary to convertMultiRequestDataIntoDatasets structure
    response = Object.keys(response.data).reduce((acc, key) => {
      acc[key] = {
        data: { [key]: response.data[key] },
      }
      return acc
    }, {})

    yield put(
      actions.getCompetitorTopVideosSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            ...response,
          },
          options
        )
      )
    )
  } catch (error) {
    console.log('saga getCompetitorTopVideosFailure error', error)
    yield put(actions.getCompetitorTopVideosFailure(error))
  }
}

function* getPlatformTopVideosMarketview({
  data: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    let options = {
      metric,
      dateRange,
      property: property,
      dateBucket: 'none',
      display: 'percentage',
      brandUuid: brand.uuid,
    }

    if (property === 'format') {
      options.limit = 4
    }

    let response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/platforms`, options),
      'GET'
    )

    // preliminary to convertMultiRequestDataIntoDatasets structure
    response = Object.keys(response).reduce((acc, key) => {
      acc[key] = {
        data: { [key]: response[key] },
      }
      return acc
    }, {})

    yield put(
      actions.getPlatformTopVideosSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            ...response,
          },
          {
            ...options,
            property: [property],
          }
        )
      )
    )
  } catch (error) {
    console.log('saga getPlatformTopVideosFailure error', error)
    yield put(actions.getPlatformTopVideosFailure(error))
  }
}

function* getSimilarProperties({ data: { dateRange, container } }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const options = {
      competitors,
    }

    const url = `/brand/${
      brand.uuid
    }/properties?metric=shares&daterange=${dateRange}`
    //${!!competitors ? '&allcompetitors=true' : ''}`

    const payload = yield call(getDataFromApi, options, url, 'GET')

    let parsedNewPayload, highestBuckets
    if (!!payload && !!payload.propertyBucketsRanked) {
      highestBuckets = _.slice(
        _.orderBy(
          payload.propertyBucketsRanked,
          (item) => {
            return item.numberOfMetric
          },
          ['desc']
        ),
        0,
        3
      )
    }

    if (
      container === 'competitor' &&
      !!highestBuckets &&
      !!highestBuckets.length
    ) {
      yield put({
        type: types.SET_MARKETVIEW_COMPETITOR_TOP_PROPERTY,
        payload:
          !!highestBuckets[0] && !!highestBuckets[0].highestProperty
            ? highestBuckets[0].highestProperty
            : null,
      })
    }

    const val = highestBuckets.map((value, idx) => ({
      doughnutChartValues: convertDataIntoDatasets(
        payload,
        { property: [value.highestProperty] },
        {
          singleDataset: true,
          noBrandKeys: true,
          customValueKeyGetAll: true,
        }
      ),
    }))

    yield delay(2000)
    yield put(actions.getSimilarPropertiesSuccess(val))
  } catch (error) {
    console.log('error == ', error)
    yield put(actions.getSimilarPropertiesFailure(error))
  }
}

function* getBubbleChartData() {
  try {
    const { brand } = yield select(selectAuthProfile)

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const options = {
      competitors,
      metric: 'shares',
      property: 'color',
      daterange: 'month',
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/platforms`, options),
      'GET'
    )

    if (
      !!response &&
      !!response.Twitter &&
      !!response.Facebook &&
      !!response.Instagram &&
      !!response.YouTube
    ) {
      // convert response into array of { name, value, color }
      const bubbleData = Object.keys(response).map((pf) =>
        Object.keys(response[pf].color).reduce(
          (val, colorKey) => {
            const colorMetric = response[pf].color[colorKey]
            if (colorMetric > val.value) {
              val.value = colorMetric
              val.color = colorKey
            }
            return val
          },
          { name: ucfirst(pf), value: 0, color: null }
        )
      )

      yield put(actions.getBubleChartSuccess(bubbleData))
    } else {
      throw 'Error fetching MarketView/BubbleChartData'
    }
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
      {
        customBorderColor: '#373F5B',
        singleDataset: true,
        noBrandKeys: true,
        customValueKey: 'proportionOfLibrary',
      }
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
      brands: [...competitors],
      limit: 4,
    }

    // video is still being pulled from mock
    const video = {
      videoUrl:
        'https://s3.amazonaws.com/quickframe-media-qa/lumiere/Demo/12-years-ago-today-Kobe-dropped-81.mp4',
      poster:
        'https://s3.amazonaws.com/quickframe-media-qa/lumiere/Demo/thumb/12-years-ago-today-Kobe-dropped-81.jpg',
    }

    const response = yield call(getDataFromApi, options, '/report')

    // reduce reponse into array of categories and their count
    // based on the current day
    if (!!response && !!response.data) {
      const currentDay = dayOfWeek[new Date().getDay()]

      const formatCountsObj = Object.keys(response.data).reduce(
        (all, brand) => {
          const formatObj = response.data[brand].format

          Object.keys(formatObj).forEach((formatKey) => {
            const currentKey = formatObj[formatKey]
            const currentCount = Object.keys(currentKey).reduce(
              (accumulator, day) => {
                return accumulator + currentKey[day]
              },
              0
            )

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

      const slicedObj = getNValuesOfObject({
        obj: formatCountsObj,
        n: 4,
        sortOrder: 'desc',
      })
      const formatCountsArr = Object.keys(slicedObj).map((formatKey) => ({
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
    const competitors = getBrandAndCompetitors(profile)

    const url = buildApiUrl(`/metric/totals`, {
      metric,
      platform,
      competitors,
      daterange: dateRange,
    })

    const options = {
      metric,
      platform,
      dateRange,
      display: 'percentage',
      property: [metric],
    }

    const dateBucket = getDateBucketFromRange(dateRange)

    const [barData, doughnutData] = yield all([
      call(getDataFromApi, undefined, `${url}&datebucket=${dateBucket}`, 'GET'),
      call(getDataFromApi, undefined, `${url}&datebucket=none`, 'GET'),
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
      metric: 'views',
      platform: 'all',
      dateRange: '3months',
      dateBucket: 'none',
      property: ['duration'],
      brands: [...competitors],
    }
    const payload = yield call(getDataFromApi, { ...options }, '/report')

    if (!!payload) {
      yield put(
        actions.getTotalCompetitorViewsSuccess(
          convertDataIntoDatasets(payload, options, {
            customKeys: Object.keys(payload.data),
          })
        )
      )
    }
  } catch (error) {
    yield put(actions.getTotalCompetitorViewsFailure(error))
  }
}

function* getTopPerformingPropertiesData({
  payload: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      metric,
      dateRange: '3months',
      property: property,
      dateBucket: 'none',
      brandUuid: brand.uuid,
    }

    let response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/platforms`, options),
      'GET'
    )

    // preliminary to convertMultiRequestDataIntoDatasets structure
    response = Object.keys(response).reduce((acc, key) => {
      acc[key] = {
        data: { [key]: response[key] },
      }
      return acc
    }, {})

    yield put(
      actions.getTopPerformingPropertiesSuccess(
        convertMultiRequestDataIntoDatasets(
          {
            ...response,
          },
          { ...options, property: [property] },
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
  payload: { dateRange = 'week', property },
}) {
  try {
    const profile = yield select(selectAuthProfile)
    const competitors = getBrandAndCompetitors(profile)

    if (!!property) {
      const response = yield call(
        getDataFromApi,
        undefined,
        buildApiUrl(`/property/brands/${property}`, {
          daterange: dateRange,
          brandUuids: competitors,
        }),
        'GET'
      )

      if (!!response) {
        // wtfis this man put it somewher else o.O
        const brandLabels = Object.keys(response)

        const propLabels = brandLabels.reduce((all, brand) => {
          Object.keys(response[brand]).forEach((prop) => {
            if (all.indexOf(prop) === -1) {
              all.push(prop)
            }
          })
          return all
        }, [])

        const convertedDatasets = propLabels.map((prop, idx) => {
          const data = brandLabels.map(
            (b) => (!!response[b] && response[b][prop]) || 0
          )
          return {
            data,
            label: getLabelWithSuffix(prop, property),
            borderWidth: 1,
            borderColor: chartColors[idx],
            backgroundColor: chartColors[idx],
          }
        })

        yield put(
          actions.getTopPerformingPropertiesByCompetitorsSuccess({
            datasets: convertedDatasets,
            labels: brandLabels,
          })
        )
      }
    } else {
      throw new Error('Get Top Performing Property Error')
    }
  } catch (error) {
    console.log('error', error)
    yield put(actions.getTopPerformingPropertiesByCompetitorsFailure(error))
  }
}

function* getTopPerformingPropertiesByTimeData({
  payload: { property, dateRange },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const dateBucket = getDateBucketFromRange(dateRange)

    const options = {
      dateRange,
      dateBucket,
      metric: 'views',
      property: [property],
      display: 'percentage',
      brands: [brand.uuid],
    }

    if (property === 'format') {
      options.limit = 4
    }

    const data = yield call(getDataFromApi, options, '/report')

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
    types.GET_MARKETVIEW_PLATFORM_TOP_VIDEOS_REQUEST,
    getPlatformTopVideosMarketview
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
