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

  FILTER_VIDEOS: "Library/FILTER_VIDEOS",
  FILTER_VIDEOS_SUCCESS: "Library/FILTER_VIDEOS_SUCCESS",
  FILTER_VIDEOS_ERROR: "Library/FILTER_VIDEOS_ERROR",

  FILTER_TEXT_LIST: "Library/FILTER_TEXT_LIST",
  FILTER_TEXT_LIST_SUCCESS: "Library/FILTER_TEXT_LIST_SUCCESS",
  FILTER_TEXT_LIST_ERROR: "Library/FILTER_TEXT_LIST_ERROR",
};
export const actions = {
  loadVideos: () => ({ type: types.LOAD_VIDEOS }),
  loadVideosSuccess: payload => ({ type: types.LOAD_VIDEOS_SUCCESS, payload }),
  loadVideosError: error => ({ type: types.LOAD_VIDEOS, error }),

  filterVideos: filterText => ({ type: types.FILTER_VIDEOS, filterText}),
  filterVideosSuccess: payload => ({ type: types.FILTER_VIDEOS_SUCCESS, payload }),
  filterVideosError: error => ({ type: types.FILTER_VIDEOS_ERROR, error}),

  filterTextList: filterText => ({ type: types.FILTER_TEXT_LIST, filterText}),
  filterTextListSuccess: payload => ({ type: types.FILTER_TEXT_LIST_SUCCESS, payload }),
  filterTextListError: error => ({ type: types.FILTER_TEXT_LIST_ERROR, error})
};
export const initialState = fromJS({
  videos: [],
  filteredTextList: null,
  error: false,
  loading: false
});

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VIDEOS:
      return state.set("loading", fromJS(true));

    case types.LOAD_VIDEOS_SUCCESS:
      return state
        .set("videos", fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.LOAD_VIDEOS_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.FILTER_VIDEOS:
      return state.set("loading", fromJS(true));

    case types.FILTER_VIDEOS_SUCCESS:
      return state
        .set("videos", fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.FILTER_VIDEOS_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    case types.FILTER_TEXT_LIST:
      return state;

    case types.FILTER_TEXT_LIST_SUCCESS:
      return state
        .set("filteredTextList", fromJS(action.payload))
        .set("loading", fromJS(false));

    case types.FILTER_TEXT_LIST_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));

    default:
      return state;
  }
};

export const selectLibraryDomain = state => state.Library

export const makeSelectLibrary = () =>
  createSelector(selectLibraryDomain, substate => substate.toJS());

export default libraryReducer;
