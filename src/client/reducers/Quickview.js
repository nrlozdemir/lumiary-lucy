/*
 *
 * Quickview reducer
 *
 */

import { fromJS } from "immutable";

export const types = {
  GET_QUICKVIEW_ITEMS_REQUEST: "Quickview/GET_QUICKVIEW_ITEMS_REQUEST",
  GET_QUICKVIEW_ITEMS_SUCCESS: "Quickview/GET_QUICKVIEW_ITEMS_SUCCESS",
  GET_QUICKVIEW_ITEMS_FAILURE: "Quickview/GET_QUICKVIEW_ITEMS_FAILURE",
  GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST:
    "Quickview/GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST",
  GET_QUICKVIEW_PLATFORM_SELECTED_SUCCESS:
    "Quickview/GET_QUICKVIEW_PLATFORM_SELECTED_SUCCESS",
  GET_QUICKVIEW_PLATFORM_SELECTED_FAILURE:
    "Quickview/GET_QUICKVIEW_PLATFORM_SELECTED_FAILURE"
};

export const actions = {
  getQuickviewItemsRequest: () => ({
    type: types.GET_QUICKVIEW_ITEMS_REQUEST
  }),
  getQuickviewItemsSuccess: payload => ({
    type: types.GET_QUICKVIEW_ITEMS_SUCCESS,
    payload
  }),
  getQuickviewItemsFailure: error => ({
    type: types.GET_QUICKVIEW_ITEMS_FAILURE,
    error
  }),
  getQuickviewPlatformSelectedRequest: payload => ({
    type: types.GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST,
    payload
  }),
  getQuickviewPlatformSelectedSuccess: payload => ({
    type: types.GET_QUICKVIEW_PLATFORM_SELECTED_SUCCESS,
    payload
  }),
  getQuickviewPlatformSelectedFailure: error => ({
    type: types.GET_QUICKVIEW_PLATFORM_SELECTED_FAILURE,
    error
  })
};

export const initialState = fromJS({
  quickviewItems: [],
  selectedPlatform: {
    id: null,
    platformsValues: []
  },
  error: false,
  loading: false
});

const quickviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_QUICKVIEW_ITEMS_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_QUICKVIEW_ITEMS_SUCCESS:
      return state
        .set("quickviewItems", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_QUICKVIEW_ITEMS_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.GET_QUICKVIEW_PLATFORM_SELECTED_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_QUICKVIEW_PLATFORM_SELECTED_SUCCESS:
      return state
        .setIn(["selectedPlatform", "id"], fromJS(action.payload.id))
        .setIn(
          ["selectedPlatform", "platformsValues"],
          fromJS(action.payload.platformsValues)
        )
        .set("loading", fromJS(false));
    case types.GET_QUICKVIEW_PLATFORM_SELECTED_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));
    default:
      return state;
  }
};

export default quickviewReducer;
