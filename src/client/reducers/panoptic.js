/*
*
* Panoptic reducer
*
*/

import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const types = {
  GET_DATA: "Panoptic/GET_DATA",
  GET_DATA_SUCCESS: "Panoptic/GET_DATA_SUCCESS",
  GET_DATA_ERROR: "Panoptic/GET_DATA_ERROR",

  GET_AUDIENCE_DATA: "Panoptic/GET_AUDIENCE_DATA",
  GET_AUDIENCE_DATA_SUCCESS: "Panoptic/GET_AUDIENCE_DATA_SUCCESS",
  GET_AUDIENCE_DATA_ERROR: "Panoptic/GET_AUDIENCE_DATA_ERROR",
};

export const actions = {
  getData: () => ({ type: types.GET_DATA }),
  getDataSuccess: payload => ({ type: types.GET_DATA_SUCCESS, payload }),
  getDataError: error => ({ type: types.GET_DATA_ERROR, error }),

  getAudienceData: () => ({ type: types.GET_AUDIENCE_DATA }),
  getAudienceDataSuccess: payload => ({ type: types.GET_AUDIENCE_DATA_SUCCESS, payload }),
  getAudienceDataError: error => ({ type: types.GET_AUDIENCE_DATA_ERROR, error }),
};

export const initialState = fromJS({
  data: {},
  audienceData: null,
  loading: false,
  error: false,
});

const panopticReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return state.set("loading", fromJS(true));

    case types.GET_DATA_SUCCESS:
      return state
        .set("data", fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.GET_DATA_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.GET_AUDIENCE_DATA:
      return state.set("loading", fromJS(true));

    case types.GET_AUDIENCE_DATA_SUCCESS:
      return state
        .set("audienceData", fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.GET_AUDIENCE_DATA_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    default:
      return state;
  }
};

export const selectPanopticDomain = state => state.Panoptic

export const makeSelectPanoptic = () =>
  createSelector(selectPanopticDomain, substate => substate.toJS());

export default panopticReducer;
