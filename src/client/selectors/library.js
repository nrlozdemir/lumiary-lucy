import { createSelector } from 'reselect'


const compareVideosSelector = state => state.library


export const getCompareVideos = createSelector(compareVideosSelector, state => state.toJS().compareVideos) 