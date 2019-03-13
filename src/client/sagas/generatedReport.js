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
    const payload = yield call(getGeneratedReportApi)
    yield put(actions.loadGeneratedReportSuccess(payload))
  } catch (err) {
    yield put(actions.loadGeneratedReportError(err))
  }
}

export default [takeLatest(types.LOAD_GENERATED_REPORT, getGeneratedReport)]
