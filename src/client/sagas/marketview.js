import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'
import _ from 'lodash'

import { types, actions } from 'Reducers/marketview'
import marketviewCompetitorVideosData from 'Api/mocks/marketviewCompetitorVideos.json'
import marketviewCompetitorTopVideosData from 'Api/mocks/marketviewCompetitorTopVideosMock.json'
import marketviewSimilarPropertiesData from 'Api/mocks/marketviewSimilarProperties.json'
import marketviewBubbleChartData from 'Api/mocks/marketviewBubbleChartMock.json'
import marketviewPacingChartData from 'Api/mocks/marketviewPacingChartMock.json'
import marketviewFormatChartData from 'Api/mocks/marketviewFormatChartMock.json'
import marketviewTotalViewsData from 'Api/mocks/marketviewTotalViewsMock.json'
import marketviewTotalCompetitorViewsData from 'Api/mocks/marketviewTotalCompetitorViewsMock.json'
import marketviewTimeMockData from 'Api/mocks/marketviewTimeMock.json'
import marketviewTopPerformingProperties from 'Api/mocks/marketviewPlatformTopPerformingProperty.json'
import marketviewTopPerformingPropertiesCompetitors from 'Api/mocks/marketviewPlatformTopPerformingPropertyCompetitors.json'

function getCompetitorVideosApi() {
  return axios('/').then((res) => marketviewCompetitorVideosData)
}

function getCompetitorTopVideosApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewCompetitorTopVideosData)
}

function getSimilarPropertiesApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewSimilarPropertiesData)
}

function getBubbleChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewBubbleChartData)
}

function getPacingChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewPacingChartData)
}

function getFormatChartApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewFormatChartData)
}

function getTotalViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTotalViewsData)
}

function getTotalCompetitorViewsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTotalCompetitorViewsData)
}

function getMarketviewDaysApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTimeMockData)
}

function getGetTopPerformingPropertiesApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => marketviewTopPerformingProperties)
}

function getGetTopPerformingPropertiesByCompetitorsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => marketviewTopPerformingPropertiesCompetitors)
}

function* getCompetitorVideosMarketview() {
  try {
    const payload = yield call(getCompetitorVideosApi)
    yield put(actions.getCompetitorVideosSuccess(payload))
  } catch (error) {
    yield put(actions.getCompetitorVideosFailure({ error }))
  }
}

function* getCompetitorTopVideosMarketview() {
  try {
		const payload = yield call(getCompetitorTopVideosApi)

		for (const set of payload.datasets) {
			set.data = _.shuffle(set.data);
		}

    yield put(actions.getCompetitorTopVideosSuccess(payload))
  } catch (e) {
    yield put(actions.getCompetitorTopVideosFailure({ e }))
  }
}

function* getSimilarProperties() {
  try {
    const payload = yield call(getSimilarPropertiesApi)
    yield put(actions.getSimilarPropertiesSuccess(payload))
  } catch (error) {
    yield put(actions.getSimilarPropertiesFailure(error))
  }
}

function* getBubbleChartData() {
  try {
    const payload = yield call(getBubbleChartApi)
    yield put(actions.getBubleChartSuccess(payload))
  } catch (error) {
    yield put(actions.getBubleChartFailure(error))
  }
}

function* getPacingChartData() {
  try {
    const payload = yield call(getPacingChartApi)
    yield put(actions.getPacingChartSuccess(payload))
  } catch (error) {
    yield put(actions.getPacingChartFailure(error))
  }
}

function* getFormatChartData() {
  try {
    const payload = yield call(getFormatChartApi)
    yield put(actions.getFormatChartSuccess(payload))
  } catch (error) {
    yield put(actions.getFormatChartFailure(error))
  }
}

function* getTotalViewsData(data) {
  try {
    const payload = yield call(getTotalViewsApi)
    const shuffleBarData = _.shuffle(payload.barData.datasets)
    const shuffleDoughnutData = _.shuffle(payload.doughnutData.datasets[0].data)
    payload.barData.datasets = shuffleBarData
    payload.doughnutData.datasets[0].data = shuffleDoughnutData

    yield put(actions.getTotalViewsSuccess(payload))
  } catch (error) {
    yield put(actions.getTotalViewsFailure(error))
  }
}

function* getTotalCompetitorViewsData() {
  try {
		const payload = yield call(getTotalCompetitorViewsApi)

		for (const set of payload.datasets) {
			set.data = _.shuffle(set.data);
		}

    yield put(actions.getTotalCompetitorViewsSuccess(payload))
  } catch (error) {
    yield put(actions.getTotalCompetitorViewsFailure(error))
  }
}

function* getmarketviewTimeMockData() {
  try {
		const payload = yield call(getMarketviewDaysApi)

		for (const day in payload) {
			for (const set of payload[day].CompetitorTopVideos.datasets) {
				set.data = _.shuffle(set.data);
			}

			payload[day].CompetitorVideos = _.shuffle(payload[day].CompetitorVideos);
		}

    yield put(actions.getMarketviewDetailTimeSuccess(payload))
  } catch (error) {
    yield put(actions.getMarketviewDetailTimeFailure(error))
  }
}

function* getTopPerformingPropertiesData() {
  try {
		const payload = yield call(getGetTopPerformingPropertiesApi)

		for (const set of payload.datasets) {
			set.data = _.shuffle(set.data);
		}

    yield put(actions.getTopPerformingPropertiesSuccess(payload))
  } catch (error) {
    yield put(actions.getTopPerformingPropertiesFailure(error))
  }
}

function* getTopPerformingPropertiesByCompetitorsData() {
  try {
		const payload = yield call(getGetTopPerformingPropertiesByCompetitorsApi)

		for (const set of payload.datasets) {
			set.data = _.shuffle(set.data);
		}

    yield put(actions.getTopPerformingPropertiesByCompetitorsSuccess(payload))
  } catch (error) {
    yield put(actions.getTopPerformingPropertiesByCompetitorsFailure(error))
  }
}

export default [
  takeLatest(
    types.GET_MARKETVIEW_COMPETITOR_TOP_VIDEOS_REQUEST,
    getCompetitorTopVideosMarketview
  ),
  takeLatest(
    types.GET_MARKETVIEW_COMPETITOR_VIDEOS_REQUEST,
    getCompetitorVideosMarketview
  ),
  takeLatest(
    types.GET_MARKETVIEW_SIMILAR_PROPERTIES_REQUEST,
    getSimilarProperties
  ),
  takeLatest(types.GET_MARKETVIEW_BUBBLECHART_REQUEST, getBubbleChartData),
  takeLatest(types.GET_MARKETVIEW_PACINGCHART_REQUEST, getPacingChartData),
  takeLatest(types.GET_MARKETVIEW_FORMATCHART_REQUEST, getFormatChartData),
  takeLatest(types.GET_MARKETVIEW_TOTALVIEWS_REQUEST, getTotalViewsData),
  takeLatest(
    types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST,
    getTotalCompetitorViewsData
  ),
  takeLatest(
    types.GET_MARKETVIEW_DETAIL_TIME_REQUEST,
    getmarketviewTimeMockData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOTALCOMPETITORVIEWS_REQUEST,
    getTotalCompetitorViewsData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_REQUEST,
    getTopPerformingPropertiesData
  ),
  takeLatest(
    types.GET_MARKETVIEW_TOP_PERFORMING_PROPERTIES_BY_COMPETITORS_REQUEST,
    getTopPerformingPropertiesByCompetitorsData
  ),
]
