import { call, put, takeEvery, delay } from 'redux-saga/effects'
import axios from 'axios'
import globalMockData from 'Api/mocks/globalMock.json'
import { actions, types } from 'Reducers/global'
import { moduleIds } from 'Utils/globals'

function getGlobalDataApi(name, key) {
  const delayData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

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

  return delayData()
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

export default [
  takeEvery(types.GET_SECTION_EXPLANATIONS_REQUEST, getSectionExplanations),
]
