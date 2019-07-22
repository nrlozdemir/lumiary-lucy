import qs from 'qs'
import { types } from 'Reducers/auth'
import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { ajax, buildQApiUrl } from 'Utils/api'
import { push } from 'connected-react-router'

const VALIDATE_SSO = '/auth/sso/validate'

const VALID_LOGIN = {
  email: 'lumiary@quickframe.com',
  password: 'lucylucy',
}

function loginApi({ email, password }) {
  return email === VALID_LOGIN.email && password === VALID_LOGIN.password
    ? {
        status: 'success',
        message: 'logged-in',
        token: 24234223,
      }
    : {
        status: 'error',
        message: 'Invalid Email/Password Combination',
      }
}

export function* authorize({ email, password }) {
  try {
    const payload = yield call(loginApi, { email, password })

    if (payload.status === 'success') {
      console.log('payload', payload)
      yield put({ type: types.LOGIN_SUCCESS, payload })
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

export function* updatePassword({ password, confirmPassword }) {
  return console.log('payload', password, confirmPassword)
  try {
    const response = yield call(ajax, {
      method: 'post',
      url: buildQApiUrl('/auth/update-password'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response) {
      yield put({
        type: types.UPDATE_PASSWORD_SUCCESS,
        payload: { message: 'password update' },
      })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.UPDATE_PASSWORD_ERROR, payload: e.message })
  }
}

export function* forgotPassword({ email }) {
  return console.log('payload', email)
  try {
    const response = yield call(ajax, {
      method: 'post',
      url: buildQApiUrl('/auth/forgot-password'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response) {
      yield put({
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: { message: 'forgot password' },
      })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.FORGOT_PASSWORD_ERROR, payload: e.message })
  }
}

export function* getCompetitors() {
  const data = [
    {
      name: 'Barstool Sports',
      uuid: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
      cover:
        'https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png',
    },
    {
      name: 'ESPN',
      uuid: '40002bf1-c2d3-41cb-8d85-77f5533d7b45',
      cover:
        'https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png',
    },
    {
      name: "Players' Tribune",
      uuid: '7a5d6636-a49a-41ab-9d28-a47933fa5f04',
      cover:
        'https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png',
    },
  ]
  yield put({
    type: types.COMPETITORS_SUCCESS,
    payload: { data },
  })
  console.log('getting competitors', data)
}

export function* connectOAuth({ payload }) {
  try {
    const response = {}

    yield delay(2000)
    if (response) {
      yield put({
        type: types.CONNECT_OAUTH_SUCCESS,
        payload: {
          message: `Connected to ${payload}`,
          response: {
            ...response,
            name: payload,
          },
        },
      })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.CONNECT_OAUTH_ERROR, payload: e.message })
  }
}

export default [
  takeLatest(types.LOGIN_REQUEST, authorize),
  takeLatest(types.LOGIN_SSO_REQUEST, validateSso),
  takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword),
  takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword),
  takeLatest(types.COMPETITORS_REQUEST, getCompetitors),
  takeLatest(types.CONNECT_OAUTH_REQUEST, connectOAuth),
]
