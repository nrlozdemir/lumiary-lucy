import expect from 'expect'
import { types, actions, reducer, initialState } from 'Reducers/app'

describe('App Reducer', () => {
  describe('Actions', () => {
    it('should create an action to check if app isMobile', () => {
      const payload = {}
      const expectedAction = {
        type: types.IS_MOBILE,
        payload,
      }
      expect(actions.isMobile(payload)).toEqual(expectedAction)
    })
    it('should create an action to request config', () => {
      const payload = {}
      const expectedAction = {
        type: types.REQUEST_CONFIG,
        payload,
      }
      expect(actions.requestConfig(payload)).toEqual(expectedAction)
    })
    it('should create an action to request position', () => {
      const expectedAction = {
        type: types.REQUEST_POSITION,
      }
      expect(actions.requestPosition()).toEqual(expectedAction)
    })
    it('should create an action to receive position', () => {
      const payload = {}
      const expectedAction = {
        type: types.RECEIVE_POSITION,
        payload,
      }
      expect(actions.receivePosition(payload)).toEqual(expectedAction)
    })
    it('should create an action to set breakpoints', () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_BREAKPOINTS,
        payload,
      }
      expect(actions.setBreakpoints(payload)).toEqual(expectedAction)
    })
    it('should create an action to set current url', () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_CURRENT_URL,
        payload,
      }
      expect(actions.setCurrentUrl(payload)).toEqual(expectedAction)
    })
    it('should create an action to get glossary', () => {
      const payload = {}
      const expectedAction = {
        type: types.GET_SECTION_EXPLANATIONS_REQUEST,
        payload,
      }
      expect(actions.getSectionExplanationsRequest(payload)).toEqual(
        expectedAction
      )
    })
    it('should create an action receive glossary', () => {
      const payload = {}
      const expectedAction = {
        type: types.GET_SECTION_EXPLANATIONS_SUCCESS,
        payload,
      }
      expect(actions.getSectionExplanationsSuccess(payload)).toEqual(
        expectedAction
      )
    })
    it('should create an action to handle glossary request failure', () => {
      const error = {}
      const expectedAction = {
        type: types.GET_SECTION_EXPLANATIONS_FAILURE,
        error,
      }
      expect(actions.getSectionExplanationsFailure(error)).toEqual(
        expectedAction
      )
    })
  })

  describe('Reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    it('should handle IS_MOBILE', () => {
      const payload = false
      const action = {
        type: types.IS_MOBILE,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        isMobile: false,
      })
    })
    it('should handle RECEIVE_CONFIG', () => {
      const payload = { data: 'hahaha' }
      const action = {
        type: types.RECEIVE_CONFIG,
        payload: { config: payload },
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        config: payload,
      })
    })
    it('should handle RECEIVE_POSITION', () => {
      const payload = { lat: 1, lng: 2 }
      const action = {
        type: types.RECEIVE_POSITION,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        position: {
          latitude: 1,
          longitude: 2,
          success: true,
        },
      })
    })
    it('should handle RECEIVE_ADDRESS', () => {
      const payload = { results: [{ formatted_address: 'narnia' }] }
      const action = {
        type: types.RECEIVE_ADDRESS,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        location: {
          success: true,
          location: 'narnia',
        },
      })
    })
    it('should handle SET_BREAKPOINTS', () => {
      const payload = { data: 'hi' }
      const action = {
        type: types.SET_BREAKPOINTS,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        breakpoints: payload,
      })
    })
    it('should handle SET_CURRENT_URL', () => {
      const payload = 'blackstar'
      const action = {
        type: types.SET_CURRENT_URL,
        payload,
      }
      const history = [...initialState.locationHistory]
      history.unshift(payload)

      if (history.length > 5) {
        history.pop()
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        locationCurrent: payload,
        locationHistory: history,
      })
    })
    it('should handle GET_SECTION_EXPLANATIONS_REQUEST', () => {
      const payload = {}
      const action = {
        type: types.GET_SECTION_EXPLANATIONS_REQUEST,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        sections: {
          ...initialState.sections,
          loading: true,
        },
      })
    })
    it('should handle GET_SECTION_EXPLANATIONS_SUCCESS', () => {
      const payload = { data: 'hi' }
      const action = {
        type: types.GET_SECTION_EXPLANATIONS_SUCCESS,
        payload,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        sections: {
          ...initialState.sections,
          loading: false,
          data: payload,
        },
      })
    })
    it('should handle GET_SECTION_EXPLANATIONS_FAILURE', () => {
      const error = { error: 'error'}
      const action = {
        type: types.GET_SECTION_EXPLANATIONS_FAILURE,
        payload: error,
      }
      expect(reducer(undefined, action)).toEqual({
        ...initialState,
        sections: {
          ...initialState.sections,
          loading: false,
          error,
        },
      })
    })
  })
})
