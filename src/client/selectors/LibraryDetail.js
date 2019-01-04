import { createSelector } from 'reselect';

/**
 * Direct selector to the libraryDetail state domain
 */

const selectLibraryDetailDomain = state => state.LibraryDetail

/**
 * Other specific selectors
 */

/**
 * Default selector used by LibraryDetail
 */

const makeSelectLibraryDetail = () =>
  createSelector(selectLibraryDetailDomain, substate => substate.toJS());

export default makeSelectLibraryDetail;
export { selectLibraryDetailDomain };
