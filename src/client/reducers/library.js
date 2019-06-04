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

  CLEAD_AND_LOAD_VIDEOS: 'Library/CLEAD_AND_LOAD_VIDEOS',

  CHANGE_FILTER: 'Library/CHANGE_FILTER',
}
export const actions = {
  loadVideos: (payload) => ({ type: types.LOAD_VIDEOS, payload }),
  loadVideosSuccess: (payload) => ({
    type: types.LOAD_VIDEOS_SUCCESS,
    payload,
  }),
  clearAndLoadVideos: (payload) => ({
    type: types.CLEAD_AND_LOAD_VIDEOS,
    payload,
  }),
  loadVideosError: (error) => ({ type: types.LOAD_VIDEOS, error }),
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
      return state
      // return state.set('loading', fromJS(true))

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

    case types.CLEAD_AND_LOAD_VIDEOS:
      console.log(action.payload.videos)
      return state
      .setIn(['data'], fromJS(action.payload))
      // .setIn(['data', 'videos'], fromJS(action.payload.videos))
      // .setIn(['data', 'pagination'], fromJS(action.payload.pagination))
      // .setIn(
          //   ['data', 'videos'],
          //   fromJS(
          //     state
          //       .setIn(['data', 'videos'], fromJS(action.payload.videos))
          //   )
          // )
          // .setIn(['data', 'pagination'], fromJS(action.payload.pagination))
          // .set('loading', fromJS(false))          

    case types.LOAD_VIDEOS_ERROR:
      return state
        .set('error', fromJS(action.error))
        .set('loading', fromJS(false))

    case types.CHANGE_FILTER:
      return state
        // .set('loading', fromJS(true))
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
