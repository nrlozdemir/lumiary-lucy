import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { types, actions } from 'Reducers/generatedReport'
import generatedReportMockData from 'Api/mocks/generatedReportMock.json'

function getGeneratedReportApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => generatedReportMockData)
}

function* getGeneratedReport() {
  try {
		let payload = yield call(getGeneratedReportApi)
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

		payload.colorTempData = shuffleData

    yield put(actions.loadGeneratedReportSuccess(payload))
  } catch (err) {
    yield put(actions.loadGeneratedReportError(err))
  }
}

export default [takeLatest(types.LOAD_GENERATED_REPORT, getGeneratedReport)]
