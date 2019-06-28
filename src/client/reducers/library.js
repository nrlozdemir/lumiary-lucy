/*
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  LOAD_VIDEOS: 'Library/LOAD_VIDEOS',
  LOAD_VIDEOS_SUCCESS: 'Library/LOAD_VIDEOS_SUCCESS',
  LOAD_VIDEOS_ERROR: 'Library/LOAD_VIDEOS_ERROR',

  CLEAN_AND_LOAD_VIDEOS: 'Library/CLEAN_AND_LOAD_VIDEOS',

  CHANGE_FILTER: 'Library/CHANGE_FILTER',
}
export const actions = {
  loadVideos: (payload) => ({ type: types.LOAD_VIDEOS, payload }),
  loadVideosSuccess: (payload) => ({
    type: types.LOAD_VIDEOS_SUCCESS,
    payload,
  }),
  clearAndLoadVideos: (payload) => ({
    type: types.CLEAN_AND_LOAD_VIDEOS,
    payload,
  }),
  loadVideosError: (error) => ({ type: types.LOAD_VIDEOS_ERROR, error }),
  setSelectedVideo: (payload) => ({ type: types.SET_SELECTED_VIDEO, payload }),
  changeFilter: (payload) => ({ type: types.CHANGE_FILTER, payload }),
}

export const initialState = fromJS({
  data: { videos: [], pagination: {} },
  filters: {},
  error: false,
  loading: false,
})

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VIDEOS:
      return state.set('loading', fromJS(true))

    case types.LOAD_VIDEOS_SUCCESS:
      return state
        .setIn(
          ['data', 'videos'],
          fromJS(
            state
              .getIn(['data', 'videos'])
              .concat(fromJS(action.payload.videos))
          )
        )
        .setIn(['data', 'pagination'], fromJS(action.payload.pagination))
        .set('loading', fromJS(false))

    case types.CLEAN_AND_LOAD_VIDEOS:
      return state
        .set('loading', fromJS(false))
        .setIn(['data'], fromJS(action.payload))

    case types.LOAD_VIDEOS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.CHANGE_FILTER:
      return state
        .set('loading', fromJS(true))
        .set('filters', fromJS(action.payload))

    default:
      return state
  }
}

export const selectLibraryDomain = (state) => state.Library

export const makeSelectLibrary = () =>
  createSelector(
    selectLibraryDomain,
    (substate) => substate.toJS()
  )

export const makeSelectVideoFilters = () =>
  createSelector(
    selectLibraryDomain,
    (state) => state.toJS().filters
  )

export default libraryReducer
