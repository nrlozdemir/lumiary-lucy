import qs from 'qs'
import { browserHistory } from 'react-router'
import { types, makeSelectAuthProfile } from 'Reducers/auth'
import { delay } from 'redux-saga'
import {
  call,
  fork,
  take,
  put,
  all,
  cancel,
  cancelled,
  takeEvery,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { ajax } from 'Utils/api'

export function* authorize({ email, password }) {
  try {
    const payload = {}

    yield put({ type: types.LOGIN_SUCCESS, payload })
  } catch (e) {
    console.log(e)
    yield put({ type: types.LOGIN_ERROR, payload: e.message })
  }
}

export default [takeLatest(types.LOGIN_REQUEST, authorize)]
