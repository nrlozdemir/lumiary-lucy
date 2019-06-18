import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios'

import { types, actions } from 'Reducers/quickview'

//mocks
import quickviewItemsData from 'Api/mocks/quickviewItemsMock.json'

function getQuickviewItemsApi() {
  //this will use ajax function in utils/api when real data is provided
  return axios.get('/').then((res) => quickviewItemsData)
}

function* getQuickviewItemsSaga({ payload }) {
  try {
    const { platform, data } = payload

    console.log('get quickview', data, platform)

    const response = yield call(getQuickviewItemsApi)

    yield put({
      type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
      payload: {
        platformsValues: response[platform],
      },
    })
  } catch (error) {
    console.log(error)
    yield put({
      type: types.GET_QUICKVIEW_ITEMS_FAILURE,
      error,
    })
  }
}

export default [
  takeLatest(types.GET_QUICKVIEW_ITEMS_REQUEST, getQuickviewItemsSaga),
]
