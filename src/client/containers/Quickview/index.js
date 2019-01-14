/**
 *
 * Quickview
 *
 */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { DateRange } from "react-date-range";

import makeSelectQuickview from "Selectors/Quickview.js";

import VideoCard from "Components/VideoCard";
import QuickviewCard from "Components/QuickviewCard";
import Select from "Components/Form/Select";

import style from "./style.scss";

export class Quickview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dateRange: {
				selection: {
					startDate: new Date(),
					endDate: new Date(),
					key: "selection"
				}
			}
		};
	}

	handleChange = (selectedOption, name) => {
		this.setState({ [name]: selectedOption });
	};

	render() {
		const {
			selectViews,
			selectDate,
			dateRange: { selection: dateRange }
		} = this.state;

		return (
			<React.Fragment>
				<div className="grid-container col-12">
					<div className={style.headerContainer}>
						<div>
							<span className="dot-item">
								<span className="bg-cool-blue" />
								Best Videos
							</span>
							<span className="dot-item">
								<span className="bg-coral-pink" />
								Worst Videos
							</span>
						</div>
						<div>
							<h1 className="alpha color-white text-center font-primary text-bold">
								Quickview
							</h1>
						</div>
						<div className="headerRight">
							<Select
								name="selectViews"
								customClass="custom-select"
								placeholder="Select Views"
								value={selectViews || ""}
								onChange={option => this.handleChange(option, "selectViews")}
								options={[
									{ value: "Card", label: "Card" },
									{ value: "Table", label: "Table" }
								]}
							/>
							<Select
								name="selectDate"
								customClass="custom-select"
								placeholder="Select Date"
								value={selectDate || ""}
								onChange={option => this.handleChange(option, "selectDate")}
								options={[
									{ value: "Today", label: "Today" },
									{ value: "Past Week", label: "Past Week" },
									{ value: "Past Month", label: "Past Month" },
									{ value: "Past 3 Months", label: "Past 3 Months" },
									{ value: "custom", label: "Custom" }
								]}
							/>
							{selectDate && selectDate.value === "custom" && (
								<div className="absoluteInlineDatepicker">
									<DateRange
										onChange={value => this.handleChange(value, "dateRange")}
										moveRangeOnFirstSelection={false}
										ranges={[dateRange]}
									/>
									<div className="inline-buttons">
										<div
											onClick={() =>
												this.setState({
													selectDate: null
												})
											}
										>
											Back
										</div>
										<div
											onClick={() =>
												this.setState({
													selectDate: {
														value:
															moment(dateRange.startDate).format("DD/MM/YYYY") +
															" - " +
															moment(dateRange.endDate).format("DD/MM/YYYY"),
														label:
															moment(dateRange.startDate).format("DD/MM/YYYY") +
															" - " +
															moment(dateRange.endDate).format("DD/MM/YYYY")
													}
												})
											}
										>
											Apply
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="grid-collapse mt-50">
						<QuickviewCard
							cardName="All Platforms"
							difference={89}
							differenceType="Duration"
							detailsLink="/quickview/1/all"
							cards={[
								<VideoCard
									video={{
										title: (
											<div className={style.quickCardTitle}>
												<span>0:25s</span>
												<span>2,387,931 Views</span>
											</div>
										),
										thumbnailUrl: "https://picsum.photos/282/154?image=18",
										socialIcon: "instagram"
									}}
									options={{
										size: "none",
										presentationCard: true,
										barColor: "cool-blue",
										customClass: "QuickviewVideoCard"
									}}
								/>,
								<VideoCard
									video={{
										title: (
											<div className={style.quickCardTitle}>
												<span>3:15s</span>
												<span>516 Views</span>
											</div>
										),
										thumbnailUrl: "https://picsum.photos/282/154?image=19",
										socialIcon: "instagram"
									}}
									options={{
										size: "none",
										presentationCard: true,
										barColor: "coral-pink",
										customClass: "QuickviewVideoCard"
									}}
								/>
							]}
						/>

						<QuickviewCard
							cardName="Facebook"
							social="facebook"
							difference={78}
							differenceType="Pace"
							detailsLink="/quickview/2/facebook"
							cards={[
								<VideoCard
									video={{
										title: (
											<div className={style.quickCardTitle}>
												<span>Fast</span>
												<span>2,387,931 Views</span>
											</div>
										),
										thumbnailUrl: "https://picsum.photos/282/154?image=20",
										socialIcon: "facebook"
									}}
									options={{
										size: "none",
										presentationCard: true,
										barColor: "cool-blue",
										customClass: "QuickviewVideoCard"
									}}
								/>,
								<VideoCard
									video={{
										title: (
											<div className={style.quickCardTitle}>
												<span>Slow</span>
												<span>516 Views</span>
											</div>
										),
										thumbnailUrl: "https://picsum.photos/282/154?image=21",
										socialIcon: "facebook"
									}}
									options={{
										size: "none",
										presentationCard: true,
										barColor: "coral-pink",
										customClass: "QuickviewVideoCard"
									}}
								/>
							]}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Quickview.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	quickview: makeSelectQuickview()
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

export default compose(withConnect)(Quickview);
