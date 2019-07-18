import qs from 'qs'
import { types } from 'Reducers/auth'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { ajax, buildQApiUrl } from 'Utils/api'
import { push } from 'connected-react-router'

const VALIDATE_SSO = '/auth/sso/validate'

const VALID_LOGIN = {
  email: 'lumiary@quickframe.com',
  password: 'lucy',
}

function loginApi({ email, password }) {
  return email === VALID_LOGIN.email && password === VALID_LOGIN.password
    ? {
        status: 'success',
        message: 'logged-in',
        sso: 24234223,
      }
    : {
        status: 'error',
        message: 'Invalid Email/Password Combination',
        sso: null,
      }
}

export function* authorize({ email, password }) {
  try {
    const payload = yield call(loginApi, { email, password })

    if (payload.status === 'success') {
      yield put({ type: types.LOGIN_SUCCESS, payload })
      push(`/sso?sso=${payload.sso}`)
    } else {
      yield put({ type: types.LOGIN_ERROR, payload: payload })
    }
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
