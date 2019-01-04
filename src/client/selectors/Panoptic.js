import { createSelector } from 'reselect';

/**
 * Direct selector to the panoptic state domain
 */

const selectPanopticDomain = state => state.Panoptic

/**
 * Other specific selectors
 */

/**
 * Default selector used by Panoptic
 */

const makeSelectPanoptic = () =>
  createSelector(selectPanopticDomain, substate => substate.toJS());

export default makeSelectPanoptic;
export { selectPanopticDomain };
