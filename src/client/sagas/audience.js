import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/audience'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'
import { makeSelectAuthProfile } from 'Reducers/auth'

import { getColorPercents, normalizationBubbleMapping } from 'Utils'
import { getDataFromApi, buildApiUrl } from 'Utils/api'

import {
  convertDurationLabels,
  radarChartCalculate,
  compareSharesData,
  percentageManipulation,
} from 'Utils/datasets'

import _ from 'lodash'

function* getAudienceContentVitalityScoreData({ payload = {} }) {
  const { platform, metric, dateRange, type } = payload

  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/cvscores`, {
        paid: type === 'paid',
        metric,
        platform,
        daterange: dateRange,
      }),
      'GET'
    )

    if (!!response && !!Object.keys(response).length) {
      yield put(
        actions.getAudienceContentVitalityScoreDataSuccess(
          percentageManipulation({ data: response, platform })
        )
      )
    } else {
      throw new Error('Audience/getAudienceContentVitalityScoreData Error')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAudienceContentVitalityScoreDataError(err))
  }
}

function* getAudiencePerformanceData({ payload = {} }) {
  const {
    platform,
    metric,
    property,
    dateRange,
    min = 0,
    max = 100,
    type,
  } = payload

  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/performance`, {
        metric,
        platform,
        property,
        ageMin: min,
        ageMax: max,
        paid: type === 'paid',
        daterange: dateRange,
      }),
      'GET'
    )

    // const response = {
    //   male: {
    //     Medium: 401000,
    //     Slow: 100000,
    //     Slowest: 2000,
    //     Fast: 18500000,
    //   },
    //   female: {
    //     Medium: 4801000,
    //     Slow: 400000,
    //     Slowest: 1000,
    //     Fast: 500000,
    //   },
    //   both: {
    //     Medium: 1000,
    //     Slow: 4340000,
    //     Slowest: 112000,
    //     Fast: 30000,
    //   },
    // }

    if (!!response) {
      if (property === 'duration') {
        Object.keys(response).forEach((key) => {
          response[key] = convertDurationLabels(response[key], property, true)
        })
      }

      let updatedResponse = Object.keys(response).reduce((newData, key) => {
        newData[key] = Object.keys(response[key]).map((v) => ({
          visual: v,
          value: response[key][v],
          min,
          max,
          property,
        }))
        return newData
      }, {})

      // normalization datas for bubble can calculate the size.
      updatedResponse = Object.keys(updatedResponse).reduce((newData, key) => {
        newData[key] = normalizationBubbleMapping(
          updatedResponse[key],
          50,
          70,
          'audience'
        )
        return newData
      }, {})

      yield put(
        actions.getAudiencePerformanceDataSuccess(
          percentageManipulation(updatedResponse)
        )
      )
    } else {
      throw new Error('Audience/getAudiencePerformanceData Error')
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getAudiencePerformanceDataError(err))
  }
}

function* getAudienceAgeSliderData({ payload = {} }) {
  const { metric, dateRange, ages = [], type, platform } = payload

  const fallBack = ages.map((a) => ({ age: a, loading: false, image: null }))

  try {
    const { brand } = yield select(makeSelectAuthProfile())

    if (!!ages.length) {
      const response = yield call(
        getDataFromApi,
        undefined,
        buildApiUrl(`/audience/${brand.uuid}/popular`, {
          ages: ages.map((a) => encodeURIComponent(a)),
          metric,
          platform,
          daterange: dateRange,
          paid: type === 'paid',
        }),
        'GET'
      )

      if (!!response && !!response.length) {
        const responseNullChecked = response.map((obj, idx) =>
          _.isEmpty(obj) ? { age: ages[idx], loading: false, image: null } : obj
        )

        yield put(
          actions.getAudienceAgeSliderDataSuccess(
            percentageManipulation(responseNullChecked)
          )
        )
      } else {
        throw new Error('Audience/getAudienceAgeSliderData Error')
      }
    }
  } catch (err) {
    console.log(err)
    yield put(
      actions.getAudienceAgeSliderDataSuccess(percentageManipulation(fallBack))
    )
    yield put(actions.getAudienceAgeSliderDataError(err))
  }
}

function* getAudienceGenderData({ payload = {} }) {
  const { property, metric, dateRange, type, platform } = payload

  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/properties`, {
        metric,
        platform,
        property,
        paid: type === 'paid',
        daterange: dateRange,
      }),
      'GET'
		)

    yield put(
      actions.getAudienceGenderDataSuccess(
				{
					dataset: percentageManipulation(convertDurationLabels(response, property)),
					tooltipData: {
						property,
						platform
					}
				}
      )
    )
  } catch (err) {
    console.log(err)
    yield put(actions.getAudienceGenderDataError(err))
  }
}

// function* getAudienceColorTemperatureData() {
//   try {
//     const payload = yield call(getAudienceDataApi)
//     let shuffleData = payload.colorTempData
//     shuffleData = shuffleData.map((data) => {
//       data.data.map((item) => {
//         item.x = _.random(-50, 50)
//         item.y = _.random(-50, 50)
//       })
//       return data
//     })

//     const topTexts = ['Happy', 'Energetic', 'Natural']

//     const bottomTexts = ['Sad', 'Calm', 'Synthetic']

//     const leftTexts = ['Cool', 'Cool', 'Cool']

//     const rightTexts = ['Warm', 'Warm', 'Warm']

//     shuffleData = shuffleData.map((data, i) => {
//       data.topText = topTexts[i]
//       data.bottomText = bottomTexts[i]
//       data.leftText = leftTexts[i]
//       data.rightText = rightTexts[i]
//       data.data.map((item, i) => {
//         item.color = i === 0 ? '#5292e5' : '#2fd7c4'
//       })
//       return data
//     })
//     yield put(
//       actions.getAudienceColorTemperatureDataSuccess(
//         percentageManipulation(shuffleData)
//       )
//     )
//   } catch (err) {
//     yield put(actions.getAudienceColorTemperatureDataError(err))
//   }
// }

function* getAudienceChangeOverTimeData({ payload = {} }) {
  const { property, platform, metric, dateRange, type, bucketName } = payload

  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/change`, {
        metric,
        property,
        platform,
        bucketName: encodeURIComponent(bucketName),
        paid: type === 'paid',
        daterange: dateRange,
      }),
      'GET'
    )

    yield put(
      actions.getAudienceChangeOverTimeDataSuccess(
        percentageManipulation(response)
      )
    )
  } catch (err) {
    console.log(err)
    yield put(actions.getAudienceChangeOverTimeDataError(err))
  }
}

function* getAudienceDominantColorData({
  data: { dateRange, metric, type, platform },
}) {
  try {
    const { brand } = yield select(makeSelectAuthProfile())

    const parameters = {
      metric,
      platform,
      daterange: dateRange,
      paid: type === 'paid',
    }

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/dominantcolor`, parameters),
      'GET'
    )

    const formattedResponse = getColorPercents(response, true)

    yield put(
      actions.getAudienceDominantColorDataSuccess(
        percentageManipulation(
          radarChartCalculate(
            compareSharesData({ data: formattedResponse }, parameters)
          )
        )
      )
    )
  } catch (err) {
    console.log('err', err)
    yield put(actions.getAudienceDominantColorDataError(err))
  }
}

export default [
  takeLatest(
    types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA,
    getAudienceContentVitalityScoreData
  ),
  takeLatest(types.GET_AUDIENCE_PERFORMANCE_DATA, getAudiencePerformanceData),
  takeLatest(types.GET_AUDIENCE_AGE_SLIDER_DATA, getAudienceAgeSliderData),
  takeLatest(types.GET_AUDIENCE_GENDER_DATA, getAudienceGenderData),
  // takeLatest(
  //   types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA,
  //   getAudienceColorTemperatureData
  // ),
  takeLatest(
    types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA,
    getAudienceChangeOverTimeData
  ),
  takeLatest(
    types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
    getAudienceDominantColorData
  ),
]
