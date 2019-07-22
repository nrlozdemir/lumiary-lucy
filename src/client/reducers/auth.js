import jwtDecode from 'jwt-decode'
import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { getBrandAndCompetitorsFromProfileObject } from 'Utils'

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_ERROR: 'AUTH/LOGIN_ERROR',

  LOGIN_SSO_REQUEST: 'AUTH/LOGIN_SSO:REQUEST',
  LOGIN_SSO_SUCCESS: 'AUTH/LOGIN_SSO:SUCCESS',
  LOGIN_SSO_ERROR: 'AUTH/LOGIN_SSO:ERROR',

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
  token: false,
  refresh: false,
  refreshing: false,
  expiry: false,

  message: null,
  // error: null,

  requesting: false,
  successful: false,
  loginError: null,
  loggedIn: false,

  profile: {
    brand: {
      name: 'Bleacher Report',
      uuid: 'd65aa957-d094-4cf3-8d37-dafe50e752ea',
      avatar:
        'https://s3.amazonaws.com/quickframe-media/group/logo/bleacher-report-logo.png',
      competitors: [
        {
          name: 'Barstool Sports',
          uuid: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
        },
        {
          name: 'ESPN',
          uuid: '40002bf1-c2d3-41cb-8d85-77f5533d7b45',
        },
        {
          name: "Players' Tribune",
          uuid: '7a5d6636-a49a-41ab-9d28-a47933fa5f04',
        },
      ],
    },
  },
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

    case types.LOGIN_ERROR:
      return state
        .set('requesting', fromJS(false))
        .set('loggedIn', fromJS(false))
        .set('message', fromJS(payload.message))

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

    case types.LOGIN_SSO_SUCCESS: {
      const { token, refresh, profile } = action.payload
      const expiry = parseInt(jwtDecode(token).exp + '000')

      return state
        .setIn(
          ['profile', 'brand'],
          fromJS(getBrandAndCompetitorsFromProfileObject(profile))
        )
        .set('token', fromJS(token))
        .set('refresh', fromJS(refresh))
        .set('expiry', fromJS(expiry))
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
const selectAuthProfile = (state) => state.auth.get('profile')

export const makeSelectAuthProfile = () =>
  createSelector(
    selectAuthProfile,
    (substate) => substate.toJS()
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
