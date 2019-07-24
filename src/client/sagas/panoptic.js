import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/panoptic'
import moment from 'moment'

import { getDateBucketFromRange, normalize } from 'Utils'

import {
  convertDataIntoDatasets,
  radarChartCalculate,
  compareSharesData,
  convertColorTempToDatasets,
  convertVideoEngagementData,
  percentageManipulation,
} from 'Utils/datasets'

import { getDataFromApi, buildApiUrl } from 'Utils/api'

import _ from 'lodash'
import { dayOfWeek, chartColors } from 'Utils/globals'

function* getVideoReleasesData({ data }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const { platform, dateRange, metric } = data

    const options = {
      metric,
      platform,
      property: 'duration',
      daterange: dateRange,
      dateBucket: 'dayOfWeek',
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/videovsmetric`, options),
      'GET'
    )

    if (!!response) {
      yield put(
        actions.getVideoReleasesDataSuccess(
          percentageManipulation(convertVideoEngagementData(response, metric))
        )
      )
    } else {
      throw new Error('Panoptic Error getVideoReleasesData')
    }
  } catch (err) {
    yield put(actions.getVideoReleasesDataError(err))
  }
}

function* getColorTemperatureData({ data }) {
  try {
    const { dateRange, colorTemperature } = data

    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      { baseUrl: false },
      `/brand/${brand.uuid}/compare/?daterange=${dateRange}`,
      'GET'
    )

    const {
      labels,
      platforms,
      data: colorTempData,
    } = convertColorTempToDatasets(response, colorTemperature)

    yield put(
      actions.getColorTemperatureDataSuccess({
        labels,
        platforms,
        data: percentageManipulation(colorTempData),
      })
    )
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

    if (property === 'format') {
      options.limit = 4
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
          doughnutData: convertDataIntoDatasets(
            percentageManipulation(doughnutData),
            options,
            {
              singleDataset: true,
            }
          ),
          stackedChartData:
            (!_.isEmpty(stackedChartData.data) &&
              convertDataIntoDatasets(
                percentageManipulation(stackedChartData),
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

    const { metric, dateRange, platform } = data

    const options = {
      metric,
      dateRange,
      platform,
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
      brands: [brand.uuid],
    }

    const stadiumData = yield call(getDataFromApi, options, '/report')

    const horizontalStackedBarData = yield call(
      getDataFromApi,
      {
        ...options,
        proportionOf: 'duration',
        limit: 4,
      },
      '/report'
    )

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
          stadiumData: percentageManipulation(
            convertDataIntoDatasets(stadiumData, options)
          ),
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
    const { brand } = yield select(selectAuthProfile)

    // TODO: We need change parameters when to do multiple select filter (Shares on Facebook & YouTube)
    const parameters = {
      url: '/report',
      dateRange,
      metric: 'views',
      property: ['color'],
      dateBucket: 'none',
      brands: [brand.uuid],
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
        percentageManipulation(
          radarChartCalculate(compareSharesData(payload, parameters))
        )
      )
    )
  } catch (err) {
    yield put(actions.getCompareSharesDataError(err))
  }
}

function* getFlipCardsData() {
  try {
    const { brand } = yield select(selectAuthProfile)

    const metrics = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl('/metric', { brandUuid: brand.uuid, platform: 'all' }),
      'GET'
    )

    if (!!metrics && !!Object.keys(metrics).length) {
      const payloads = Object.assign(
        {},
        ...Object.keys(metrics).map((metric) => {
          const dayOfWeek = Object.keys(metrics[metric]).filter(
            (key) => key !== 'changeOverPrevious'
          )

          const data = dayOfWeek.map((day) => metrics[metric][day]).reverse()

          const normalized = data.map((v) =>
            normalize(v, Math.min(...data), Math.max(...data), 0, 100)
          )

          return {
            [metric]: {
              percentage: metrics[metric].changeOverPrevious || 0,
              data: normalized,
              originalData: data,
              isEmpty: dayOfWeek.every((day) =>
                metrics[metric][day] === 0 ? true : false
              ),
            },
          }
        })
      )
      yield put(
        actions.getFlipCardsDataSuccess(percentageManipulation(payloads))
      )
    } else {
      throw new Error('Panoptic getFlipCardsDataError')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getFlipCardsDataError(err))
  }
}

function* getTopPerformingFormatData({ data = {} }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const { platform = 'all', metric = 'views' } = data
    const options = {
      platform,
      metric,
      property: 'pacing',
      daterange: 'week',
      //limit: 4,
    }

    const payload = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/topcv`, options),
      'GET'
    )

    const currentDayIndex = moment().weekday() + 1
    const pastdays = dayOfWeek.slice(0, currentDayIndex)
    const lastWeek = dayOfWeek.slice(currentDayIndex)
    const days = [...lastWeek, ...pastdays].map(
      (day, idx) =>
        `${
          6 - idx == 0
            ? 'Today'
            : 6 - idx === 1
            ? 'Yesterday'
            : moment()
                .subtract(6 - idx, 'd')
                .format('MM/DD/YY')
        } (${day.toUpperCase().slice(0, 3)})`
    )

    if (payload) {
      console.log(payload)
      // const doughnutData = percentageManipulation(payload)
      // const properties = ['Fast', 'Medium', 'Slow', 'Slowest']
      // const datasets = properties.map((property, idx) => ({
      //   label: property,
      //   fill: false,
      //   lineTension: 0.1,
      //   backgroundColor: chartColors[idx],
      //   borderColor: chartColors[idx],
      //   hoverBackgroundColor: chartColors[idx],
      //   data: dayOfWeek.map((day) => doughnutData.dates[day][property]),
      // }))
      // const lineChartData = {
      //   labels: days,
      //   datasets: datasets,
      // }

      const weekdayOrder = []
      const propertyBuckets = {}
      for(let i = 0; i < 7; i++) {
        const weekday = moment().subtract(i, 'days').format('dddd')
        const weekdayShort = moment().subtract(i, 'days').format('ddd')
        const weekdayDate = moment().subtract(i, 'days').format('M/D/YY')
        const label = (i === 0) 
          ? `Today (${weekdayShort})`
          : (i === 1) 
            ? `Yesterday (${weekdayShort})`
            : `${weekdayDate} (${weekdayShort})`

        weekdayOrder.unshift({
          weekday,
          data: payload.dates[weekday],
          label,
        })

        Object.keys(payload.dates[weekday]).forEach((propertyBucket, idx) => {
          if(!propertyBuckets[propertyBucket]) {
            propertyBuckets[propertyBucket] = {
              label: propertyBucket,
              fill: false,
              lineTension: 0.1,
              backgroundColor: chartColors[idx],
              borderColor: chartColors[idx],
              hoverBackgroundColor: chartColors[idx],
              data: []
            }
          }

          const propertyBucketValue = payload.dates[weekday][propertyBucket]
          propertyBuckets[propertyBucket].data.unshift(propertyBucketValue)
        })

      }

      const lineChartData = {
        labels: weekdayOrder.map((item) => {
          return item.label
        }),
        datasets: Object.keys(propertyBuckets).map((propertyBucket) => {
          return propertyBuckets[propertyBucket]
        })
      }

      yield put(
        actions.getTopPerformingFormatDataSuccess({
          lineChartData,
          average: payload.platformAverage,
          properties: payload.properties,
          platform: platform,
        })
      )
    } else {
      yield put(
        actions.getTopPerformingFormatDataError(
          'getTopPerformingFormatData error'
        )
      )
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getTopPerformingFormatDataError(err))
  }
}

export default [
  takeLatest(types.GET_VIDEO_RELEASES_DATA, getVideoReleasesData),
  takeLatest(types.GET_COLOR_TEMPERATURE_DATA, getColorTemperatureData),
  takeLatest(types.GET_FILTERING_SECTION_DATA, getFilteringSectionData),
  takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
  takeLatest(types.GET_COMPARE_SHARES_DATA, getCompareSharesData),
  takeLatest(types.GET_FLIPCARDS_DATA, getFlipCardsData),
  takeLatest(types.GET_TOP_PERFORMING_FORMAT_DATA, getTopPerformingFormatData),
]
