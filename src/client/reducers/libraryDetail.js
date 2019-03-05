import { fromJS } from "immutable";
import { createSelector } from 'reselect';

export const types = {
  GET_LIBRARY_DETAIL_REQUEST: "LibraryDetail/GET_LIBRARY_DETAIL_REQUEST",
  GET_LIBRARY_DETAIL_SUCCESS: "LibraryDetail/GET_LIBRARY_DETAIL_SUCCESS",
  GET_LIBRARY_DETAIL_FAILURE: "LibraryDetail/GET_LIBRARY_DETAIL_FAILURE",
  GET_BAR_CHART_REQUEST: "LibraryDetail/GET_BAR_CHART_REQUEST",
  GET_BAR_CHART_SUCCESS: "LibraryDetail/GET_BAR_CHART_SUCCESS",
  GET_BAR_CHART_FAILURE: "LibraryDetail/GET_BAR_CHART_FAILURE",
  GET_DOUGHNUT_CHART_REQUEST: "LibraryDetail/GET_DOUGHNUT_CHART_REQUEST",
  GET_DOUGHNUT_CHART_SUCCESS: "LibraryDetail/GET_DOUGHNUT_CHART_SUCCESS",
  GET_DOUGHNUT_CHART_FAILURE: "LibraryDetail/GET_DOUGHNUT_CHART_FAILURE",
  GET_COLOR_TEMP_REQUEST: "LibraryDetail/GET_COLOR_TEMP_REQUEST",
  GET_COLOR_TEMP_SUCCESS: "LibraryDetail/GET_COLOR_TEMP_SUCCESS",
  GET_COLOR_TEMP_FAILURE: "LibraryDetail/GET_COLOR_TEMP_FAILURE",
  GET_SHOT_BY_SHOT_REQUEST: "LibraryDetail/GET_SHOT_BY_SHOT_REQUEST",
  GET_SHOT_BY_SHOT_SUCCESS: "LibraryDetail/GET_SHOT_BY_SHOT_SUCCESS",
  GET_SHOT_BY_SHOT_FAILURE: "LibraryDetail/GET_SHOT_BY_SHOT_FAILURE",
};
export const actions = {
  getLibraryDetailRequest: payload => ({
    type: types.GET_LIBRARY_DETAIL_REQUEST,
    payload
  }),
  getLibraryDetailSuccess: payload => ({
    type: types.GET_LIBRARY_DETAIL_SUCCESS,
    payload
  }),
  getLibraryDetailFailure: error => ({
    type: types.GET_LIBRARY_DETAIL_FAILURE,
    error
  }),
  getBarChartRequest: payload => ({
    type: types.GET_BAR_CHART_REQUEST,
    payload
  }),
  getBarChartSuccess: payload => ({
    type: types.GET_BAR_CHART_SUCCESS,
    payload
  }),
  getBarChartFailure: error => ({
    type: types.GET_BAR_CHART_FAILURE,
    error
  }),
  getDoughnutChartRequest: payload => ({
    type: types.GET_DOUGHNUT_CHART_REQUEST,
    payload
  }),
  getDoughnutChartSuccess: payload => ({
    type: types.GET_DOUGHNUT_CHART_SUCCESS,
    payload
  }),
  getDoughnutChartFailure: error => ({
    type: types.GET_DOUGHNUT_CHART_FAILURE,
    error
  }),
  getColorTempRequest: payload => ({
    type: types.GET_COLOR_TEMP_REQUEST,
    payload
  }),
  getColorTempSuccess: payload => ({
    type: types.GET_COLOR_TEMP_SUCCESS,
    payload
  }),
  getColorTempFailure: payload => ({
    type: types.GET_COLOR_TEMP_FAILURE,
    payload
  }),
  getShotByShotRequest: payload => ({
    type: types.GET_SHOT_BY_SHOT_REQUEST,
    payload
  }),
  getShotByShotSuccess: payload => ({
    type: types.GET_SHOT_BY_SHOT_SUCCESS,
    payload
  }),
  getShotByShotFailure: payload => ({
    type: types.GET_SHOT_BY_SHOT_FAILURE,
    payload
  })
};
export const initialState = fromJS({
  libraryDetail: null,
  barChartData: null,
  doughnutLineChartData: null,
  colorTempData: null,
  shotByShotData: null,
  error: false,
  loading: false
});

const libraryDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIBRARY_DETAIL_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_LIBRARY_DETAIL_SUCCESS:
      return state
        .set("libraryDetail", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_LIBRARY_DETAIL_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.GET_BAR_CHART_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_BAR_CHART_SUCCESS:
      return state
        .set("barChartData", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_BAR_CHART_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));      

    case types.GET_DOUGHNUT_CHART_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_DOUGHNUT_CHART_SUCCESS:
      return state
        .set("doughnutLineChartData", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_DOUGHNUT_CHART_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));      

    case types.GET_COLOR_TEMP_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_COLOR_TEMP_SUCCESS:
      return state
        .set("colorTempData", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_COLOR_TEMP_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));      

    case types.GET_SHOT_BY_SHOT_REQUEST:
      return state.set("loading", fromJS(true));
    case types.GET_SHOT_BY_SHOT_SUCCESS:
      return state
        .set("shotByShotData", fromJS(action.payload))
        .set("loading", fromJS(false));
    case types.GET_SHOT_BY_SHOT_FAILURE:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));      

    default:
      return state;
  }
};

export const selectLibraryDetailDomain = state => state.LibraryDetail;

export const makeSelectLibraryDetail = () =>
  createSelector(selectLibraryDetailDomain, substate => substate.toJS());

export default libraryDetailReducer;
