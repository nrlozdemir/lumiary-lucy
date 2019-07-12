import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  GET_SECTION_EXPLANATIONS_REQUEST: 'Module/SECTION_EXPLANATIONS_REQUEST',
  GET_SECTION_EXPLANATIONS_SUCCESS: 'Module/SECTION_EXPLANATIONS_SUCCESS',
  GET_SECTION_EXPLANATIONS_FAILURE: 'Module/SECTION_EXPLANATIONS_FAILURE',
}
export const actions = {
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

export const initialState = fromJS({
  sections: {},
})

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_SECTION_EXPLANATIONS_REQUEST:
      return state.setIn(['sections', payload.key, 'loading'], fromJS(true))

    case types.GET_SECTION_EXPLANATIONS_SUCCESS:
      return state
        .setIn(['sections', payload.key, 'data'], fromJS(payload.response))
        .setIn(['sections', payload.key, 'loading'], fromJS(false))

    case types.GET_SECTION_EXPLANATIONS_FAILURE:
      return state
        .setIn(['sections', payload.key, 'error'], fromJS(payload.err))
        .setIn(['sections', payload.key, 'loading'], fromJS(false))
    default:
      return state
  }
}

export const globalState = (state) => state.Global

export const makeSelectGlobal = () =>
  createSelector(
    globalState,
    (substate) => substate.toJS()
  )

export default globalReducer
