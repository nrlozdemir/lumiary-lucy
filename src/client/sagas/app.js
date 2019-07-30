import { call, put, takeEvery } from 'redux-saga/effects'

import { actions, types } from 'Reducers/app'
import { buildQApiUrl, getDataFromApi } from 'Utils/api'

function* getSectionExplanations() {
  try {
    // const response = yield call(getGlobalDataApi)
    // console.log(response)
    // https://api-local.quickframe.com:8080/v1/

    const response = yield call(
      getDataFromApi,
      {},
      buildQApiUrl(`/glossary/26e8b71a-b1df-4542-8784-99e7b6a7b795`),
      'GET'
    )
    yield put(actions.getSectionExplanationsSuccess(response))
  } catch (err) {
    console.error('err', err)
    yield put(actions.getSectionExplasnationsFailure(err))
  }
}

export default [
  takeEvery(types.GET_SECTION_EXPLANATIONS_REQUEST, getSectionExplanations),
]
