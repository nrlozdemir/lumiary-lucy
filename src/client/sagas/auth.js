import qs from 'qs'
import { types, makeSelectAuthUser, makeSelectAuthProfile } from 'Reducers/auth'
import { actions } from 'Reducers/app'

import {
  call,
  put,
  takeLatest,
  all,
  select,
  fork,
  take,
  cancel,
} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { getProfileObjectWithBrand } from 'Utils'
import { ajax, buildQApiUrl, getDataFromApi, buildApiUrl } from 'Utils/api'
import oAuthHelper from 'Utils/oAuthHelper'
import authMockData from 'Api/mocks/authMock.json'

const VALIDATE_SSO = '/auth/sso/validate'
const LOGIN_URL = '/auth/login'
const LOGOUT_URL = '/auth/logout'
const TOKEN_URL = '/auth/token'
const TOKEN_LOGIN_URL = '/auth/forgot-password/token'
const VALIDATE_EMAIL_URL = '/auth/validate'

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

function logoutApi(refresh) {
  return ajax({
    url: buildQApiUrl(LOGOUT_URL),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: qs.stringify({ refresh }),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

function* logoutFlow({ refresh }) {
  try {
    yield call(logoutApi, refresh)
  } catch (err) {
    console.log(err)
    console.log(err.message)
  }
  yield put({ type: types.LOGOUT_SUCCESS, message: 'logout' })
}

function tokenApi(refresh) {
  return ajax({
    url: buildQApiUrl(TOKEN_URL),
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: qs.stringify({ refresh }),
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

export function* tokenFlow(refresh) {
  try {
    while (true) {
      const { expiry: userExpiry, refresh } = yield select(makeSelectAuthUser())
      let expiry = userExpiry - parseInt(Date.now())

      if (expiry <= 0) {
        expiry = 1
      }

      yield call(delay, expiry)

      yield put({ type: types.TOKEN_REFRESHING })

      const response = yield call(ajax, {
        url: buildQApiUrl(TOKEN_URL),
        params: { refresh },
      })

      if (
        response.status !== 200 ||
        !response.data.token ||
        !response.data.refresh ||
        !response.data.profile
      ) {
        yield put({ type: types.LOGOUT_REQUEST })
      } else {
        yield put({ type: types.TOKEN_REFRESHED, payload: response.data })
      }
    }
  } finally {
    yield put({ type: types.LOGOUT_REQUEST })
  }
}

export function* tokenAuthorize({ token }) {
  try {
    const payload = yield call(
      ({ url, ...rest }) => {
        return ajax({
          url: url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: qs.stringify(rest),
        }).then((response) => {
          if (response.error) {
            throw response.error
          }
          return response.data
        })
      },
      {
        url: buildQApiUrl(TOKEN_LOGIN_URL),
        token,
      }
    )

    yield put({ type: types.LOGIN_SUCCESS, payload })
  } catch (e) {
    console.log(e)
    yield put({ type: types.LOGIN_ERROR, payload: payload.message })
  }
}

export function* loggedInFlow() {
  try {
    const { token, refresh } = yield select(makeSelectAuthUser())
    const tokenTask = yield fork(tokenFlow, refresh)
    yield take(types.LOGOUT_REQUEST)
    yield call(logoutFlow, yield select(makeSelectAuthUser()))
    yield cancel(tokenTask)
  } catch (e) {
    console.log(e)
  }
}

function* additionalLoggedInFeatures(payload) {
  if (
    !!payload.profile &&
    (!!payload.profile.brand || !!payload.profile.buyer)
  ) {
    yield fork(loggedInFlow)

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
      yield put(actions.getSectionExplanationsFailure('No Brand Available'))
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
    const { brand } = yield select(makeSelectAuthProfile())
    const { uuid:brandUuid } = brand

    if(!brandUuid) {
      throw new Error('Could not determine brand uuids')
    }

    const oAuth = new oAuthHelper({
      platform: payload,
      brandUuid,
    })

    yield oAuth.fetchLibrary()

    const token = yield oAuth.getAuthToken()
    const response = yield oAuth.sendAuthData({ token })
    const { success } = response

    if(success) {
      yield oAuth.sendOauthValidated()
    }

    if (success) {
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

export function* initiateTokenRefresh() {
  try {
    const { loggedIn } = yield select(makeSelectAuthUser())
    if (loggedIn) {
      yield call(loggedInFlow)
    }
  } catch (e) {
    console.log(e)
  }
}

export default [
  fork(initiateTokenRefresh),
  takeLatest(types.LOGIN_REQUEST, authorize),
  takeLatest(types.LOGIN_SSO_REQUEST, validateSso),
  takeLatest(types.UPDATE_PASSWORD_REQUEST, updatePassword),
  takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword),
  takeLatest(types.CONNECT_OAUTH_REQUEST, connectOAuth),
]
