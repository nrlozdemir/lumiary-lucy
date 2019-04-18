import { takeLatest, call, put } from "redux-saga/effects"
import axios from 'axios'

import { types, actions } from "Reducers/quickview"

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'

function getQuickviewItemsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => quickviewItemsData)
}

function* getQuickviewItemsSaga(platform) {
  try {
    const payload = yield call(getQuickviewItemsApi, { platform })
    yield put(actions.getQuickviewItemsSuccess({
      platformsValues: payload[platform.payload]
    }))
  } catch (error) {
    yield put(actions.getQuickviewItemsFailure({ error }))
  }
}

export default [
  takeLatest(
    types.GET_QUICKVIEW_ITEMS_REQUEST,
    getQuickviewItemsSaga
  )
]
