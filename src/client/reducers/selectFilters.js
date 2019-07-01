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

export const defaultFilters = {
  metric: 'views',
  platform: 'all',
  aspectRatio: '16:9',
  resolution: '4K',
  frameRate: '24',
  duration: '0-15',
  pacing: 'fast',
  videoFormat: 'liveAction',
  property: 'pacing',
  audienceAge: '10-',
  audienceGender: 'male',
  talentAge: '10-',
  talentGender: 'male',
  colorTemperature: 'happy-sad',
  dateRange: 'week',
  propertyEngagement: 'pacing|views',
  platformEngagement: 'facebook|views',
}

export const initialState = fromJS({
  options: {
    metric: [
      { value: 'views', label: 'Views' },
      { value: 'likes', label: 'Likes' },
      { value: 'shares', label: 'Shares' },
      { value: 'comments', label: 'Comments' },
    ],
    platform: [
      { value: 'all', label: 'All Platforms' },
      { value: 'facebook', label: 'Facebook' },
      { value: 'twitter', label: 'Twitter' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'youtube', label: 'YouTube' },
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
    property: [
      { value: 'aspectRatio', label: 'Aspect Ratio' },
      { value: 'duration', label: 'Duration' },
      { value: 'format', label: 'Format' },
      { value: 'frameRate', label: 'Frame Rate' },
      { value: 'pacing', label: 'Pacing' },
      { value: 'resolution', label: 'Resolution' },
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
    colorTemperature: [
      { value: 'happy-sad', label: 'Happy / Sad' },
      { value: 'energetic-calm', label: 'Energetic / Calm' },
      { value: 'natural-synthetic', label: 'Natural / Synthetic' },
    ],
    dateRange: [
      { value: 'week', label: 'Past Week' },
      { value: 'month', label: 'Past Month' },
      { value: '3months', label: 'Past 3 Months' },
    ],
    platformEngagement: [
      {
        label: 'All Platforms',
        options: [
          { value: 'all|views', label: 'Views' },
          { value: 'all|likes', label: 'Likes' },
          { value: 'all|shares', label: 'Shares' },
          { value: 'all|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Facebook',
        options: [
          { value: 'facebook|views', label: 'Views' },
          { value: 'facebook|likes', label: 'Likes' },
          { value: 'facebook|shares', label: 'Shares' },
          { value: 'facebook|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Twitter',
        options: [
          { value: 'twitter|views', label: 'Views' },
          { value: 'twitter|likes', label: 'Likes' },
          { value: 'twitter|shares', label: 'Shares' },
          { value: 'twitter|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Instagram',
        options: [
          { value: 'instagram|views', label: 'Views' },
          { value: 'instagram|likes', label: 'Likes' },
          { value: 'instagram|shares', label: 'Shares' },
          { value: 'instagram|comments', label: 'Comments' },
        ],
      },
      {
        label: 'YouTube',
        options: [
          { value: 'youtube|views', label: 'Views' },
          { value: 'youtube|likes', label: 'Likes' },
          { value: 'youtube|shares', label: 'Shares' },
          { value: 'youtube|comments', label: 'Comments' },
        ],
      },
    ],
    propertyEngagement: [
      {
        label: 'Pacing',
        options: [
          { value: 'pacing|views', label: 'Views' },
          { value: 'pacing|likes', label: 'Likes' },
          { value: 'pacing|shares', label: 'Shares' },
          { value: 'pacing|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Aspect Ratio',
        options: [
          { value: 'aspectRatio|views', label: 'Views' },
          { value: 'aspectRatio|likes', label: 'Likes' },
          { value: 'aspectRatio|shares', label: 'Shares' },
          { value: 'aspectRatio|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Duration',
        options: [
          { value: 'duration|views', label: 'Views' },
          { value: 'duration|likes', label: 'Likes' },
          { value: 'duration|shares', label: 'Shares' },
          { value: 'duration|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Format',
        options: [
          { value: 'format|views', label: 'Views' },
          { value: 'format|likes', label: 'Likes' },
          { value: 'format|shares', label: 'Shares' },
          { value: 'format|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Frame Rate',
        options: [
          { value: 'frameRate|views', label: 'Views' },
          { value: 'frameRate|likes', label: 'Likes' },
          { value: 'frameRate|shares', label: 'Shares' },
          { value: 'frameRate|comments', label: 'Comments' },
        ],
      },
      {
        label: 'Resolution',
        options: [
          { value: 'resolution|views', label: 'Views' },
          { value: 'resolution|likes', label: 'Likes' },
          { value: 'resolution|shares', label: 'Shares' },
          { value: 'resolution|comments', label: 'Comments' },
        ],
      },
    ],
  },
  values: {},
  defaults: defaultFilters,
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

export const selectFiltersState = (state) => state.SelectFilters

export const makeSelectSelectFilters = () =>
  createSelector(
    selectFiltersState,
    (substate) => substate.toJS()
  )

export default selectFiltersReducer
