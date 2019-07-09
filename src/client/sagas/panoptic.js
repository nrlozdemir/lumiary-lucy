import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { selectAuthProfile } from 'Reducers/auth'
import { actions, types } from 'Reducers/panoptic'

import { getDateBucketFromRange } from 'Utils'

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
import { dayOfWeek } from 'Utils/globals'

function* getVideoReleasesData({ data }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const { platform, dateRange, metric } = data

    const options = {
      metric,
      platform,
      property: 'format',
      daterange: dateRange,
      limit: 4,
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/count`, options),
      'GET'
    )

    if (!!response) {
      yield put(
        actions.getVideoReleasesDataSuccess(
          convertVideoEngagementData(response, metric)
        )
      )
    } else {
      throw new Error('Panoptic Error getVideoReleasesData')
    }
  } catch (err) {
    console.log(err)
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
        data: colorTempData,
      })
    )
  } catch (err) {
    console.log(err)
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
        proportionOf: 'format',
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
        radarChartCalculate(compareSharesData(payload, parameters))
      )
    )
  } catch (err) {
    console.log('err', err)
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

    const payloads = Object.assign(
      {},
      ...Object.keys(metrics).map((metric) => ({
        [metric]: {
          percentage: metrics[metric].changeOverPrevious || 0,
          data: dayOfWeek.map((day) => metrics[metric][day]),
          isEmpty: dayOfWeek.every((day) =>
            metrics[metric][day] === 0 ? true : false
          ),
        },
      }))
    )
    yield put(actions.getFlipCardsDataSuccess(percentageManipulation(payloads)))
  } catch (err) {
    console.log(err)
    yield put(actions.getFlipCardsDataError(err))
  }
}

function* getTopPerformingFormatData({ data = {} }) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const { platform = 'all' } = data

    const options = {
      platform,
      metric: 'cvScore',
      dateRange: 'week',
      dateBucket: 'none',
      display: 'percentage',
      property: ['format'],
      brands: [brand.uuid],
      //limit: 4,
    }

    const dateBucketedOptions = { ...options, dateBucket: 'dayOfWeek' }

    const [dataWithDateBuckets, dataWithoutDateBuckets] = yield all([
      call(getDataFromApi, dateBucketedOptions, '/report'),
      call(getDataFromApi, options, '/report'),
    ])

    if (!!dataWithDateBuckets.data && !!dataWithoutDateBuckets.data) {
      const lineChartData = convertDataIntoDatasets(
        dataWithDateBuckets,
        dateBucketedOptions
      )

      const doughnutData = convertDataIntoDatasets(
        dataWithoutDateBuckets,
        options,
        { singleDataset: true, hoverBG: true }
      )

      yield put(
        actions.getTopPerformingFormatDataSuccess({
          doughnutData,
          lineChartData,
          percentageData: dataWithoutDateBuckets,
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
