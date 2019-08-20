import { delay } from 'redux-saga'
import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'
import { types, actions } from 'Reducers/marketview'
import { makeSelectAuthProfile } from 'Reducers/auth'
import querystring from 'querystring'
import {
  ucfirst,
  getLabelWithSuffix,
  getDateBucketFromRange,
  getBrandAndCompetitors,
  getNValuesOfObject,
  normalizationBubbleMapping,
} from 'Utils'

import {
  convertNestedDurationsIntoLabels,
  convertDurationLabels,
  convertDataIntoDatasets,
  convertMultiRequestDataIntoDatasets,
  percentageManipulation,
  convertPropertiesIntoDatasets,
} from 'Utils/datasets'

import { dayOfWeek, chartColors, formatToS3Examples } from 'Utils/globals'
import { getDataFromApi, buildApiUrl } from 'Utils/api'
import { isNumber } from 'util'

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
    yield put(
      actions.getCompetitorVideosSuccess(percentageManipulation(payload))
    )
  } catch (error) {
    console.log(error)
    yield put(actions.getCompetitorVideosFailure({ error }))
  }
}

function* getCompetitorTopVideosMarketview(payload) {
  const {
    data: { property, metric, dateRange },
  } = payload
  try {
    const { brand } = yield select(makeSelectAuthProfile())

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

    if (
      !!response &&
      !!response.data &&
      !!Object.keys(response.data).length &&
      !!Object.keys(response.data).every(
        (key) => !!response.data[key][property]
      )
    ) {
      // preliminary to convertMultiRequestDataIntoDatasets structure
      response = Object.keys(response.data).reduce((acc, key) => {
        acc[key] = {
          data: {
            [key]:
              property === 'duration'
                ? {
                    duration: convertDurationLabels(
                      response.data[key][property],
                      property
                    ),
                  }
                : response.data[key],
          },
        }
        return acc
      }, {})

      yield put(
        actions.getCompetitorTopVideosSuccess(
          percentageManipulation(
            convertMultiRequestDataIntoDatasets(
              {
                ...response,
              },
              options
            )
          )
        )
      )
    } else {
      throw new Error(
        'Marketview/Competitors Top Videos Over Time By Competitor Error'
      )
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getCompetitorTopVideosFailure(error))
  }
}

function* getPlatformTopVideosMarketview({
  data: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    let options = {
      metric,
      dateRange,
      property,
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

    // add duration labels
    if (property === 'duration') {
      response = convertNestedDurationsIntoLabels(response)
    }

    // preliminary to convertMultiRequestDataIntoDatasets structure
    let returnData
    returnData = Object.keys(response).reduce((acc, key) => {
      acc[key] = {
        data: { [key]: response[key] },
      }
      return acc
    }, {})

    if (
      !!response &&
      !!property &&
      !!Object.keys(response) &&
      !!Object.keys(response)[0] &&
      !!response[Object.keys(response)[0]][property] &&
      !!Object.values(response[Object.keys(response)[0]][property]).length &&
      Object.values(response[Object.keys(response)[0]][property]).length > 4
    ) {
      let sumAll = {}
      let cumulative = {}
      returnData = {}

      Object.keys(response).map((i, x) => {
        !!response[i] &&
          Object.keys(response[i]).map((j, y) => {
            !!response[i][j] &&
              Object.keys(response[i][j]).map((k, z) => {
                if (!sumAll[k]) {
                  sumAll[k] = 0
                }
                sumAll[k] += !!response[i][j][k] && response[i][j][k]
              })
          })
      })

      !!sumAll &&
        Object.keys(sumAll).map((el, i) => {
          cumulative[i] = {
            key: el,
            value: sumAll[el],
          }
        })

      const cumulativeTopValues =
        !!cumulative &&
        Object.values(cumulative)
          .sort((a, b) => (b.value > a.value ? 1 : -1))
          .filter((el, i) => {
            if (i < 4) {
              return el
            }
          })

      !!cumulativeTopValues &&
        cumulativeTopValues.map((el, i) => {
          Object.keys(response).map((i, x) => {
            !!response[i] &&
              Object.keys(response[i]).map((j, y) => {
                !!response[i][j] &&
                  Object.keys(response[i][j]).map((k, z) => {
                    if (k == el.key) {
                      if (!returnData[i]) {
                        returnData[i] = {}
                      }
                      if (!returnData[i]['data']) {
                        returnData[i]['data'] = {}
                      }
                      if (!returnData[i]['data'][i]) {
                        returnData[i]['data'][i] = {}
                      }
                      if (!returnData[i]['data'][i][j]) {
                        returnData[i]['data'][i][j] = {}
                      }
                      returnData[i]['data'][i][j][k] = response[i][j][k]
                    }
                  })
              })
          })
        })
    }

    const indexColors = {
      facebook: '#2fd7c4',
      instagram: '#8562f3',
      twitter: '#5292e5',
      youtube: '#acb0be',
    }

    yield put(
      actions.getPlatformTopVideosSuccess(
        percentageManipulation(
          convertMultiRequestDataIntoDatasets(
            {
              ...returnData,
            },
            {
              ...options,
              property: [property],
            },
            false,
            {
              backgroundColors: Object.keys(returnData).map((e, i) => {
                return indexColors[e.toLowerCase()]
              }),
              borderColors: Object.keys(returnData).map((e, i) => {
                return indexColors[e.toLowerCase()]
              }),
              borderWidth: 1,
            }
          )
        )
      )
    )
  } catch (error) {
    console.log(error)
    yield put(actions.getPlatformTopVideosFailure(error))
  }
}

function* getSimilarProperties(params = {}) {
  try {
    const {
      data: { dateRange, container, platform },
    } = params
    const { brand } = yield select(makeSelectAuthProfile())
    const { uuid, competitors = [] } = brand

    if (!uuid) {
      throw new Error(
        'Marketview/detail getSimilarProperties error, no brand uuid defined'
      )
    }

    let requestBody
    switch (container) {
      case 'competitor':
        if (competitors.length === 0) {
          throw new Error(
            'Marketview/detail getSimilarProperties error, no competitors provided'
          )
        }

        const mappedCompetitors = competitors.map((c) => ({ uuid: c.uuid }))

        requestBody = {
          properties: ['duration', 'pacing', 'dominantColorShots'],
          daterange: dateRange,
          platforms: ['all'],
          percentile: 80,
          competitors: JSON.stringify(mappedCompetitors),
        }
        break

      case 'platform':
        if (!platform) {
          throw new Error(
            'Marketview/detail getSimilarProperties error, no platform provided'
          )
        }

        requestBody = {
          properties: ['duration', 'pacing', 'dominantColorShots'],
          daterange: dateRange,
          platforms: [platform],
          percentile: 80,
        }
        break

      case 'time':
        requestBody = {
          properties: ['duration', 'pacing', 'dominantColorShots'],
          daterange: dateRange,
          platforms: ['all'],
          percentile: 80,
        }
        break
    }

    if (!requestBody) {
      throw new Error(
        'Marketview/detail getSimilarProperties error, could not determine requestBody'
      )
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      `/brand/${uuid}/topvideoproperties?${querystring.stringify(requestBody)}`,
      'GET'
    )

    if (!response) {
      throw new Error(
        'Marketview/detail getSimilarProperties error, invalid server response'
      )
    }

    if (
      !response.duration ||
      !response.pacing ||
      !response.dominantColorShots
    ) {
      throw new Error(
        'Marketview/detail getSimilarProperties error, response body missing keys needed to render'
      )
    }

    const convertedResponse = {
      ...response,
      duration: convertDurationLabels(response.duration, 'duration'),
    }

    yield put(actions.getSimilarPropertiesSuccess(convertedResponse))
  } catch (error) {
    console.log(error)
    yield put(actions.getSimilarPropertiesFailure(error))
  }
}

function* getBubbleChartData({
  payload: { metric = 'views', dateRange = '3months' },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const options = {
      metric,
      competitors,
      property: 'color',
      daterange: dateRange,
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

      // you can handle like this data
      // bubbleData = [
      //   {
      //     name: 'YouTube',
      //     value: 100001,
      //     color: 'blue-purple',
      //   },
      //   {
      //     name: 'Facebook',
      //     value: 0,
      //     color: 'red',
      //   },
      //   {
      //     name: 'Twitter',
      //     value: 0,
      //     color: 'blue-green',
      //   },
      //   {
      //     name: 'Instagram',
      //     value: 1000001,
      //     color: 'yellow-green',
      //   },
      // ]

      const normalizedData = normalizationBubbleMapping(
        bubbleData,
        50,
        70,
        'marketview'
      )

      yield put(actions.getBubleChartSuccess(normalizedData))
    } else {
      throw 'Error fetching MarketView/BubbleChartData'
    }
  } catch (error) {
    console.log('error', error)
    yield put(actions.getBubleChartFailure(error))
  }
}

function* getPacingChartData({
  payload: { metric = 'views', dateRange = 'month' },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const url = buildApiUrl(`/brand/${brand.uuid}/properties`, {
      top: 20,
      metric,
      dateRange,
      competitors,
    })

    const response = yield call(getDataFromApi, undefined, url, 'GET')

    if (!!response && !!response.market && !!response.market.pacing) {
      const pacingChartData = convertPropertiesIntoDatasets(response, {
        metric,
        type: 'market',
        property: 'pacing',
      })

      yield put(
        actions.getPacingChartSuccess(percentageManipulation(pacingChartData))
      )
    } else {
      throw new Error('Marketview getPacingChartData Error')
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getPacingChartFailure(error))
  }
}

function* getFormatChartData({
  payload: { metric = 'views', dateRange = 'week' },
}) {
  try {
    const profile = yield select(makeSelectAuthProfile())
    const competitors = getBrandAndCompetitors(profile)

    const dateBucket = getDateBucketFromRange(dateRange)

    const options = {
      metric,
      limit: 4,
      dateRange,
      dateBucket,
      property: ['format'],
      display: 'none',
      platform: 'all',
      brands: [...competitors],
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

      // order formats
      const vals = percentageManipulation(formatCountsArr).sort(
        (a, b) => b.count - a.count
      )

      // pull vid from highest bucket
      const video = {
        videoUrl: formatToS3Examples[vals[0].name],
      }

      yield put(
        actions.getFormatChartSuccess({
          currentDay,
          data: vals,
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

    const profile = yield select(makeSelectAuthProfile())
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

    const barData = yield call(
      getDataFromApi,
      undefined,
      `${url}&datebucket=${dateBucket}`,
      'GET'
    )

    if (!!barData) {
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
      const covertDataForDoughnut = Object.keys(barData).reduce((acc, key) => {
        acc[key] = {
          [metric]: {
            percent: Math.max(...Object.values(barData[key][metric].percents)),
          },
        }
        return acc
      }, {})

      const convertedDoughnutData = convertDataIntoDatasets(
        covertDataForDoughnut,
        { ...options },
        {
          hoverBG: true,
          singleDataset: true,
          useBrandLabels: true,
          isMetric: true,
        }
      )

      yield put(
        actions.getTotalViewsSuccess({
          barData: percentageManipulation(convertedBarData),
          doughnutData: percentageManipulation(convertedDoughnutData),
        })
      )
    } else {
      throw new Error('Get Total Views Error')
    }
  } catch (error) {
    console.log('error', error)
    yield put(actions.getTotalViewsFailure(error))
  }
}

function* getTotalCompetitorViewsData() {
  try {
    const profile = yield select(makeSelectAuthProfile())
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
          percentageManipulation(
            convertDataIntoDatasets(payload, options, {
              useBrands: true,
              customKeys: Object.keys(payload.data),
            })
          )
        )
      )
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getTotalCompetitorViewsFailure(error))
  }
}

function* getTopPerformingPropertiesData({
  payload: { property, metric, dateRange },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const options = {
      metric,
      property,
      dateRange: '3months',
      dateBucket: 'none',
      brandUuid: brand.uuid,
    }

    let response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/platforms`, options),
      'GET'
    )

    // add duration labels
    if (property === 'duration') {
      response = convertNestedDurationsIntoLabels(response)
    }

    // preliminary to convertMultiRequestDataIntoDatasets structure
    response = Object.keys(response).reduce((acc, key) => {
      acc[key] = {
        data: { [key]: response[key] },
      }
      return acc
    }, {})

    response = percentageManipulation(response)

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
  payload: { dateRange = '3months', property },
}) {
  try {
    const profile = yield select(makeSelectAuthProfile())
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
            datasets: percentageManipulation(convertedDatasets),
            labels: brandLabels,
          })
        )
      }
    } else {
      throw new Error('Get Top Performing Property Error')
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getTopPerformingPropertiesByCompetitorsFailure(error))
  }
}

function* getTopPerformingPropertiesByTimeData({
  payload: { property, dateRange },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

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

    const data = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/propertyperformance`, {
        daterange: dateRange,
        property: property,
      }),
      'GET'
    )

    if (!!data && !!data.data) {
      if (property === 'duration') {
        data.data = convertNestedDurationsIntoLabels(data.data)
      }

      yield put(
        actions.getTopPerformingTimeSuccess(
          convertDataIntoDatasets(percentageManipulation(data), options, {
            singleDataset: false,
          })
        )
      )
    } else {
      throw new Error(
        'Marketview/Time getTopPerformingPropertiesByTimeData Error'
      )
    }
  } catch (error) {
    yield put(actions.getTopPerformingTimeFailure(error))
  }
}

function* getContentVitalityScoreData({ payload = {} }) {
  const {
    onDay,
    platform,
    dateRange,
    container,
    brand: compareBrand,
    property = 'cvScore',
  } = payload

  try {
    const profile = yield select(makeSelectAuthProfile())
    const competitors = getBrandAndCompetitors(profile)

    const { brand } = profile

    let brands = [brand.uuid, ...(!!compareBrand ? [compareBrand] : [])]

    // platform and time views will consist of all competitors
    if (container === 'platform' || container === 'time') {
      brands = competitors
    }

    const params = {
      brands,
      property,
      platform,
      mode: 'sumVideos',
      daterange: dateRange,
      brandUuid: brand.uuid,
      ...(onDay ? { onDay } : {}),
    }

    console.log('getContentVitalityScoreData request', params)

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl('/report/compare/brands', params),
      'GET'
    )

    yield put(
      actions.getContentVitalityScoreDataSuccess(
        percentageManipulation({ data: response, platform })
      )
    )
  } catch (err) {
    console.log(err)
    yield put(actions.getContentVitalityScoreDataError(err))
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
  takeLatest(
    types.GET_CONTENT_VITALITY_SCORE_DATA,
    getContentVitalityScoreData
  ),
]
