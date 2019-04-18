/*
 *
 * Quickview reducer
 *
 */

import { fromJS } from "immutable"
import { createSelector } from 'reselect'

export const types = {
  GET_QUICKVIEW_ITEMS_REQUEST: "Quickview/GET_QUICKVIEW_ITEMS_REQUEST",
  GET_QUICKVIEW_ITEMS_SUCCESS: "Quickview/GET_QUICKVIEW_ITEMS_SUCCESS",
  GET_QUICKVIEW_ITEMS_FAILURE: "Quickview/GET_QUICKVIEW_ITEMS_FAILURE"
}

export const actions = {
  getQuickviewItemsRequest: payload => ({
    type: types.GET_QUICKVIEW_ITEMS_REQUEST,
    payload
  }),
  getQuickviewItemsSuccess: payload => ({
    type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
    payload
  }),
  getQuickviewItemsFailure: error => ({
    type: types.GET_QUICKVIEW_ITEMS_FAILURE,
    error
  })
}

export const initialState = fromJS({
  quickviewItems: [],
  selectedPlatform: {
    id: null,
    platformsValues: []
  },
  error: false,
  loading: false
})

const quickviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUICKVIEW_ITEMS_REQUEST:
      return state.set("loading", fromJS(true))
    case types.GET_QUICKVIEW_ITEMS_SUCCESS:
      return state
        .setIn(["selectedPlatform", "platform"], fromJS(action.payload.platform))
        .setIn(
          ["selectedPlatform", "platformsValues"],
          fromJS(action.payload.platformsValues)
        )
        .set("loading", fromJS(false))
    case types.GET_QUICKVIEW_ITEMS_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false))
    default:
      return state
  }
}

const selectQuickviewDomain = state => state.Quickview

export const makeSelectQuickview = () =>
createSelector(selectQuickviewDomain, substate => substate.toJS())

export default quickviewReducer
