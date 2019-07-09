import { takeLatest, call, put, select } from 'redux-saga/effects'

import _ from 'lodash'

import {
  types,
  actions,
  makeSelectInfoShowSection,
} from 'Reducers/libraryDetail'
import { getDataFromApi, buildApiUrl } from 'Utils/api'

import { getMaximumValueIndexFromArray } from 'Utils'

import {
  convertIntoLibAndIndustryDoughnut,
  convertDataIntoDatasets,
  convertColorTempToDatasets,
  parseAverage,
  convertNumberArrIntoPercentages,
  percentageManipulation,
} from 'Utils/datasets'

import { selectAuthProfile } from 'Reducers/auth'

function* getDoughnutChart({ payload: { LibraryDetailId, themeColors } }) {
  try {
    const expectedValues = [
      { key: 'frameRate', title: 'Frame Rate' },
      { key: 'pacing', title: 'Pacing' },
      { key: 'duration', title: 'Duration' },
      { key: 'aspectRatio', title: 'Aspect Ratio' },
    ]
    const { brand } = yield select(selectAuthProfile)

    const parameters = {
      brands: [brand.uuid],
      dateRange: '3months',
      metric: 'views',
      platform: 'all',
      dateBucket: 'none',
      display: 'percentage',
      dateBucket: 'none',
    }
    const response = yield call(
      getDataFromApi,
      {
        ...parameters,
        property: expectedValues.map(({ key }) => key),
      },
      '/report'
    )

    const payloads = Object.entries(response.data[brand.name]).map(
      ([key, value]) => ({
        platform: 'All',
        data: {
          [brand.name]: {
            [key]: value,
          },
        },
      })
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

    const val = expectedValues.map((payload, idx) => {
      const chartValues = convertDataIntoDatasets(
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
      )

      const entries = payloads[idx].data[brand.name][payload.key]
      const [[maxDataKey, maxDataValue]] = Object.entries(entries).sort(
        ([, v1], [, v2]) => (v1 > v2 ? -1 : 1)
      )
      const maxDataIndex = Object.keys(entries).findIndex(
        (key) => key === maxDataKey
      )

      return {
        ...payload,
        doughnutChartValues: chartValues,
        max: {
          label: chartValues.labels[maxDataIndex],
          percentage: maxDataValue,
        },
        data: payloads[idx],
      }
    })

    yield put(actions.getDoughnutChartSuccess(percentageManipulation(val)))
  } catch (error) {
    yield put(actions.getDoughnutChartFailure({ error }))
  }
}

function* getColorTemperatureData({
  payload: { videoId, daterange = 'week' },
}) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const options = {
      daterange,
      videoUuid: videoId,
      mode: 'industry',
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brand.uuid}/compare`, options),
      'GET'
    )

    if (!!response && !!response.sentiments) {
      const { data: convertedData } = convertColorTempToDatasets(response)

      yield put({
        type: types.GET_COLOR_TEMP_SUCCESS,
        payload: percentageManipulation(convertedData),
      })
    } else {
      throw 'Error fetching Library/Detail ColorTemperature'
    }
  } catch (err) {
    yield put(actions.getColorTempFailure(err))
  }
}

function* getShotByShot(videoId) {
  try {
    const { brand } = yield select(selectAuthProfile)

    const payload = yield call(
      getDataFromApi,
      {},
      `/brand/${brand.uuid}/video/${videoId.payload}/shots`,
      'GET'
    )
    yield put(actions.getShotByShotSuccess(percentageManipulation(payload)))
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }))
  }
}

function* getShotInfoRequest({ payload }) {
  try {
    const { brandUuid, videoUuid, shotId } = payload

    if (!!brandUuid && !!videoUuid && shotId !== undefined) {
      const url = `/brand/${brandUuid}/video/${videoUuid}/shots/${shotId}`

      const payload = yield call(getDataFromApi, undefined, url, 'GET')

      yield put(actions.getShotInfoSuccess(percentageManipulation(payload)))
    } else {
      throw new Error('Library Detail getShotInfoRequest Error')
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getShotInfoFailure({ error }))
  }
}

function* getSelectedVideo({ payload }) {
  try {
    const { brandUuid, videoId } = payload
    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/brand/${brandUuid}/video/${videoId}`),
      'GET'
    )

    yield put(actions.getSelectedVideoSuccess(percentageManipulation(response.video)))
  } catch (error) {
    yield put(actions.getSelectedVideoFailure({ error }))
  }
}

function* getDoughnutSectionInfoData({ payload }) {
  try {
    if (!payload) {
      return
    }

    const { videoId, property, dateRange, metric } = payload

    const infoData = yield select(makeSelectInfoShowSection)

    const { brand } = yield select(selectAuthProfile)

    if (!!brand && !!videoId && !!dateRange && !!metric && !!infoData) {
      const {
        libraryMetricPercents,
        industryMetricPercents,
        libraryMetricDateSums,
        industryMetricDateSums,
        industryDateCounts,
        videoPropertyAverage,
        libraryPropertyAverage,
        metricLibraryPercentChange,
      } = yield call(
        getDataFromApi,
        undefined,
        buildApiUrl(`/brand/${brand.uuid}/video/${videoId}/compare`, {
          metric,
          property,
          daterange: dateRange,
        }),
        'GET'
      )

      const {
        maxKeyLabel: libraryMaxKeyLabel,
        chartData: libraryChartData,
        maxKey: libraryMaxKey,
        maxValue: libraryMaxValue,
      } = percentageManipulation(convertIntoLibAndIndustryDoughnut(
        libraryMetricPercents,
        property,
        '#2FD7C4'
      ))

      const {
        maxKeyLabel: industryMaxKeyLabel,
        chartData: industryChartData,
        maxKey: industryMaxKey,
        maxValue: industryMaxValue,
      } = percentageManipulation(convertIntoLibAndIndustryDoughnut(
        industryMetricPercents,
        property,
        '#8562f3'
      ))

      const libraryPercentages = percentageManipulation(convertNumberArrIntoPercentages(
        Object.values(libraryMetricDateSums[libraryMaxKeyLabel])
      ))
      const industryPercentages = percentageManipulation(convertNumberArrIntoPercentages(
        Object.values(industryMetricDateSums[industryMaxKeyLabel])
      ))

      const lineChartData = {
        labels: Object.keys(industryDateCounts).reverse(),
        datasets: [
          {
            data: libraryPercentages.reverse(),
          },
          {
            data: industryPercentages.reverse(),
          },
        ],
      }

      yield put(
        actions.doughnutInfoIndustrySuccess({
          libraryChartData,
          libraryMaxKey,
          libraryMaxValue,
          industryChartData,
          industryMaxKey,
          industryMaxValue,
          lineChartData,
          videoPropertyAverage: Math.floor(
            videoPropertyAverage >= 1000
              ? videoPropertyAverage / 1000
              : videoPropertyAverage
          ),
          libraryPropertyAverage: Math.floor(
            libraryPropertyAverage >= 1000
              ? libraryPropertyAverage / 1000
              : libraryPropertyAverage
          ),
          propertyLibraryPercentChange: Math.floor(
            metricLibraryPercentChange * 100
          ),
        })
      )
    }
  } catch (e) {
    console.error(e)
    yield put(actions.doughnutInfoIndustryFailure(e))
  }
}
function* getVideoAverage({ id }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const payload = yield call(getDataFromApi, {
      url: `/brand/${brand.uuid}/video/${id}/metrics`,
      requestType: 'GET',
    })

    yield put(actions.getSelectedVideoAverageSuccess(parseAverage(payload)))
  } catch (error) {
    yield put(actions.getSelectedVideoAverageFailure({ error }))
  }
}

function* getRadarChartRequest(ids) {
  try {
    const url = `/brand/${ids.payload.brandUuid}/video/${
      ids.payload.videoUuid
    }/shots/${ids.payload.shotId}/colors`

    const colorNames = [
      'red',
      'orange-red',
      'orange',
      'yellow-orange',
      'yellow-green',
      'yellow',
      'green',
      'blue-green',
      'blue-purple',
      'purple',
      'red-purple',
    ]
    const payload = yield call(getDataFromApi, { url: url, requestType: 'GET' })

    const totalValue = Object.values(payload).reduce(
      (prev, next) => prev + next,
      0
    )

    const aspectRatio = totalValue > 0 ? 100 / totalValue : 1

    let values = []
    Object.keys(payload).map((color, i) => {
      if (i <= 10) {
        values.push(payload[[colorNames[i]]])
      }
    })

    yield put(actions.getRadarChartSuccess(values))
  } catch (error) {
    yield put(actions.getRadarChartFailure({ error }))
  }
}

function* getPeopleRequest(ids) {
  try {
    const url = `/brand/${ids.payload.brandUuid}/video/${
      ids.payload.videoUuid
    }/shots/${ids.payload.shotId}/demographics`

    const payload = yield call(getDataFromApi, { url: url, requestType: 'GET' })

    yield put(actions.getPeopleSuccess(payload))
  } catch (error) {
    yield put(actions.getPeopleFailure({ error }))
  }
}

export default [
  takeLatest(types.GET_DOUGHNUT_CHART_REQUEST, getDoughnutChart),
  takeLatest(types.GET_COLOR_TEMP_REQUEST, getColorTemperatureData),
  takeLatest(types.GET_SHOT_BY_SHOT_REQUEST, getShotByShot),
  takeLatest(types.GET_SELECTED_VIDEO_REQUEST, getSelectedVideo),
  takeLatest(types.TOGGLE_INFO_SECTION, getDoughnutSectionInfoData),
  takeLatest(types.GET_SHOT_INFO_REQUEST, getShotInfoRequest),
  takeLatest(types.GET_SELECTED_VIDEO_AVERAGE_REQUEST, getVideoAverage),
  takeLatest(types.GET_RADAR_CHART_REQUEST, getRadarChartRequest),
  takeLatest(types.GET_PEOPLE_REQUEST, getPeopleRequest),
]
