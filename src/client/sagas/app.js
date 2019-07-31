import { call, put, takeEvery, select } from 'redux-saga/effects'

import { actions, types } from 'Reducers/app'
import { buildQApiUrl, getDataFromApi } from 'Utils/api'
import { makeSelectAuthProfile } from 'Reducers/auth'

function* getSectionExplanations() {
  try {
    const { brand } = yield select(makeSelectAuthProfile)

    if (!!brand && !!brand.uuid) {
      const response = yield call(
        getDataFromApi,
        {},
        buildQApiUrl(`/glossary/${brand.uuid}`),
        'GET'
      )
      yield put(actions.getSectionExplanationsSuccess(response))
    } else {
      throw new Error('Glossary Fetch Request Error - No Brand')
    }
  } catch (err) {
    console.error('err', err)
    yield put(actions.getSectionExplanationsFailure(err))
  }
}

export default [
  takeEvery(types.GET_SECTION_EXPLANATIONS_REQUEST, getSectionExplanations),
]
