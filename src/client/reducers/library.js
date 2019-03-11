/*
 *
 * Library reducer
 *
 */

import { fromJS } from "immutable";
import { createSelector } from 'reselect';

export const types = {
  LOAD_VIDEOS: "Library/LOAD_VIDEOS",
  LOAD_VIDEOS_SUCCESS: "Library/LOAD_VIDEOS_SUCCESS",
  LOAD_VIDEOS_ERROR: "Library/LOAD_VIDEOS_ERROR",

  CHANGE_FILTER: "Library/CHANGE_FILTER"
};
export const actions = {
  loadVideos: () => ({ type: types.LOAD_VIDEOS }),
  loadVideosSuccess: payload => ({ type: types.LOAD_VIDEOS_SUCCESS, payload }),
  loadVideosError: error => ({ type: types.LOAD_VIDEOS, error }),

  changeFilter: payload => ({ type: types.CHANGE_FILTER, payload })
};

export const initialState = fromJS({
  videos: [],
  filters: {},
  error: false,
  loading: false
});

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VIDEOS:
      return state.set("loading", fromJS(true));

    case types.LOAD_VIDEOS_SUCCESS:
      return state
        .set('videos', fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.LOAD_VIDEOS_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.CHANGE_FILTER:
      return state
        .set('loading', fromJS(true))
        .set('filters', fromJS(action.payload));

    default:
      return state;
  }
};

export const selectLibraryDomain = state => state.Library

export const makeSelectLibrary = () =>
  createSelector(selectLibraryDomain, substate => substate.toJS());

export const makeSelectVideoFilters = () =>
  createSelector(selectLibraryDomain, state => state.toJS().filters);

export default libraryReducer;
