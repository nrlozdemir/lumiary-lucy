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
import { Bar, Doughnut } from 'react-chartjs-2';

import PanopticSummaryCard from "Components/PanopticSummaryCard";
import LineChart from "Components/LineChart";
import Select from "Components/Form/Select";
import ColorTemperatureChart from "Components/ColorTemperatureChart";
import Button from 'Components/Form/Button';
import makeSelectPanoptic from "Selectors/Panoptic.js";

import dummySummary, {
	colorTempData,
	selectOptions,
	platforms,
	doughnutData,
	doughnutRoundData,
	stackedChartData,
	doughnutOptions, stackedChartOptions
} from "./dummySummary";
import style from "./style.scss";

/* eslint-disable react/prefer-stateless-function */
export class Panoptic extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isColorTempVisible: true,
			isStackedChartSidebarVisible: false,
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

	setSidebarVisible(type){
		this.setState({
			isStackedChartSidebarVisible: type
		})
	}

	render() {
		const { isColorTempVisible, isStackedChartSidebarVisible } = this.state;
		return (
			<React.Fragment>
				<div className="grid-container mr-20 ml-20 mt-72">
					{this.renderDummySummary()}
				</div>
				<LineChart />
				<div className="col-12 shadow-1 mt-72 bg-dark-grey-blue">
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
				<div className="col-12 shadow-1 mt-72 mb-72 bg-dark-grey-blue">
					<div className={style.radialChartsContainer}>
						<div className={style.temperatureHeader}>
							<div>
								<h2>Color Temperature / Sentiment Comparison</h2>
							</div>
							<div className={style.inputWrapper}>
								<Button
									onClick={() => this.setSidebarVisible(true)}
									customClass="float-right font-secondary-first text-bold"
									buttonText="Filter Videos"
									iconRight="qf-iconAdd"
								/>
							</div>
						</div>
						<div className="d-flex align-items-center justify-space-between ph-48">
							<div className={style.radialAndStackChartWrapper}>
								<div>
									<Doughnut
										options={doughnutOptions}
										width={270}
										height={270}
										data={{
											labels: [...doughnutData.average],
											datasets: [
												{
													data: [...doughnutData.average],
													borderColor: "#303a5d",
													backgroundColor: ["#acb0be", "#8567f0", "#ff556f", "#51adc0"],
													hoverBackgroundColor: ["#acb0be", "#8567f0", "#ff556f", "#51adc0"]
												}
											]
										}}
									/>
								</div>
								<div>
									{
										doughnutRoundData && doughnutRoundData.map((roundData, index) => (
											<div className="d-flex align-items-center pv-8" key={index}>
												<span className={style.round} style={{backgroundColor: `${roundData.color}`}}></span>
												<span className={style.secondsText}>{roundData.data}</span>
											</div>
										))
									}
								</div>
							</div>
							<div className={style.stackedChart}>
								<Bar
									width={550}
									height={300}
									data={stackedChartData}
									backgroundColor="#242b49"
									options={stackedChartOptions}
								/>
							</div>
						</div>
						{
							isStackedChartSidebarVisible &&
							<div className={style.stackedChartSideBar}>
								<div className={style.stackedChartSideBarContent}>
									<div className={style.closeIconWrapper}>
										<i className="qf-iconX" onClick={() => this.setSidebarVisible(false)}></i>
									</div>
									<div className={style.filterAreaWrapper}>
										<div className="pb-40">
											<p className={style.label}>Video Format</p>
											<Field
												component={Select}
												options={selectOptions}
												id="NumberOfScenes"
												name="NumberOfScenes"
												placeholder="Select One"
												label="Number of Scenes"
												className={style.formWrapper}
											/>
										</div>
										<div className="pb-40">
											<p className={style.label}>Age Audience</p>
											<Field
												component={Select}
												options={selectOptions}
												id="NumberOfScenes"
												name="NumberOfScenes"
												placeholder="Select One"
												label="Number of Scenes"
											/>
										</div>
										<div className="pb-40">
											<p className={style.label}>Gender Audience</p>
											<Field
												component={Select}
												options={selectOptions}
												id="NumberOfScenes"
												name="NumberOfScenes"
												placeholder="Select One"
												label="Number of Scenes"
											/>
										</div>
										<div className={style.dividedSelects}>
											<div>
												<p className={style.label}>Start Date</p>
												<Field
													component={Select}
													options={selectOptions}
													id="NumberOfScenes"
													name="NumberOfScenes"
													placeholder="Select One"
													label="Number of Scenes"
													className={style.formWrapper}
												/>
											</div>

											<div>
												<p className={style.label}>End Date</p>
												<Field
													component={Select}
													options={selectOptions}
													id="NumberOfScenes"
													name="NumberOfScenes"
													placeholder="Select One"
													label="Number of Scenes"
													className={style.formWrapper}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						}
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
