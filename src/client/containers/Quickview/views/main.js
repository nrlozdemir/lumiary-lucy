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

import style from "./../style.scss";

export class Main extends React.Component {
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
					<div className="grid-collapse mt-50">
						<QuickviewCard
							cardName="All Platforms"
							difference={89}
							differenceType="Duration"
							detailsLink="/quickview/1/all-platforms"
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

Main.propTypes = {
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

export default compose(withConnect)(Main);
