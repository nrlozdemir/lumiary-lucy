import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { types, actions } from 'Reducers/reports'
import reportsMockData from 'Api/mocks/reportsMock.json'

function getReportsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => reportsMockData)
}

function* getReports() {
  try {
    const payload = yield call(getReportsApi)
    yield put(actions.loadReportsSuccess(payload))
  } catch (err) {
    yield put(actions.loadReportsError(err))
  }
}

export default [takeLatest(types.LOAD_REPORTS, getReports)]
