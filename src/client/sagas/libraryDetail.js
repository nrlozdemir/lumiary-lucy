import { takeLatest, call, put, select } from 'redux-saga/effects'

import _ from 'lodash'

import {
  types,
  actions,
  makeSelectInfoShowSection,
} from 'Reducers/libraryDetail'
import { getDataFromApi, buildApiUrl } from 'Utils/api'

import {
  getMaximumValueIndexFromArray,
  getLabelWithSuffix,
  numberFormatter,
} from 'Utils'
import { expectedNames } from 'Utils/globals'

import {
  convertIntoLibAndIndustryDoughnut,
  convertDataIntoDatasets,
  convertColorTempToDatasets,
  parseAverage,
  convertNumberArrIntoPercentages,
  percentageManipulation,
  convertPropertiesIntoDatasets,
} from 'Utils/datasets'

import { makeSelectAuthProfile } from 'Reducers/auth'

function* getDoughnutChart({ payload: { LibraryDetailId, themeColors } }) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const metric = 'views'

    const competitors =
      !!brand.competitors &&
      !!brand.competitors.length &&
      brand.competitors.map((c) => c.uuid)

    const url = buildApiUrl(`/brand/${brand.uuid}/properties`, {
      metric,
      top: 20,
      competitors,
      daterange: 'week',
    })

    const response = yield call(getDataFromApi, undefined, url, 'GET')

    if (!!response && !!response.myLibrary) {
      const highestBuckets = Object.keys(response.myLibrary).reduce(
        (acc, key) => {
          const dataVals = response.myLibrary[key]
          const max = dataVals.reduce(
            (prev, current) =>
              parseInt(prev[metric]) > parseInt(current[metric])
                ? prev
                : current,
            0
          )
          return [...acc, { property: key, ...max }]
        },
        []
      )

      const highestBucketsOrdered = _.slice(
        _.orderBy(
          highestBuckets,
          (item) => (!!item[metric] ? item[metric] : 0),
          ['desc']
        ),
        0,
        4
      )

      const vals = highestBucketsOrdered.reduce((acc, bucketItem, idx) => {
        const { bucket, property, library_proportion } = bucketItem

        const max = {
          label: getLabelWithSuffix(bucket, property),
          percentage: Math.round(parseFloat(library_proportion) * 100),
        }

        return [
          ...acc,
          {
            max,
            key: property,
            title: expectedNames[property],
            doughnutChartValues: convertPropertiesIntoDatasets(response, {
              metric,
              property,
              type: 'library',
              hoverBg: false,
              percentage: true,
              borderColor: '#ACB0BE',
              max: bucket,
            }),
          },
        ]
      }, [])

      yield put(actions.getDoughnutChartSuccess(vals))
    } else {
      throw new Error('Library/Detail Error getDoughnutChart')
    }
  } catch (error) {
    console.log(error)
    yield put(actions.getDoughnutChartFailure({ error }))
  }
}

function* getColorTemperatureData({
  payload: { videoId, daterange = 'week' },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

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
    const { brand } = yield select(makeSelectAuthProfile())

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

    yield put(
      actions.getSelectedVideoSuccess(percentageManipulation(response.video))
    )
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

    const { brand } = yield select(makeSelectAuthProfile())

    if (!!brand && !!videoId && !!dateRange && !!metric && !!infoData) {
      const response = yield call(
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
        libraryMetricPercents,
        industryMetricPercents,
        libraryMetricDateSums,
        industryMetricDateSums,
        industryDateCounts,
        videoPropertyAverage,
        libraryPropertyAverage,
        metricLibraryPercentChange,
      } = response

      const {
        maxKeyLabel: libraryMaxKeyLabel,
        chartData: libraryChartData,
        maxKey: libraryMaxKey,
        maxValue: libraryMaxValue,
      } = percentageManipulation(
        convertIntoLibAndIndustryDoughnut(
          libraryMetricPercents,
          property,
          '#2FD7C4'
        )
      )

      const {
        maxKeyLabel: industryMaxKeyLabel,
        chartData: industryChartData,
        maxKey: industryMaxKey,
        maxValue: industryMaxValue,
      } = percentageManipulation(
        convertIntoLibAndIndustryDoughnut(
          industryMetricPercents,
          property,
          '#8562f3'
        )
      )

      const libraryPercentages = percentageManipulation(
        convertNumberArrIntoPercentages(
          Object.values(libraryMetricDateSums[libraryMaxKeyLabel])
        )
      )
      const industryPercentages = percentageManipulation(
        convertNumberArrIntoPercentages(
          Object.values(industryMetricDateSums[industryMaxKeyLabel])
        )
      )

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
          videoPropertyAverage: numberFormatter(videoPropertyAverage, 0, false),
          realVideoPropertyAverage: videoPropertyAverage,
          libraryPropertyAverage: numberFormatter(
            libraryPropertyAverage,
            0,
            false
          ),
          realLibraryPropertyAverage: libraryPropertyAverage,
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
    const { brand } = yield select(makeSelectAuthProfile())
    const payload = yield call(
      getDataFromApi,
      undefined,
      `/brand/${brand.uuid}/video/${id}/metrics`,
      'GET'
    )

    yield put(
      actions.getSelectedVideoAverageSuccess(
        percentageManipulation(parseAverage(payload))
      )
    )
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

    yield put(actions.getRadarChartSuccess(percentageManipulation(values)))
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

    yield put(actions.getPeopleSuccess(percentageManipulation(payload)))
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
