import { call, put, take, actionChannel } from 'redux-saga/effects'
import axios from 'axios'
import globalMockData from 'Api/mocks/globalMock.json'
import { actions } from 'Reducers/global'
import { moduleIds } from 'Utils/globals'

function getGlobalDataApi(name, key) {
  return axios
    .get('/')
    .then((res) =>
      globalMockData[name]
        ? key
          ? globalMockData[name][key]
          : globalMockData[name]
        : null
    )
}

function* getSectionExplanations({ payload: { key } }) {
  try {
    const response = yield call(
      getGlobalDataApi,
      'sectionExplanations',
      moduleIds[key] || '123'
    )

    yield put(actions.getSectionExplanationsSuccess({ key, response }))
    return false
  } catch (err) {
    console.error('err', err)
    yield put(actions.getSectionExplanationsFailure({ key, err }))
  }
}

export default {
  getSectionExplanations,
}
