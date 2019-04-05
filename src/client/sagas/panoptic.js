import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/panoptic'
import panopticMockData from 'Api/mocks/panopticMock.json'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'

import _ from 'lodash'

function getPanopticDataApi() {
  //this will use ajax function in utils/api when real data is provided
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
    const payload = yield call(getPanopticDataApi)

    const shuffleData = payload.videoReleasesData
    shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
    shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
    yield put(actions.getVideoReleasesDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getVideoReleasesDataError(err))
  }
}

function* getColorTemperatureData() {
  try {
    const payload = yield call(getPanopticDataApi)

    const shuffleData = _.shuffle(payload.colorTempData)
    yield put(actions.getColorTemperatureDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getColorTemperatureDataError(err))
  }
}

function* getFilteringSectionData() {
  try {
    const payload = yield call(getPanopticDataApi)

    const shuffleData = {
      doughnutData: {
        ...payload.verticalStackedChartData.doughnutData,
        average: _.shuffle(
          payload.verticalStackedChartData.doughnutData.average
        ),
      },
      stackedChartData: {
        ...payload.verticalStackedChartData.stackedChartData,
        datasets: _.shuffle(
          payload.verticalStackedChartData.stackedChartData.datasets
        ),
      },
      doughnutRoundData: _.shuffle(
        payload.verticalStackedChartData.doughnutRoundData
      ),
    }
    yield put(actions.getFilteringSectionDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getFilteringSectionDataError(err))
  }
}

function* getPacingCardData() {
  try {
    const payload = yield call(getPanopticDataApi)
    const shuffleData = payload.pacingChartData
    shuffleData.datasets = _.shuffle(shuffleData.datasets)
    yield put(actions.getPacingCardDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getPacingCardDataError(err))
  }
}

function* getCompareSharesData() {
  try {
    const payload = yield call(getPanopticDataApi)
    const shuffleData = payload.compareSharesData
    console.log('shuffleData', shuffleData)
    shuffleData[0].datas.datasets[0].data = _.shuffle(
      shuffleData[0].datas.datasets[0].data
    )
    shuffleData[1].datas.datasets[0].data = _.shuffle(
      shuffleData[1].datas.datasets[0].data
    )

    yield put(actions.getCompareSharesDataSuccess(shuffleData))
  } catch (err) {
    yield put(actions.getCompareSharesDataError(err))
  }
}

function* getData() {
  try {
    const payload = yield call(getPanopticDataApi)
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

export default [
  takeLatest(types.GET_DATA, getData),
  takeLatest(types.GET_VIDEO_RELEASES_DATA, getVideoReleasesData),
  takeLatest(types.GET_COLOR_TEMPERATURE_DATA, getColorTemperatureData),
  takeLatest(types.GET_FILTERING_SECTION_DATA, getFilteringSectionData),
  takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
  takeLatest(types.GET_COMPARE_SHARES_DATA, getCompareSharesData),
  takeLatest(types.GET_AUDIENCE_DATA, getAudienceData),
  takeLatest(types.UPDATE_AUDIENCE_PERFORMANCE, updateAudiencePerformance),
]
