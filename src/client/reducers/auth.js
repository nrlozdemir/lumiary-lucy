import jwtDecode from 'jwt-decode'
import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { getProfileObjectWithBrand } from 'Utils'
import { push } from 'connected-react-router'

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_ERROR: 'AUTH/LOGIN_ERROR',

  LOGIN_SSO_REQUEST: 'AUTH/LOGIN_SSO:REQUEST',
  LOGIN_SSO_SUCCESS: 'AUTH/LOGIN_SSO:SUCCESS',
  LOGIN_SSO_ERROR: 'AUTH/LOGIN_SSO:ERROR',

  LOGOUT_REQUEST: 'AUTH/LOGOUT_REQUEST',
  LOGOUT_ERROR: 'AUTH/LOGOUT_ERROR',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',

  UPDATE_PASSWORD_REQUEST: 'AUTH/UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_SUCCESS: 'AUTH/UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_ERROR: 'AUTH/UPDATE_PASSWORD_ERROR',

  FORGOT_PASSWORD_REQUEST: 'AUTH/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_SUCCESS: 'AUTH/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_ERROR: 'AUTH/FORGOT_PASSWORD_ERROR',

  CONNECT_OAUTH_REQUEST: 'AUTH/CONNECT_OAUTH_REQUEST',
  CONNECT_OAUTH_SUCCESS: 'AUTH/CONNECT_OAUTH_SUCCESS',
  CONNECT_OAUTH_ERROR: 'AUTH/CONNECT_OAUTH_ERROR',

  TOKEN_EXPIRED: 'AUTH/TOKEN_EXPIRED',
  TOKEN_REFRESHED: 'AUTH/TOKEN_REFRESHED',
  TOKEN_REFRESHING: 'AUTH/TOKEN_REFRESHING',

  TOKEN_LOGIN_REQUEST: 'AUTH/TOKEN_LOGIN_REQUEST',

  UPDATE_HAS_ONBOARDED: 'AUTH/UPDATE_HAS_ONBOARDED:REQUEST',
  UPDATE_HAS_ONBOARDED_SUCCESS: 'AUTH/UPDATE_HAS_ONBOARDED:SUCCESS',
  UPDATE_HAS_ONBOARDED_ERROR: 'AUTH/UPDATE_HAS_ONBOARDED:ERROR',

  VERIFY_TWITTER_OAUTH_TOKEN: 'AUTH/VERIFY_TWITTER_OAUTH_TOKEN',
}

export const actions = {
  loginRequest: ({ email, password }) => ({
    type: types.LOGIN_REQUEST,
    email,
    password,
  }),
  logoutRequest: () => ({ type: types.LOGOUT_REQUEST }),
  tokenLoginRequest: ({ email, token }) => ({
    type: types.TOKEN_LOGIN_REQUEST,
    token,
  }),
  loginSsoRequest: (data) => ({
    type: types.LOGIN_SSO_REQUEST,
    payload: data,
  }),
  updatePassword: ({ password, confirmPassword }) => ({
    type: types.UPDATE_PASSWORD_REQUEST,
    payload: {
      password,
      confirmPassword,
    },
  }),
  forgotPasswordRequest: ({ email }) => ({
    type: types.FORGOT_PASSWORD_REQUEST,
    email,
  }),
  getCompetitors: () => ({
    type: types.COMPETITORS_REQUEST,
  }),
  connectOAuthRequest: (payload) => ({
    type: types.CONNECT_OAUTH_REQUEST,
    payload,
  }),
  updateHasOnboarded: (payload) => ({
    type: types.UPDATE_HAS_ONBOARDED,
    payload,
  }),
  verifyTwitterOAuthToken: (payload) => ({
    type: types.VERIFY_TWITTER_OAUTH_TOKEN,
    payload
  })
}

export const initialState = fromJS({
  message: null,
  // error: null,

  requesting: false,
  successful: false,
  loginError: null,

  user: (typeof window === 'object'
    ? JSON.parse(window.localStorage.getItem('user'))
    : null) || {
    token: false,
    refresh: false,
    refreshing: false,
    expiry: false,
    loggedIn: false,
  },
  profile:
    (typeof window === 'object'
      ? JSON.parse(window.localStorage.getItem('profile'))
      : null) || null,
  passwordUpdate: {
    message: null,
    success: null,
    loading: null,
    password: null,
    confirmPassword: null,
  },
  forgotPassword: {
    message: null,
    success: null,
    loading: null,
    password: null,
  },
  OAuth: {
    connects: {
      facebook: {
        name: 'Facebook',
        connected: false,
      },
      instagram: {
        name: 'Instagram',
        connected: false,
      },
      twitter: {
        name: 'Twitter',
        connected: false,
      },
      youtube: {
        name: 'Youtube',
        connected: false,
      },
    },
    message: null,
    loading: null,
    success: null,
  },
})

const reducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case types.TOKEN_LOGIN_REQUEST:
    case types.LOGIN_SSO_REQUEST:
    case types.LOGIN_REQUEST:
      return state
        .set('requesting', fromJS(true))
        .set('loginError', fromJS(null))
        .set('message', fromJS(null))
        .set('profile', fromJS(null))
        .setIn(['user', 'loggedIn'], fromJS(false))

    case types.LOGIN_ERROR:
      return state
        .set('requesting', fromJS(false))
        .set('message', fromJS(payload))
        .setIn(['user', 'loggedIn'], fromJS(false))

    case types.TOKEN_REFRESHING:
      return state.set('refreshing', fromJS(false))

    case types.TOKEN_REFRESHED:
    case types.LOGIN_SUCCESS:
    case types.LOGIN_SSO_SUCCESS: {
      const { token, refresh, profile } = action.payload
      const expiry = parseInt(jwtDecode(token).exp + '000')

      return state
        .setIn(['profile'], fromJS(getProfileObjectWithBrand(profile)))
        .setIn(['user', 'token'], fromJS(token))
        .setIn(['user', 'refresh'], fromJS(refresh))
        .setIn(['user', 'expiry'], fromJS(expiry))
        .setIn(['user', 'loggedIn'], fromJS(true))
        .set('requesting', fromJS(false))
        .set('successful', fromJS(true))
        .set('refreshing', fromJS(false))
        .set('loginError', fromJS(null))
    }

    case types.LOGOUT_SUCCESS:
      push('/account/login')
      return state
        .set(
          'user',
          fromJS({
            id: null,
            token: false,
            refresh: false,
            refreshing: false,
            expiry: false,
          })
        )
        .set('profile', null)
        .set('OAuth', fromJS(initialState.toJS().OAuth))

    case types.UPDATE_PASSWORD_REQUEST:
      return state
        .setIn(['passwordUpdate', 'loading'], fromJS(true))
        .setIn(['passwordUpdate', 'password'], fromJS(action.password))
        .setIn(
          ['passwordUpdate', 'confirmPassword'],
          fromJS(action.confirmPassword)
        )

    case types.UPDATE_PASSWORD_SUCCESS:
      return state
        .setIn(['passwordUpdate', 'loading'], fromJS(false))
        .setIn(['passwordUpdate', 'success'], fromJS(true))
        .setIn(['passwordUpdate', 'message'], fromJS(payload.message))

    case types.UPDATE_PASSWORD_ERROR:
      return state
        .setIn(['passwordUpdate', 'loading'], fromJS(false))
        .setIn(['passwordUpdate', 'success'], fromJS(false))
        .setIn(['passwordUpdate', 'message'], fromJS(payload.message))

    case types.FORGOT_PASSWORD_REQUEST:
      return state
        .setIn(['forgotPassword', 'loading'], fromJS(true))
        .setIn(['forgotPassword', 'password'], fromJS(action.password))

    case types.FORGOT_PASSWORD_SUCCESS:
      return state
        .setIn(['forgotPassword', 'loading'], fromJS(false))
        .setIn(['forgotPassword', 'success'], fromJS(true))
        .setIn(['forgotPassword', 'message'], fromJS(payload.message))

    case types.FORGOT_PASSWORD_ERROR:
      return state
        .setIn(['forgotPassword', 'loading'], fromJS(false))
        .setIn(['forgotPassword', 'success'], fromJS(false))
        .setIn(['forgotPassword', 'message'], fromJS(payload.message))

    case types.CONNECT_OAUTH_REQUEST:
      return state.setIn(['OAuth', 'loading'], fromJS(false))

    case types.CONNECT_OAUTH_SUCCESS:
      return state
        .setIn(['OAuth', 'loading'], fromJS(false))
        .setIn(['OAuth', 'success'], fromJS(true))
        .setIn(['OAuth', 'message'], fromJS(payload.message))
        .setIn(['profile', 'brand', `oauth_${payload.platform}`], fromJS(true))

    case types.CONNECT_OAUTH_ERROR:
      return state
        .setIn(['OAuth', 'loading'], fromJS(false))
        .setIn(['OAuth', 'success'], fromJS(false))
        .setIn(['OAuth', 'message'], fromJS(payload.message))

    case types.UPDATE_HAS_ONBOARDED_SUCCESS:
      return state.setIn(['profile', 'brand', 'has_onboarded'], fromJS(payload))

    case types.UPDATE_HAS_ONBOARDED_ERROR:
      return state.setIn(
        ['profile', 'brand', 'has_onboarded'],
        fromJS(
          state.profile && state.profile.brand
            ? state.profile.brand.has_onboarded
            : false
        )
      )

    default:
      return state
  }
}

export const selectAuthDomain = (state) => state.auth

export const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    (substate) => substate.toJS()
  )

const selectAuthUser = (state) => state.auth.get('user')

export const makeSelectAuthUser = () =>
  createSelector(
    selectAuthUser,
    (substate) => substate.toJS()
  )

const selectAuthProfile = (state) => state.auth.get('profile')

export const makeSelectAuthProfile = () =>
  createSelector(
    selectAuthProfile,
    (substate) => {
      if (substate) {
        return substate.toJS()
      }

      return substate
    }
  )

const selectUpdatePassword = (state) => state.auth.get('passwordUpdate')

export const makeSelectUpdatePassword = () =>
  createSelector(
    selectUpdatePassword,
    (substate) => substate.toJS()
  )

const selectForgotPassword = (state) => state.auth.get('forgotPassword')

export const makeSelectForgotPassword = () =>
  createSelector(
    selectForgotPassword,
    (substate) => substate.toJS()
  )

const selectOAuth = (state) => state.auth.get('OAuth')

export const makeSelectOAuth = () =>
  createSelector(
    selectOAuth,
    (substate) => substate.toJS()
  )

export default reducer
