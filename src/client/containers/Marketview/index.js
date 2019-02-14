import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import classnames from "classnames";
import makeSelectMarketview from "Selectors/Marketview.js";
import { Bar, Doughnut } from "react-chartjs-2";

import style from "./style.scss";

import Select from "Components/Form/Select";

import {
	barData,
	barDataOptions,
	barDurationData,
	barDurationOptions
} from "./options";

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bubbleChartOptions: [
				{
					id: 1,
					color: "#cc2226",
					title: "Social 1",
					icon: "<span>1</span>"
				},
				{
					id: 2,
					color: "#dd501d",
					title: "Social 2",
					icon: "<span>2</span>"
				},
				{
					id: 3,
					color: "#eb7919",
					title: "Social 3",
					icon: "<span>3</span>"
				},
				{
					id: 4,
					color: "#f8b90b",
					title: "Social 4",
					icon: "<span>4</span>"
				},
				{
					id: 5,
					color: "#fff20d",
					title: "Social 5",
					icon: "<span>5</span>"
				},
				{
					id: 6,
					color: "#aac923",
					title: "Social 6",
					icon: "<span>6</span>"
				},
				{
					id: 7,
					color: "#13862b",
					title: "Social 7",
					icon: "<span>7</span>"
				},
				{
					id: 8,
					color: "#229a78",
					title: "Social 8",
					icon: "<span>8</span>"
				},
				{
					id: 9,
					color: "#3178b0",
					title: "Social 9",
					icon: "<span>9</span>"
				},
				{
					id: 10,
					color: "#79609b",
					title: "Social 10",
					icon: "<span>10</span>"
				},
				{
					id: 11,
					color: "#923683",
					title: "Social 11",
					icon: "<span>11</span>"
				},
				{
					id: 12,
					color: "#b83057",
					title: "Social 12",
					icon: "<span>12</span>"
				}
			]
		};
	}

	handleChange = (selectedOption, name) => {
		this.setState({ [name]: selectedOption });
	};

	render() {
		const { bubbleChartOptions } = this.state;
		const { views, platforms, date } = this.state;

		const cardContainer = classnames(
			"shadow-1 col-12-gutter-20 mb-48",
			style.cardContainer
		);

		return (
			<div className="grid-container col-12">
				<div className={style.alignTabs}>
					<a href="#" className={style.tab}>
						Platform
					</a>
					<a href="#" className={style.tab}>
						Competitor
					</a>
					<a href="#" className={style.tab}>
						Time
					</a>
				</div>
				<div className="grid-collapse">
					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Color</div>
							<div className={style.marketViewCardDescription}>
								Top Performing Platform
							</div>
							<div className={style.marketViewCardDate}>
								<span>Past 3 Months</span>
							</div>

							<div className={style.colors}>
								{bubbleChartOptions.map((social, i) => (
									<span key={i} style={{ backgroundColor: social.color }} />
								))}
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all
								platforms
							</div>
							<a href="#" className={style.marketViewCardLink}>
								View Platform Metrics <span className="qf-iconRight-Arrow" />
							</a>
						</div>
					</div>

					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Pacing</div>
							<div className={style.marketViewCardDescription}>
								Top Competitor Similarities
							</div>
							<div className={style.marketViewCardDate}>
								<span>Past Month</span>
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all
								platforms
							</div>
							<a href="#" className={style.marketViewCardLink}>
								View Competitor Metrics <span className="qf-iconRight-Arrow" />
							</a>
						</div>
					</div>

					<div className="col-4 mb-48">
						<div className={style.marketViewCard}>
							<div className={style.marketViewCardTitle}>Format</div>
							<div className={style.marketViewCardDescription}>
								Performance Over Time
							</div>
							<div className={style.marketViewCardDate}>
								<span>On Mondays</span>
							</div>

							<div className={style.marketViewCardDescription}>
								Based on the number of likes for competitors across all
								platforms
							</div>
							<a href="#" className={style.marketViewCardLink}>
								View Time Metrics <span className="qf-iconRight-Arrow" />
							</a>
						</div>
					</div>
				</div>

				<div className="grid-collapse">
					<div className={cardContainer}>
						<div className={style.cardTitle}>
							<span>Total Views For All Platforms In The Past Month</span>
							<div className={style.selects}>
								<Select
									name="views"
									customClass="custom-select"
									placeholder="Select Views"
									value={views || ""}
									onChange={option => this.handleChange(option, "views")}
									options={[
										{ value: "Views", label: "Views" },
										{ value: "Comments", label: "Comments" }
									]}
								/>
								<Select
									name="platforms"
									customClass="custom-select"
									placeholder="Select Platforms"
									value={platforms || ""}
									onChange={option => this.handleChange(option, "platforms")}
									options={[{ value: "All Platforms", label: "All Platforms" }]}
								/>
								<Select
									name="date"
									customClass="custom-select"
									placeholder="Select Date"
									value={date || ""}
									onChange={option => this.handleChange(option, "date")}
									options={[
										{ value: "Past Month", label: "Past Month" },
										{ value: "Past Year", label: "Past Year" }
									]}
								/>
							</div>
						</div>
						<div className="grid-collapse">
							<div className="col-6">
								<Bar
									data={{
										labels: barData.labels,
										datasets: barData.datasets.map((data, index) => {
											const indexValues = data.data.map((v, i) => {
												return barData.datasets.map(d => d.data[i]);
											});

											return {
												...data,
												data: data.data.map((value, i) => {
													const totalValue = indexValues[i].reduce(
														(accumulator, currentValue) =>
															accumulator + currentValue
													);

													return parseFloat(
														(value / (totalValue / 100)).toFixed(2)
													);
												})
											};
										})
									}}
									width={500}
									options={barDataOptions}
									height={300}
								/>
							</div>
							<div className="col-6">
								<div className="d-flex justify-space-between align-items-center">
									<div className={style.colorList}>
										<div className={style.colorListItem}>Barstool Sports</div>
										<div className={style.colorListItem}>SB Nation</div>
										<div className={style.colorListItem}>ESPN</div>
										<div className={style.colorListItem}>Scout Media</div>
										<div className={style.colorListItem}>Fansided</div>
									</div>
									<div className={style.doughnutChart}>
										<Doughnut
											options={{
												responsive: false,
												legend: {
													display: false
												},
												layout: {
													padding: 0
												}
											}}
											width={300}
											height={300}
											data={{
												labels: [
													"Barstool Sports",
													"SB Nation",
													"ESPN",
													"Scout Media",
													"Fansided"
												],
												datasets: [
													{
														data: [50, 20, 15, 10, 5],
														borderColor: "#303a5d",
														backgroundColor: [
															"#51adc0",
															"#8567f0",
															"#ff556f",
															"#acb0be",
															"#5a6386"
														],
														hoverBackgroundColor: [
															"#51adc0",
															"#8567f0",
															"#ff556f",
															"#acb0be",
															"#5a6386"
														]
													}
												]
											}}
										/>
										<div className="poa-middle text-center">
											Past Month
											<br />
											Combinded
											<br />
											Views
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={cardContainer}>
						<div className={style.cardTitle}>
							<span>Total Competitor Views By Duration</span>
							<div
								className={classnames(
									style.colorListHorizontal,
									style.colorList
								)}
							>
								<div className={style.colorListItem}>Barstool Sports</div>
								<div className={style.colorListItem}>SB Nation</div>
								<div className={style.colorListItem}>ESPN</div>
								<div className={style.colorListItem}>Scout Media</div>
								<div className={style.colorListItem}>Fansided</div>
							</div>
						</div>
						<Bar
							data={barDurationData}
							width={500}
							options={barDurationOptions}
							height={100}
						/>
					</div>
				</div>
			</div>
		);
	}
}

Marketview.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview()
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

export default compose(withConnect)(Marketview);
