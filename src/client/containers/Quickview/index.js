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
import { compose, bindActionCreators } from "redux";
import { Route, Switch } from "react-router-dom";

import { actions } from "Reducers/Quickview";
import makeSelectQuickview from "Selectors/Quickview.js";

import Select from "Components/Form/Select";
import Datepicker from "Components/Datepicker";

import style from "./style.scss";
import Main from "./views/main";
import Detail from "./views/detail";

export class Quickview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { getQuickviewItemsRequest } = this.props;
		getQuickviewItemsRequest();
	}

	handleChange = (selectedOption, name) => {
		this.setState({ [name]: selectedOption });
	};

	render() {
		const { selectViews, selectDate } = this.state;

		const {
			quickview: { quickviewItems: quickviewItems }
		} = this.props;

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
								<Datepicker
									type={"range"}
									apply={value =>
										this.setState({
											selectDate: {
												value:
													moment(value.startDate).format("DD/MM/YYYY") +
													" - " +
													moment(value.endDate).format("DD/MM/YYYY"),
												label:
													moment(value.startDate).format("DD/MM/YYYY") +
													" - " +
													moment(value.endDate).format("DD/MM/YYYY")
											}
										})
									}
									back={() =>
										this.setState({
											selectDate: null
										})
									}
								/>
							)}
						</div>
					</div>
					<Switch>
						<Route
							path="/quickview"
							exact
							render={() => <Main quickviewItems={quickviewItems} />}
						/>
						<Route path="/quickview/:id/:platform" component={Detail} />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

Quickview.propTypes = {
	dispatch: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
	quickview: makeSelectQuickview()
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(Quickview);
