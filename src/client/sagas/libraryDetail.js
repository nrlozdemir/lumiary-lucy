import { takeLatest, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import { ajax } from 'Utils/api'
import _ from 'lodash'

import {
  types,
  actions,
  makeSelectInfoShowSection,
  makeSelectDoughnutFilters,
  selectShotInfoData,
} from 'Reducers/libraryDetail'
import mock from 'Api/mocks/libraryMock.json'
import { findIdDetail, getDataFromApi, buildApiUrl } from 'Utils/api'

import { getMaximumValueIndexFromArray, getLabelWithSuffix } from 'Utils'

import {
  convertDataIntoDatasets,
  convertColorTempToDatasets,
  parseAverage,
} from 'Utils/datasets'

import { selectAuthProfile } from 'Reducers/auth'

function getBarChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'HeaderBarChartMock'))
}

function* getBarChart({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getBarChartApi, {
      LibraryDetailId,
    })
    yield put(actions.getBarChartSuccess(payload))
  } catch (error) {
    yield put(actions.getBarChartFailure({ error }))
  }
}

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
      url: '/report',
    }
    const response = yield call(getDataFromApi, {
      ...parameters,
      property: expectedValues.map(({ key }) => key),
    })

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

    yield put(actions.getDoughnutChartSuccess(val))
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
        payload: convertedData,
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
    yield put(actions.getShotByShotSuccess(payload))
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }))
  }
}

function* getShotInfoRequest({ payload }) {
  try {
    const { brandUuid, videoUuid, shotId } = payload


    if (!!brandUuid && !!videoUuid && !!shotId) {
      const url = `/brand/${brandUuid}/video/${videoUuid}/shots/${shotId}`

      const payload = yield call(getDataFromApi, undefined, url, 'GET')

      yield put(actions.getShotInfoSuccess(payload))
    }
  } catch (error) {
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

    yield put(actions.getSelectedVideoSuccess(response.video))
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
      let {
        libraryMetricPercents,
        industryMetricPercents,
        libraryDayAverages,
        industryDayAverages,
        videoPropertyAverage,
        libraryPropertyAverage,
        metricLibraryPercentChange,
      } = yield call(
        getDataFromApi,
        undefined,
        buildApiUrl(`/brand/${brand.uuid}/video/${videoId}/compare`, {
          metric: property,
          property: metric,
          daterange: dateRange,
        }),
        'GET'
      )

      let libraryChartData = null,
        libraryMaxKey,
        libraryMaxValue,
        libraryChartMax

      if (
        Object.keys(libraryMetricPercents).length &&
        !Object.keys(libraryMetricPercents).includes('undefined')
      ) {
        libraryChartMax = _.max(Object.values(libraryMetricPercents))

        libraryChartData = {
          labels: Object.keys(libraryMetricPercents).map((key) =>
            getLabelWithSuffix(key, metric)
          ),
          datasets: [
            {
              borderColor: '#ACB0BE',
              label: infoData.title,
              data: Object.values(libraryMetricPercents).map((val) =>
                Math.floor(val * 100)
              ),
              backgroundColor: Object.values(libraryMetricPercents).map((val) =>
                val === libraryChartMax ? '#2FD7C4' : '#fff'
              ),
              hoverBackgroundColor: [],
            },
          ],
        }[(libraryMaxKey, libraryMaxValue)] = Object.entries(
          libraryMetricPercents
        ).sort(([, v1], [, v2]) => (v1 > v2 ? -1 : 1))[0]
      }

      let industryChartData = null,
        industryChartMax,
        industryMaxKey,
        industryMaxValue

      if (
        Object.keys(industryMetricPercents).length &&
        !Object.keys(industryMetricPercents).includes('undefined')
      ) {
        industryChartMax = _.max(Object.values(industryMetricPercents))

        industryChartData = {
          labels: Object.keys(industryMetricPercents).map((key) =>
            getLabelWithSuffix(key, metric)
          ),
          datasets: [
            {
              borderColor: '#ACB0BE',
              label: infoData.title,
              data: Object.values(industryMetricPercents).map((val) =>
                Math.floor(val * 100)
              ),
              backgroundColor: Object.values(industryMetricPercents).map(
                (val) => (val === industryChartMax ? '#2FD7C4' : '#fff')
              ),
              hoverBackgroundColor: [],
            },
          ],
        }[(industryMaxKey, industryMaxValue)] = Object.entries(
          industryMetricPercents
        ).sort(([, v1], [, v2]) => (v1 > v2 ? -1 : 1))[0]
      }

      yield put(
        actions.doughnutInfoIndustrySuccess({
          libraryChartData,
          libraryMaxKey,
          libraryMaxValue: Math.floor(libraryMaxValue * 100),
          industryChartData,
          industryMaxKey,
          industryMaxValue: Math.floor(industryMaxValue * 100),
          libraryDayAverages: Object.values(libraryDayAverages).map((val) =>
            Math.floor(val * 100)
          ),
          industryDayAverages: Object.values(industryDayAverages).map((val) =>
            Math.floor(val * 100)
          ),
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
    } else {
      yield put(
        actions.doughnutInfoIndustryFailure('Doughnut Info Request Error')
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
      'red-purple'
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
  takeLatest(types.GET_BAR_CHART_REQUEST, getBarChart),
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
