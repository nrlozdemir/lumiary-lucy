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
  changeFilter: payload => ({type: types.CHANGE_FILTER, payload})
};
export const initialState = fromJS({
  videos: [],
  filters: {},
  sortedVideos: [],
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
        .set("sortedVideos", fromJS(sortVideos(action.payload, state.get('filters').toJS())))
        .set("loading", fromJS(false));

    case types.LOAD_VIDEOS_ERROR:
      return state
        .set("error", fromJS(action.error))
        .set("loading", fromJS(false));
    case types.CHANGE_FILTER:
      const newVideos = sortVideos(state.get('videos').toJS(), action.payload);

      return state
        .set('filters', action.payload)
        .set('sortedVideos', fromJS(newVideos));
    default:
      return state;
  }
};

function sortVideos(videos, filters) {
  const { OrderedBy, AgeRange, Gender, Duration, radioColorSelected, VideoFormat, AspectRatio, FramesPerSecond, Resolution, Pacing, Facebook, Instagram, Youtube, Twitter, Pinterest } = filters;
  let newVideos = [...videos];

  if ([Facebook, Instagram, Youtube, Twitter, Pinterest].some(value => value)) {
    newVideos = newVideos.filter(({socialIcon}) => ({Facebook, Instagram, Youtube, Twitter, Pinterest}[socialIcon]));
  }

  if (AgeRange) {
    newVideos = newVideos.filter(({ageRange}) => ageRange === AgeRange.value);
  }

  if (Gender) {
    newVideos = newVideos.filter(({gender}) => gender === Gender.value);
  }

  if (Duration) {
    const [min, max] = Duration;
    newVideos = newVideos.filter(({duration}) => duration >= min && duration <= max);
  }

  if (radioColorSelected) {
    newVideos = newVideos.filter(({dominantColor}) => dominantColor === radioColorSelected.color);
  }

  if (VideoFormat) {
    newVideos = newVideos.filter(({format}) => format === VideoFormat.value);
  }

  if (AspectRatio) {
    newVideos = newVideos.filter(({aspectRatio}) => aspectRatio === AspectRatio.value);
  }
  
  if (FramesPerSecond) {
    newVideos = newVideos.filter(({frameRate}) => frameRate == FramesPerSecond.value);
  }
  
  if (Resolution) {
    newVideos = newVideos.filter(({resolution}) => resolution === Resolution.value);
  }

  if (Pacing) {
    newVideos = newVideos.filter(({pacing}) => pacing === Pacing.value);
  }

  if (OrderedBy) {
    let orderBy;
    switch (OrderedBy.value) {
      case 'mostViewedVideos':
        orderBy = 'viewCount';
        break;
      case 'mostLikedVideos':
        orderBy = 'likeCount';
        break;
      case 'mostSharedVideos':
        orderBy = 'shareCount';
        break;
      case 'mostCommentedVideos':
        orderBy = 'commentCount';
        break;
    }

    newVideos = newVideos.sort((prev, next) => prev[orderBy] < next[orderBy] ? 1 : -1);
  }

  return newVideos;
}

export const selectLibraryDomain = state => state.Library

export const makeSelectLibrary = () =>
  createSelector(selectLibraryDomain, substate => substate.toJS());

export default libraryReducer;
