import qs from 'qs'
import { types } from 'Reducers/auth'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { ajax, buildQApiUrl } from 'Utils/api'
import { push } from 'connected-react-router'

const VALIDATE_SSO = '/auth/sso/validate'

export function* authorize({ email, password }) {
  console.log(email, password)
  try {
    const payload = {}

    yield put({ type: types.LOGIN_SUCCESS, payload })
    push('/account/sso')
  } catch (e) {
    console.log(e)
    yield put({ type: types.LOGIN_ERROR, payload: e.message })
  }
}

export function* validateSso({ payload }) {
  try {
    const response = yield call(ajax, {
      method: 'post',
      url: buildQApiUrl(VALIDATE_SSO),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: qs.stringify({ sso: payload }),
    })
    if (response.data.token) {
      yield put({ type: types.LOGIN_SSO_SUCCESS, payload: response.data })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.LOGIN_SSO_ERROR, payload: e.message })
  }
}

export default [
  takeLatest(types.LOGIN_REQUEST, authorize),
  takeLatest(types.LOGIN_SSO_REQUEST, validateSso),
]
