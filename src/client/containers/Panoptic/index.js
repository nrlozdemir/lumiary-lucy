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
import { Field, reduxForm } from 'redux-form';

import PanopticSummaryCard from "Components/PanopticSummaryCard";
import LineChart from "Components/LineChart";
import Select from "Components/Form/Select";
import ColorTemperatureChart from "Components/ColorTemperatureChart";
import makeSelectPanoptic from "Selectors/Panoptic.js";

import dummySummary, { colorTempData, selectOptions, platforms } from "./dummySummary";
import style from "./style.scss";

/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isColorTempVisible: true
		}
	}

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
		const { isColorTempVisible } = this.state;
		return (
			<React.Fragment>
				<div className="grid-container mr-20 ml-20 mt-72">
					{this.renderDummySummary()}
				</div>
				<LineChart />
				<div className="col-12 shadow-1 mv-72 bg-dark-grey-blue">
					<div className={style.radialChartsContainer}>
						<div className={style.temperatureHeader}>
							<div>
								<h2>Color Temperature / Sentiment Comparison</h2>
							</div>
							<div className={style.inputWrapper}>
								<form className={style.form}>
									<Field
										component={Select}
										options={selectOptions}
										id="NumberOfScenes"
										name="NumberOfScenes"
										placeholder="Select One"
										label="Number of Scenes"
										className={style.formWrapper}
									/>
									<Field
										component={Select}
										options={selectOptions}
										id="NumberOfScenes"
										name="NumberOfScenes"
										placeholder="Select One"
										label="Number of Scenes"
										className={style.formWrapper}
									/>
								</form>
							</div>
						</div>
						<div className={style.temperatureContentContainer}>
							{
								isColorTempVisible && colorTempData &&
								<ColorTemperatureChart
									borderLess
									verticalText
									colorTempData={colorTempData}
								/>
							}
						</div>
						<div className="d-flex align-items-center justify-content-center ph-48">
							<div className={style.infoWrapper}>
								<span className={style.infoText}>Views</span>
							</div>
							<div className={style.infoWrapper}>
								<span className={style.infoText}>Likes</span>
							</div>
							<div className={style.infoWrapper}>
								<span className={style.infoText}>Comment</span>
							</div>
							<div className={style.infoWrapper}>
								<span className={style.infoText}>Shares</span>
							</div>

						</div>
						<div className="d-flex align-items-center justify-content-center ph-48 mv-48">
							{
								platforms && platforms.map((platform, index) => (
									<div key={index} className="d-flex align-items-center mr-8">
										<span className={style.round} style={{ backgroundColor: `${platform.color}` }}></span>
										<p className={style.platformName}>{platform.name}</p>
									</div>
								))
							}
						</div>
					</div>
				</div>
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

export default compose(reduxForm({
	form: 'panoptic'
}),withConnect)(Panoptic);
