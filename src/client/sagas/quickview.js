import { takeLatest, call, put } from "redux-saga/effects"
import axios from 'axios'

import { types, actions } from "Reducers/quickview"

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'
import quickviewPlatdormSelectedData from 'Api/mocks/quickviewPlatformSelectedMock.json'

function getQuickviewItemsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => quickviewItemsData)
}

function getQuickviewPlatformSelectedApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/')
  .then(res => quickviewPlatdormSelectedData)
}

function* getQuickviewItemsSaga() {
  try {
    const payload = yield call(getQuickviewItemsApi)
    yield put(actions.getQuickviewItemsSuccess(payload))
  } catch (error) {
    yield put(actions.getQuickviewItemsFailure({ error }))
  }
}
function* getQuickviewSelectedPlatformSaga(platform) {
  try {
		const payload = yield call(getQuickviewPlatformSelectedApi, { platform })
    yield put(actions.getQuickviewPlatformSelectedSuccess({
			platformsValues: payload[platform.payload]
		}))
  } catch (error) {
    yield put(actions.getQuickviewPlatformSelectedFailure({ error }))
  }
}

export default [
  takeLatest(types.GET_QUICKVIEW_ITEMS_REQUEST, getQuickviewItemsSaga),
  takeLatest(
    types.GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST,
    getQuickviewSelectedPlatformSaga
  )
]
