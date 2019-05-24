import axios from 'axios'
import mock from 'Api/mocks/libraryMock.json'
import { findIdDetail, getReportDataApi } from 'Utils/api'
import { types, actions } from 'Reducers/libraryDetail'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { convertDataIntoDatasets, getMaximumValueIndexFromArray } from 'Utils/'
import { selectAuthProfile } from 'Reducers/auth'
import { getBrandAndCompetitors } from 'Utils/'

function getBarChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'HeaderBarChartMock'))
}
function getDoughnutChartApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'DoughnutChartMock'))
}
function getColorTempApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'ColorTempMock'))
}
function getShotByShotApi({ LibraryDetailId }) {
  //this will use ajax function in utils/api when real data is provided
  return axios
    .get('/')
    .then((res) => findIdDetail(mock, LibraryDetailId, 'ShotByShotMock'))
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

function* getDoughnutChart({ payload: { LibraryDetailId } }) {
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
    const payloads = yield expectedValues.map((item) =>
      call(getReportDataApi, {
        ...parameters,
        property: [item.key],
      })
    )
    const createCustomBackground = (data) => {
      return Object.values(data).map((item, idx) => {
        if (Object.values(data).includes(100)) {
          return '#2FD7C4'
        }
        return idx === getMaximumValueIndexFromArray(data)
          ? '#2FD7C4'
          : '#ffffff'
      })
    }
    const val = expectedValues.map((payload, idx) => ({
      ...payload,
      doughnutChartValues: convertDataIntoDatasets(
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
      ),
    }))

    yield put(actions.getDoughnutChartSuccess(val))
  } catch (error) {
    yield put(actions.getDoughnutChartFailure({ error }))
  }
}

function* getColorTemperatureData({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getColorTempApi, {
      LibraryDetailId,
    })

    let shuffleData = payload.colorTempData
    shuffleData = shuffleData.map((data) => {
      data.data.map((item) => {
        item.x = _.random(-50, 50)
        item.y = _.random(-50, 50)
      })
      return data
    })

    const colors = ['#2fd7c4', '#8562f3', '#5292e5']
    shuffleData = shuffleData.map((data) => {
      data.data.map((item, i) => {
        item.color = colors[i]
      })
      return data
    })

    yield put({
      type: types.GET_COLOR_TEMP_SUCCESS,
      payload: shuffleData,
    })
  } catch (err) {
    yield put(actions.getColorTempFailure(err))
  }
}

function* getShotByShot({ payload: { LibraryDetailId } }) {
  try {
    const payload = yield call(getShotByShotApi, {
      LibraryDetailId,
    })
    yield put(actions.getShotByShotSuccess(payload))
  } catch (error) {
    yield put(actions.getShotByShotFailure({ error }))
  }
}

export default [
  takeLatest(types.GET_BAR_CHART_REQUEST, getBarChart),
  takeLatest(types.GET_DOUGHNUT_CHART_REQUEST, getDoughnutChart),
  takeLatest(types.GET_COLOR_TEMP_REQUEST, getColorTemperatureData),
  takeLatest(types.GET_SHOT_BY_SHOT_REQUEST, getShotByShot),
]
