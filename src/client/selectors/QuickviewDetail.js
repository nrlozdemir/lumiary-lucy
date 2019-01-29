import { createSelector } from "reselect";

/**
 * Direct selector to the quickview state domain
 */

const selectQuickviewDetailDomain = state => state.QuickviewDetail;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuickviewDetail
 */

const makeSelectQuickviewDetail = () =>
	createSelector(
		selectQuickviewDetailDomain,
		substate => substate.toJS()
	);

export default makeSelectQuickviewDetail;
export { selectQuickviewDetailDomain };
