import { createSelector } from "reselect";

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.Home;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(selectHomeDomain, substate => substate.toJS());

export default makeSelectHome;
export { selectHomeDomain };
