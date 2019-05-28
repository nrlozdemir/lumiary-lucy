import qs from 'qs'
import { types } from 'Reducers/auth'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
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
