/**
 *
 * Panoptic
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import PanopticSummaryCard from "Components/PanopticSummaryCard";
import LineChart from "Components/LineChart";
import PanopticBarChart from 'Components/PanopticBarChart';
import CompareShares from "Components/CompareShares";
import makeSelectPanoptic from "Selectors/Panoptic.js";
import dummySummary from "./dummySummary";

/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
	renderDummySummary() {
		return dummySummary.map(({ description, title }, index) => {
			return (
				<PanopticSummaryCard
					key={index}
					description={description}
					title={title}
				/>
			);
		});
	}
	render() {
		return (
			<React.Fragment>
				<div className="grid-container mr-20 ml-20 mt-72">
					{this.renderDummySummary()}
				</div>
				<LineChart />
        <PanopticBarChart />
				<CompareShares />
			</React.Fragment>
		);
	}
}

Panoptic.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	panoptic: makeSelectPanoptic()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(Panoptic);
