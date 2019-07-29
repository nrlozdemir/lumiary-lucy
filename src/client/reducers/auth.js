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

  GET_PROFILE_REQUEST: 'AUTH/GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS: 'AUTH/GET_PROFILE_SUCCESS',
  GET_PROFILE_ERROR: 'AUTH/GET_PROFILE_ERROR',

  UPDATE_PASSWORD_REQUEST: 'AUTH/UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_SUCCESS: 'AUTH/UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_ERROR: 'AUTH/UPDATE_PASSWORD_ERROR',

  FORGOT_PASSWORD_REQUEST: 'AUTH/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_SUCCESS: 'AUTH/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_ERROR: 'AUTH/FORGOT_PASSWORD_ERROR',

  COMPETITORS_REQUEST: 'AUTH/COMPETITORS_REQUEST',
  COMPETITORS_SUCCESS: 'AUTH/COMPETITORS_SUCCESS',
  COMPETITORS_ERROR: 'AUTH/COMPETITORS_ERROR',

  CONNECT_OAUTH_REQUEST: 'AUTH/CONNECT_OAUTH_REQUEST',
  CONNECT_OAUTH_SUCCESS: 'AUTH/CONNECT_OAUTH_SUCCESS',
  CONNECT_OAUTH_ERROR: 'AUTH/CONNECT_OAUTH_ERROR',
}

export const actions = {
  loginRequest: ({ email, password }) => ({
    type: types.LOGIN_REQUEST,
    email,
    password,
  }),
  logoutRequest: () => ({ type: types.LOGOUT_REQUEST }),
  getProfileRequest: ({ userId, token }) => ({
    type: types.GET_PROFILE_REQUEST,
    userId,
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
}

export const initialState = fromJS({
  message: null,
  // error: null,

  requesting: false,
  successful: false,
  loginError: null,
  loggedIn: false,

  user: (typeof window === 'object'
    ? JSON.parse(window.localStorage.getItem('user'))
    : null) || {
    id: null,
    token: false,
    refresh: false,
    refreshing: false,
    expiry: false,
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
  competitors: {
    data: [],
    message: null,
    success: null,
    loading: null,
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
    case types.LOGIN_REQUEST:
      return state
        .set('requesting', fromJS(true))
        .set('loggedIn', fromJS(false))
        .set('loginError', fromJS(null))
        .set('message', fromJS(null))

    case types.LOGIN_SUCCESS:
      return state
        .set('requesting', fromJS(false))
        .set('loggedIn', fromJS(true))
        .set('message', fromJS(payload.message))
        .setIn(['user', 'id'], fromJS(payload.id))
        .setIn(['user', 'token'], fromJS(payload.token))

    case types.LOGIN_ERROR:
      return state
        .set('requesting', fromJS(false))
        .set('loggedIn', fromJS(false))
        .set('message', fromJS(payload.message))

    case types.LOGOUT_REQUEST:
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

    case types.GET_PROFILE_REQUEST:
    case types.GET_PROFILE_SUCCESS:
      return state.setIn(['profile'], fromJS(payload))

    case types.GET_PROFILE_ERROR:
      return state.set('message', fromJS(payload))

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

    case types.COMPETITORS_REQUEST:
      return state
        .setIn(['competitors', 'loading'], fromJS(true))
        .setIn(['competitors', 'password'], fromJS(action.password))

    case types.COMPETITORS_SUCCESS:
      return state
        .setIn(['competitors', 'loading'], fromJS(false))
        .setIn(['competitors', 'success'], fromJS(true))
        .setIn(['competitors', 'message'], fromJS(payload.message))
        .setIn(['competitors', 'data'], fromJS(payload.data))

    case types.COMPETITORS_ERROR:
      return state
        .setIn(['competitors', 'loading'], fromJS(false))
        .setIn(['competitors', 'success'], fromJS(false))
        .setIn(['competitors', 'message'], fromJS(payload.message))

    case types.CONNECT_OAUTH_REQUEST:
      return state.setIn(['OAuth', 'loading'], fromJS(true))

    case types.CONNECT_OAUTH_SUCCESS:
      return state
        .setIn(['OAuth', 'loading'], fromJS(false))
        .setIn(['OAuth', 'success'], fromJS(true))
        .setIn(['OAuth', 'message'], fromJS(payload.message))
        .setIn(
          ['OAuth', 'connects', payload.response.name, 'connected'],
          fromJS(payload.response)
        )

    case types.CONNECT_OAUTH_ERROR:
      return state
        .setIn(['OAuth', 'loading'], fromJS(false))
        .setIn(['OAuth', 'success'], fromJS(false))
        .setIn(['OAuth', 'message'], fromJS(payload.message))

    case types.LOGIN_SSO_REQUEST:
      return state
        .set('requesting', fromJS(true))
        .set('loggedIn', fromJS(false))
        .set('loginError', fromJS(null))
        .set('message', fromJS(null))
        .set('profile', fromJS(null))

    case types.LOGIN_SSO_SUCCESS: {
      const { token, refresh, profile } = action.payload
      const expiry = parseInt(jwtDecode(token).exp + '000')

      return state
        .setIn(['profile'], fromJS(getProfileObjectWithBrand(profile)))
        .setIn(['user', 'token'], fromJS(token))
        .setIn(['user', 'refresh'], fromJS(refresh))
        .setIn(['user', 'expiry'], fromJS(expiry))
        .set('requesting', fromJS(false))
        .set('successful', fromJS(true))
        .set('loggedIn', fromJS(true))
        .set('refreshing', fromJS(false))
        .set('loginError', fromJS(null))
    }
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

const selectCompetitors = (state) => state.auth.get('competitors')

export const makeSelectCompetitors = () =>
  createSelector(
    selectCompetitors,
    (substate) => substate.toJS()
  )

const selectOAuth = (state) => state.auth.get('OAuth')

export const makeSelectOAuth = () =>
  createSelector(
    selectOAuth,
    (substate) => substate.toJS()
  )

export default reducer
