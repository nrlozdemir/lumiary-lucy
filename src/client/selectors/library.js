import { createSelector } from 'reselect';

/**
 * Direct selector to the library state domain
 */

const selectLibraryDomain = state => state.Library

/**
 * Other specific selectors
 */

/**
 * Default selector used by Library
 */

const makeSelectLibrary = () =>
  createSelector(selectLibraryDomain, substate => substate.toJS());

export default makeSelectLibrary;
export { selectLibraryDomain };
