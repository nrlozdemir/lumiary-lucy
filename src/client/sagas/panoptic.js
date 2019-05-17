import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/panoptic'

import panopticMockData from 'Api/mocks/panopticMock.json'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'

import { radarChartCalculate } from 'Utils'
import { compareSharesData } from 'Utils/api'

import { getReportDataApi } from 'Api'

import _ from 'lodash'

function getMockPanopticDataApi() {
  return axios.get('/').then((res) => panopticMockData)
}

function getAudienceDataApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => audienceMockData)
}

function updateAudiencePerformanceApi({ min, max }) {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => updateAudiencePer(min, max))
}

function* getVideoReleasesData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getVideoReleasesDataSuccess(payload.videoReleasesData))
  } catch (err) {
    yield put(actions.getVideoReleasesDataError(err))
  }
}

function* getColorTemperatureData() {
	try {
    const payload = yield call(getMockPanopticDataApi)
    let shuffleData = payload.colorTempData
    shuffleData = shuffleData.map((data) => {
      data.data.map((item) => {
        item.x = _.random(-50, 50)
        item.y = _.random(-50, 50)
      })
      return data
		})

		const colors = [
			"rgba(82, 146, 229, 0.8)",
			"#acb0be",
			"rgba(133, 103, 240, 0.8)",
			"rgba(81, 173, 192, 0.8)",
		]
		shuffleData = shuffleData.map((data) => {
      data.data.map((item, i) => {
        item.color = colors[i]
      })
      return data
    })
    yield put(actions.getColorTemperatureDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getColorTemperatureDataError(err))
  }
}

function* getFilteringSectionData(data) {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(
      actions.getFilteringSectionDataSuccess(payload.verticalStackedChartData)
    )
  } catch (err) {
    yield put(actions.getFilteringSectionDataError(err))
  }
}

function* getPacingCardData({ data }) {
  try {
    const { metric, dateRange } = data

    const options = {
      metric,
      dateRange,
      platform: 'all',
      property: ['pacing'],
      dateBucket: 'none',
      display: 'percentage',
    }

    const stadiumData = yield call(getReportDataApi, options)

    const horizontalStackedBarData = yield call(getReportDataApi, {
      ...options,
      proportionOf: 'format',
    })

    if (
      !!stadiumData.data &&
      !!stadiumData.data.pacing &&
      !!horizontalStackedBarData.data &&
      !!horizontalStackedBarData.data.pacing
    ) {
      const {
        data: { pacing: stadiumPacing },
      } = stadiumData

      const {
        data: { pacing: barChartPacing },
      } = horizontalStackedBarData

      yield put(
        actions.getPacingCardDataSuccess({
          stadiumData: stadiumPacing,
          horizontalStackedBarData: barChartPacing,
        })
      )
    } else {
      yield put(
        actions.getPacingCardDataError('Error fetching pacing card data')
      )
    }
  } catch (err) {
    console.log(err)
    yield put(actions.getPacingCardDataError(err))
  }
}

function* getCompareSharesData({ data: { dateRange } }) {
  try {
    const parameters = {
      dateRange,
      metric: 'shares',
      property: ['color'],
      dateBucket: 'none',
    }

    const payload = yield all([
      call(getReportDataApi, {
        ...parameters,
        platform: 'facebook',
      }),
      call(getReportDataApi, {
        ...parameters,
        platform: 'youtube',
      }),
    ])

    yield put(
      actions.getCompareSharesDataSuccess(
        radarChartCalculate(compareSharesData(payload))
      )
    )
  } catch (err) {
    yield put(actions.getCompareSharesDataError(err))
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
    shuffleData.datasets[0].data = _.shuffle(
      shuffleData.datasets[0].data.map((number) => -Math.abs(number))
    )
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

function* getAudienceDominantColorData() {
  try {
    const payload = yield call(getAudienceDataApi)
    let shuffleData = payload.chartData
    shuffleData[0].datas.labels.forEach((item, index) => {
      shuffleData[0].datas.labels[index].count = _.random(10, 90)
    })
    shuffleData[1].datas.labels.forEach((item, index) => {
      shuffleData[1].datas.labels[index].count = _.random(10, 90)
    })
    shuffleData = radarChartCalculate(shuffleData)
    yield put(actions.getAudienceDominantColorDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getAudienceDominantColorDataError(err))
  }
}

function* getData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getDataSuccess(payload))
  } catch (err) {
    yield put(actions.getDataError(err))
  }
}

function* getAudienceData() {
  try {
    const payload = yield call(getAudienceDataApi)
    yield put(actions.getAudienceDataSuccess(payload))
  } catch (err) {
    yield put(actions.getAudienceDataError(err))
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

function* getFlipCardsData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(actions.getFlipCardsDataSuccess(payload.flipCardsData))
  } catch (err) {
    yield put(actions.getFlipCardsDataError(err))
  }
}

function* getTopPerformingFormatData() {
  try {
    const payload = yield call(getMockPanopticDataApi)
    yield put(
      actions.getTopPerformingFormatDataSuccess(payload.topPerformingFormatData)
    )
  } catch (err) {
    yield put(actions.getTopPerformingFormatDataError(err))
  }
}

export default [
  takeLatest(types.GET_DATA, getData),
  takeLatest(types.GET_VIDEO_RELEASES_DATA, getVideoReleasesData),
  takeLatest(types.GET_COLOR_TEMPERATURE_DATA, getColorTemperatureData),
  takeLatest(types.GET_FILTERING_SECTION_DATA, getFilteringSectionData),
  takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
  takeLatest(types.GET_COMPARE_SHARES_DATA, getCompareSharesData),

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
    types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA,
    getAudienceContentVitalityScoreData
  ),
  takeLatest(
    types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
    getAudienceDominantColorData
  ),

  takeLatest(types.GET_AUDIENCE_DATA, getAudienceData),
  takeLatest(types.UPDATE_AUDIENCE_PERFORMANCE, updateAudiencePerformance),
  takeLatest(types.GET_FLIPCARDS_DATA, getFlipCardsData),
  takeLatest(types.GET_TOP_PERFORMING_FORMAT_DATA, getTopPerformingFormatData),
]
