import { createSelector } from 'reselect';

/**
 * Direct selector to the quickview state domain
 */

const selectQuickviewDomain = state => state.Quickview

/**
 * Other specific selectors
 */

/**
 * Default selector used by Quickview
 */

const makeSelectQuickview = () =>
  createSelector(selectQuickviewDomain, substate => substate.toJS());

export default makeSelectQuickview;
export { selectQuickviewDomain };
