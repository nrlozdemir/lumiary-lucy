/* eslint-disable import/no-unresolved */
/*
 *
 * Select Filters Reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

export const types = {
  CHANGE_FILTER: 'SELECT_FILTER/CHANGE_FILTER',
  REMOVE_FILTER: 'SELECT_FILTER/REMOVE_FILTER',
  REMOVE_ALL_FILTER: 'SELECT_FILTER/REMOVE_ALL_FILTER',
}
export const actions = {
  changeFilter: (payload) => ({
    type: types.CHANGE_FILTER,
    payload,
  }),
  removeFilter: (payload) => ({
    type: types.REMOVE_FILTER,
    payload,
  }),
  removeAllFilters: () => ({
    type: types.REMOVE_ALL_FILTER,
  }),
}

export const initialState = fromJS({
  options: {
    engagement: [
      { value: 'Views', label: 'Views' },
      { value: 'Likes', label: 'Likes' },
      { value: 'Shares', label: 'Shares' },
      { value: 'Comments', label: 'Comments' },
    ],
    platform: [
      { value: 'All Platforms', label: 'All Platforms' },
      { value: 'facebook', label: 'Facebook' },
      { value: 'twitter', label: 'Twitter' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'pinterest', label: 'Pinterest' },
    ],
    aspectRatio: [
      { value: '16:9', label: '16:9' },
      { value: '1:1', label: '1:1' },
      { value: '4:3', label: '4:3' },
      { value: '9:16', label: '9:16' },
    ],
    resolution: [
      { value: '4K', label: '4K' },
      { value: '1080p', label: '1080p' },
      { value: '720p', label: '720p' },
      { value: '480p', label: '480p' },
      { value: '360p', label: '360p' },
    ],
    frameRate: [
      { value: '24', label: '24 Fps' },
      { value: '30', label: '30 Fps' },
      { value: '50', label: '50 Fps' },
    ],
    duration: [
      { value: '0-15', label: '0-15 sec' },
      { value: '16-30', label: '16-30 sec' },
      { value: '31-60', label: '31-60 sec' },
      { value: '61', label: '61+' },
    ],
    pacing: [
      { value: 'fast', label: 'Fast' },
      { value: 'medium', label: 'Medium' },
      { value: 'slow', label: 'Slow' },
      { value: 'slowest', label: 'Slowest' },
    ],
    videoFormat: [
      { value: 'liveAction', label: 'Live Action' },
      { value: 'cinemagraph', label: 'Cinemagraph' },
      { value: 'stopMotion', label: 'Stop Motion' },
      { value: 'animation', label: 'Animation' },
    ],
    videoProperty: [
      { value: 'aspect-ratio', label: 'Aspect Ratio' },
      { value: 'resolution', label: 'Resolution' },
      { value: 'frame-rate', label: 'Frame Rate' },
      { value: 'duration', label: 'Duration' },
      { value: 'pacing', label: 'Pacing' },
      { value: 'number-of-shots', label: 'Number Of Shots'},
      { value: 'dominant-color', label: 'Dominant Color'}
    ],
    audienceAge: [
      { value: '10-', label: '10 and under' },
      { value: '11-17', label: '11-17 yrs' },
      { value: '18-20', label: '18-20 yrs' },
      { value: '21-24', label: '21-24 yrs' },
      { value: '25-34', label: '25-34 yrs' },
      { value: '35-64', label: '35-64 yrs' },
      { value: '65+', label: '65 and over' },
    ],
    audienceGender: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'both', label: 'Both' },
    ],
    talentAge: [
      { value: '10-', label: '10 and under' },
      { value: '11-17', label: '11-17 yrs' },
      { value: '18-20', label: '18-20 yrs' },
      { value: '21-24', label: '21-24 yrs' },
      { value: '25-34', label: '25-34 yrs' },
      { value: '35-64', label: '35-64 yrs' },
      { value: '65+', label: '65 and over' },
    ],
    talentGender: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'both', label: 'Both' },
    ],
    colorTempature: [
      { value: 'happy-sad', label: 'Happy / Sad' },
      { value: 'energetic-calm', label: 'Energetic / Calm' },
      { value: 'cool-warm', label: 'Cool / Warm' },
      { value: 'natural-saynthetic', label: 'Natural / Saynthetic' },
    ],
    timeRange: [
      { value: 'Today', label: 'Today' },
      { value: 'Past Week', label: 'Past Week' },
      { value: 'Past Month', label: 'Past Month' },
      { value: 'Past 3 Months', label: 'Past 3 Months' },
      { value: 'custom', label: 'Custom' },
    ],
  },
  values: {},
  defaults: {
    engagement: 'Views',
    platform: 'All Platforms',
    aspectRatio: '16:9',
    resolution: '4K',
    frameRate: '24',
    duration: '0-15',
    pacing: 'fast',
    videoFormat: 'liveAction',
    videoProperty: 'aspect-ratio',
    audienceAge: '10-',
    audienceGender: 'male',
    talentAge: '10-',
    talentGender: 'male',
    colorTempature: 'happy-sad',
    timeRange: 'Today',
  },
})

const selectFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_FILTER:
      return state.mergeDeepIn(['values'], fromJS(action.payload))
    case types.REMOVE_FILTER:
      return state.deleteIn(['values', fromJS(action.payload)])
    case types.REMOVE_ALL_FILTER:
      return state.set('values', fromJS({}))
    default:
      return state
  }
}

export const selectFiltersState = (state) => {
  return state.SelectFilters
}

export const makeSelectSelectFilters = () =>
  createSelector(
    selectFiltersState,
    (substate) => substate.toJS()
  )

export default selectFiltersReducer
