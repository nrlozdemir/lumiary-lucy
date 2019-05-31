import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/audience'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'
import { selectAuthProfile } from 'Reducers/auth'

import { compareSharesData, radarChartCalculate } from 'Utils'

import { getDataFromApi } from 'Utils/api'

import _ from 'lodash'

function getAudienceDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => audienceMockData)
}

function updateAudiencePerformanceApi({ min, max }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => updateAudiencePer(min, max))
}

function* getAudienceContentVitalityScoreData() {
  try {
    const payload = yield call(getAudienceDataApi)
    let shuffleData = payload.lineStackedChartData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(actions.getAudienceContentVitalityScoreDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getAudienceContentVitalityScoreDataError(err))
  }
}

function* getAudiencePerformanceData() {
  try {
    const payload = yield call(getAudienceDataApi)
    const shuffleData = payload.performance
    shuffleData.bubblesBoth = _.shuffle(shuffleData.bubblesBoth)
    shuffleData.bubblesFemales = _.shuffle(shuffleData.bubblesFemales)
    shuffleData.bubblesMales = _.shuffle(shuffleData.bubblesMales)
    yield put(actions.getAudiencePerformanceDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getAudiencePerformanceDataError(err))
  }
}

function* updateAudiencePerformance({ payload: { min, max } }) {
  try {
    const payload = yield call(updateAudiencePerformanceApi, { min, max })
    yield put(actions.updateAudiencePerformanceSuccess(payload))
  } catch (err) {
    yield put(actions.updateAudiencePerformanceError(err))
  }
}

function* getAudienceAgeSliderData() {
  try {
    const payload = yield call(getAudienceDataApi)
    const randomImage = (image) => {
      return image.replace(
        /image=(\d+)/g,
        'image=' + Math.floor(Math.random(1) * Math.floor(30))
      )
    }
    const data = payload.ageSlider
    data.map((element) => (element.image = randomImage(element.image)))
    yield put(actions.getAudienceAgeSliderDataSuccess(data))
  } catch (err) {
    yield put(actions.getAudienceAgeSliderDataError(err))
  }
}

function* getAudienceGenderData() {
  try {
    const payload = yield call(getAudienceDataApi)
    const shuffleData = payload.genderData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(actions.getAudienceGenderDataSuccess(shuffleData))
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
    yield put(actions.getAudienceColorTemperatureDataSuccess(shuffleData))
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
    yield put(actions.getAudienceChangeOverTimeDataSuccess(shuffleData))
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
        radarChartCalculate(compareSharesData(payload))
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
  takeLatest(types.UPDATE_AUDIENCE_PERFORMANCE, updateAudiencePerformance),
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
