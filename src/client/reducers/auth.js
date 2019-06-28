import { createSelector } from 'reselect'

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_ERROR: 'AUTH/LOGIN_ERROR',
}

export const actions = {
  loginRequest: ({ email, password }) => ({
    type: types.LOGIN_REQUEST,
    email,
    password,
  }),
}

export const initialState = {
  // messages: [],
  // errors: [],
  // token: false,
  // refresh: false,
  // refreshing: false,
  // expiry: false,
  requesting: false,
  successful: false,
  loginError: null,
  loggedIn: false,
  profile: {
    brand: {
      name: 'bleacherreport',
      uuid: 'd65aa957-d094-4cf3-8d37-dafe50e752ea',
      competitors: [
        {
          name: 'barstoolsports',
          uuid: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
        },
        {
          name: 'espn',
          uuid: '40002bf1-c2d3-41cb-8d85-77f5533d7b45',
        },
        {
          name: 'player\'s tribune',
          uuid: '7a5d6636-a49a-41ab-9d28-a47933fa5f04',
        }
      ],
    },
  },
}

const reducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        requesting: true,
        successful: false,
        loginError: null,
      }
    case types.LOGIN_SUCCESS:
      const { token, refresh, profile } = action.payload
      // const expiry = parseInt(jwtDecode(token).exp + '000')

      return {
        ...state,
        profile,
        //token: token,
        //refresh: refresh,
        //expiry: expiry,
        requesting: false,
        successful: true,
        loggedIn: true,
        refreshing: false,
        loginError: null,
      }
  }

  return state
}

export const selectAuthDomain = (state) => state.auth

export const selectAuthProfile = (state) => state.auth.profile

export const makeSelectAuthProfile = () =>
  createSelector(
    selectAuthProfile,
    (substate) => substate
  )

export default reducer
