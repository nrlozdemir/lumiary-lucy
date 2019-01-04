import { createSelector } from 'reselect';

/**
 * Direct selector to the marketview state domain
 */

const selectMarketviewDomain = state => state.Marketview

/**
 * Other specific selectors
 */

/**
 * Default selector used by Marketview
 */

const makeSelectMarketview = () =>
  createSelector(selectMarketviewDomain, substate => substate.toJS());

export default makeSelectMarketview;
export { selectMarketviewDomain };
