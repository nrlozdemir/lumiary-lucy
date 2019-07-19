import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import appMockData from 'Api/mocks/appMock.json'
import { actions, types } from 'Reducers/app'

function getGlobalDataApi(name) {
  return axios.get('/').then((res) => appMockData[name])
}

function* getSectionExplanations() {
  try {
    const response = yield call(getGlobalDataApi, 'sectionExplanations')

    yield put(actions.getSectionExplanationsSuccess(response))
    return false
  } catch (err) {
    console.error('err', err)
    yield put(actions.getSectionExplanationsFailure(err))
  }
}

export default [
  takeEvery(types.GET_SECTION_EXPLANATIONS_REQUEST, getSectionExplanations),
]
