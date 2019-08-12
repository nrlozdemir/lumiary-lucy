import qs from 'qs'
import { types } from 'Reducers/auth'
import { actions } from 'Reducers/app'

import { call, put, takeLatest, all, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import axios from 'axios'
import { getProfileObjectWithBrand } from 'Utils'
import { ajax, buildQApiUrl, getDataFromApi } from 'Utils/api'
import authMockData from 'Api/mocks/authMock.json'

const VALIDATE_SSO = '/auth/sso/validate'
const LOGIN_URL = '/auth/login'

function loginApi(email, password) {
  return ajax({
    url: buildQApiUrl(LOGIN_URL),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: qs.stringify({ email, password }),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

export function* authorize({ email, password }) {
  try {
    const payload = yield call(loginApi, email, password)

    if (!payload.message && !!payload.profile) {
      yield put({ type: types.LOGIN_SUCCESS, payload })
      yield call(additionalLoggedInFeatures, payload)
    } else {
      yield put({ type: types.LOGIN_ERROR, payload: payload.message })
    }
  } catch (e) {
    console.log('Login Error', e)
    const errorMessage =
      e.response && e.response.data && e.response.data.message
        ? e.response.data.message
        : e.message
    yield put({ type: types.LOGIN_ERROR, payload: errorMessage })
  }
}

function* additionalLoggedInFeatures(payload) {
  if (
    !!payload.profile &&
    (!!payload.profile.brand || !!payload.profile.buyer)
  ) {
    try {
      const { brand } = getProfileObjectWithBrand(payload.profile)
      if (!!brand && !!brand.uuid) {
        const response = yield call(
          getDataFromApi,
          {},
          buildQApiUrl(`/glossary/${brand.uuid}`),
          'GET'
        )
        yield put(actions.getSectionExplanationsSuccess(response))
      } else {
        throw new Error('No Brand Available')
      }
    } catch (e) {
      console.log(e)
      yield put(actions.getSectionExplanationsFailure(e))
    }
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
      yield call(additionalLoggedInFeatures, response.data)
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
  takeLatest(types.CONNECT_OAUTH_REQUEST, connectOAuth),
]
