import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/audience'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'
import { selectAuthProfile } from 'Reducers/auth'

import { getDataFromApi, buildApiUrl } from 'Utils/api'

import {
  radarChartCalculate,
  compareSharesData,
  percentageManipulation,
} from 'Utils/datasets'

import _ from 'lodash'

function getAudienceDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => audienceMockData)
}

function* getAudienceContentVitalityScoreData({ payload = {} }) {
  const { platform, metric, dateRange } = payload

  try {
    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/cvscores`, {
        metric,
        platform,
        daterange: dateRange,
      }),
      'GET'
    )

    if (!!response && !!Object.keys(response).length) {
      yield put(
        actions.getAudienceContentVitalityScoreDataSuccess(
          percentageManipulation(response)
        )
      )
    } else {
      throw new Error('Audience/getAudienceContentVitalityScoreData Error')
    }
  } catch (err) {
    yield put(actions.getAudienceContentVitalityScoreDataError(err))
  }
}

function* getAudiencePerformanceData({ payload = {} }) {
  const { platform, metric, property, dateRange, min = 0, max = 100 } = payload

  try {
    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/performance`, {
        metric,
        platform,
        property,
        ageMin: min,
        ageMax: max,
        daterange: dateRange,
      }),
      'GET'
    )

    if (!!response) {
      const updatedResponse = Object.keys(response).reduce((newData, key) => {
        newData[key] = Object.keys(response[key]).map((v) => ({
          visual: v,
          toolTip: response[key][v],
        }))
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
    yield put(actions.getAudiencePerformanceDataError(err))
  }
}

function* getAudienceAgeSliderData({ payload = {} }) {
  const { metric, dateRange, ages = [] } = payload

  const fallBack = ages.map((a) => ({ age: a, loading: false, image: null }))

  try {
    const { brand } = yield select(selectAuthProfile)

    const response = yield call(
      getDataFromApi,
      undefined,
      buildApiUrl(`/audience/${brand.uuid}/popular`, {
        metric,
        ages,
        daterange: '3months',
      }),
      'GET'
    )

    yield put(
      actions.getAudienceAgeSliderDataSuccess(percentageManipulation(response))
    )
  } catch (err) {
    yield put(
      actions.getAudienceAgeSliderDataSuccess(percentageManipulation(fallBack))
    )
    yield put(actions.getAudienceAgeSliderDataError(err))
  }
}

function* getAudienceGenderData() {
  try {
    const payload = yield call(getAudienceDataApi)
    const shuffleData = payload.genderData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(
      actions.getAudienceGenderDataSuccess(percentageManipulation(shuffleData))
    )
  } catch (err) {
    yield put(actions.getAudienceGenderDataError(err))
  }
}

function* getAudienceColorTemperatureData() {
  try {
    const payload = yield call(getAudienceDataApi)
    let shuffleData = payload.colorTempData
    shuffleData = shuffleData.map((data) => {
      data.data.map((item) => {
        item.x = _.random(-50, 50)
        item.y = _.random(-50, 50)
      })
      return data
    })

    const topTexts = ['Happy', 'Energetic', 'Natural']

    const bottomTexts = ['Sad', 'Calm', 'Synthetic']

    const leftTexts = ['Cool', 'Cool', 'Cool']

    const rightTexts = ['Warm', 'Warm', 'Warm']

    shuffleData = shuffleData.map((data, i) => {
      data.topText = topTexts[i]
      data.bottomText = bottomTexts[i]
      data.leftText = leftTexts[i]
      data.rightText = rightTexts[i]
      data.data.map((item, i) => {
        item.color = i === 0 ? '#5292e5' : '#2fd7c4'
      })
      return data
    })
    yield put(
      actions.getAudienceColorTemperatureDataSuccess(
        percentageManipulation(shuffleData)
      )
    )
  } catch (err) {
    yield put(actions.getAudienceColorTemperatureDataError(err))
  }
}

function* getAudienceChangeOverTimeData() {
  try {
    const payload = yield call(getAudienceDataApi)
    let shuffleData = payload.lineChartData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(
      actions.getAudienceChangeOverTimeDataSuccess(
        percentageManipulation(shuffleData)
      )
    )
  } catch (err) {
    yield put(actions.getAudienceChangeOverTimeDataError(err))
  }
}

function* getAudienceDominantColorData({ data: { dateRange, metric } }) {
  try {
    const { brand } = yield select(selectAuthProfile)
    const parameters = {
      url: '/report',
      dateRange,
      metric,
      property: ['color'],
      dateBucket: 'none',
      brands: [brand.uuid],
    }

    // TODO: We need to change platform when gender data comes.
    // platform is wrong parameter. they are here to work request
    const payload = yield all([
      call(getDataFromApi, {
        ...parameters,
        platform: 'facebook',
        // gender: 'male',
      }),
      call(getDataFromApi, {
        ...parameters,
        platform: 'youtube',
        // gender: 'female',
      }),
    ])

    yield put(
      actions.getAudienceDominantColorDataSuccess(
        percentageManipulation(
          radarChartCalculate(compareSharesData(payload, parameters))
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
  takeLatest(
    types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA,
    getAudienceColorTemperatureData
  ),
  takeLatest(
    types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA,
    getAudienceChangeOverTimeData
  ),
  takeLatest(
    types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
    getAudienceDominantColorData
  ),
]
