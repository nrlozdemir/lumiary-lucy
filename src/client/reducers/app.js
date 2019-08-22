import update from 'immutability-helper'
import { createSelector } from 'reselect'

export const types = {
  IS_MOBILE: 'APP/IS_MOBILE',

  REQUEST_ADDRESS: 'APP/REQUEST_ADDRESS',
  RECEIVE_ADDRESS: 'APP/RECEIVE_ADDRESS',
  RECEIVE_ADDRESS_ERR: 'APP/RECEIVE_ADDRESS_ERR',

  REQUEST_CONFIG: 'APP/REQUEST_CONFIG',
  RECEIVE_CONFIG: 'APP/RECEIVE_CONFIG',
  RECEIVE_CONFIG_ERR: 'APP/RECEIVE_CONFIG_ERR',

  REQUEST_POSITION: 'APP/REQUEST_POSITION',
  RECEIVE_POSITION: 'APP/RECEIVE_POSITION',
  RECEIVE_POSITION_ERR: 'APP/RECEIVE_POSITION_ERR',

  GET_SECTION_EXPLANATIONS_REQUEST: 'Module/SECTION_EXPLANATIONS_REQUEST',
  GET_SECTION_EXPLANATIONS_SUCCESS: 'Module/SECTION_EXPLANATIONS_SUCCESS',
  GET_SECTION_EXPLANATIONS_FAILURE: 'Module/SECTION_EXPLANATIONS_FAILURE',

  // SET_LOADING: 'APP/SET_LOADING',

  SET_BREAKPOINTS: 'APP/SET_BREAKPOINTS',
  SET_CURRENT_URL: 'APP/SET_CURRENT_URL',
}

export const actions = {
  isMobile: (data) => ({ type: types.IS_MOBILE, payload: data }),
  requestConfig: (data) => ({ type: types.REQUEST_CONFIG, payload: data }),
  requestPosition: () => ({ type: types.REQUEST_POSITION }),
  receivePosition: (data) => ({ type: types.RECEIVE_POSITION, payload: data }),
  setBreakpoints: (data) => ({ type: types.SET_BREAKPOINTS, payload: data }),
  setCurrentUrl: (data) => ({ type: types.SET_CURRENT_URL, payload: data }),

  getSectionExplanationsRequest: (payload) => ({
    type: types.GET_SECTION_EXPLANATIONS_REQUEST,
    payload,
  }),
  getSectionExplanationsSuccess: (payload) => ({
    type: types.GET_SECTION_EXPLANATIONS_SUCCESS,
    payload,
  }),
  getSectionExplanationsFailure: (error) => ({
    type: types.GET_SECTION_EXPLANATIONS_FAILURE,
    error,
  }),
}

export const initialState = {
  sections: {
    data:
      typeof window === 'object'
        ? JSON.parse(window.localStorage.getItem('sections'))
        : null,
    loading: false,
  },
  config: {},
  breakpoints: null,
  isLoading: false,
  isMobile: false,
  location: {
    success: false,
    location: null,
  },
  locationCurrent: null,
  locationHistory: [],
  metadata: {
    title: 'Lumiary',
    meta: [
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      {
        name: 'description',
        content: 'Quickframe Lumiary',
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: `{ "@context": "http://schema.org" }`,
      },
    ],
  },
  position: {
    success: false,
    latitude: false,
    longitude: false,
  },
}

const reducer = (state = initialState, action) => {
  const { data, message, payload } = action

  switch (action.type) {
    case types.IS_MOBILE:
      return {
        ...state,
        isMobile: action.payload,
      }

    case types.RECEIVE_CONFIG:
      return update(state, {
        config: {
          $merge: payload.config,
        },
      })

    case types.RECEIVE_POSITION:
      const { lat, lng } = payload

      return update(state, {
        position: {
          latitude: {
            $set: lat,
          },
          longitude: {
            $set: lng,
          },
          success: {
            $set: true,
          },
        },
      })

    case types.RECEIVE_POSITION_ERR:
      console.log('RECEIVE_POSITION_ERR: ', action)
      return state

    case types.RECEIVE_ADDRESS:
      const { results } = action.payload

      return update(state, {
        location: {
          success: {
            $set: true,
          },
          location: {
            $set: results[0].formatted_address,
          },
        },
      })

    case types.GET_SECTION_EXPLANATIONS_REQUEST:
      return update(state, {
        sections: {
          loading: {
            $set: true,
          },
        },
      })

    case types.GET_SECTION_EXPLANATIONS_SUCCESS:
      return update(state, {
        sections: {
          loading: {
            $set: false,
          },
          data: {
            $set: action.payload,
          },
        },
      })
    case types.GET_SECTION_EXPLANATIONS_FAILURE:
      return update(state, {
        sections: {
          loading: {
            $set: false,
          },
          error: {
            $set: action.payload,
          },
        },
      })

    // case types.SET_LOADING:
    //   return {
    //    ...state,
    //    isLoading: action.isLoading
    //  }

    case types.SET_BREAKPOINTS:
      return {
        ...state,
        breakpoints: payload,
      }

    case types.SET_CURRENT_URL:
      const history = [...state.locationHistory]

      history.unshift(payload)

      if (history.length > 5) {
        history.pop()
      }

      return {
        ...state,
        locationCurrent: payload,
        locationHistory: history,
      }

    default:
      return state
  }
}

export const getGeoposition = (state) => state.app.position
export const getConfig = (state) => state.app.config

export const getGlobalSection = (state) => state.app.sections
export const makeSelectGlobalSection = () =>
  createSelector(
    getGlobalSection,
    (substate) => substate
  )

export default reducer
