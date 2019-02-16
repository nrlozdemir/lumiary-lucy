/**
 *
 * Marketview
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, bindActionCreators } from "redux";
import { actions, makeSelectMarketview } from "Reducers/marketview";

import TopVideosChart from "Components/Charts/MarketView/TopVideos";
import ProgressBar from "Components/ProgressBar";
import MarketViewSlider from "Components/Sliders/Marketview";
import TopSimilarProperties from "Components/TopSimilarProperties";

import style from "./style.scss";

/* eslint-disable react/prefer-stateless-function */
export class Marketview extends React.Component {
	componentDidMount() {
		this.props.getCompetitorTopVideosRequest();
		this.props.getCompetitorVideosRequest();
		this.props.getSimilarPropertiesRequest();
	}

	changeSelectedVideo(video) {
		this.props.setSelectedVideo(video);
	}

	render() {
		const {
			marketview: { competitorTopVideos, similarProperties }
		} = this.props;

		if (!this.props.marketview.selectedVideo || this.props.marketview.loading) {
			return <div>Loading</div>;
		}

		return (
			<React.Fragment>
				<div className="col-12 bg-dark-grey-blue mt-50">
					<MarketViewSlider
						items={this.props.marketview.videos}
						changeVideo={video => this.changeSelectedVideo(video)}
					/>
					<div className={style.cardContainer}>
						{this.props.marketview.selectedVideo.options.map((card, index) => (
							<div className={style.card} key={index}>
								<p className={style.marketCardHeader}>{card.name}</p>
								{card.compareValues.map((value, i) => (
									<div className={style.progressArea} key={i}>
										<p className={style.title}>{value.title}</p>
										<p className={style.progressText}>
											<span className={style.leftTitle}>{value.leftTitle}</span>
											<span className={style.rightTitle}>
												{value.rightTitle}
											</span>
										</p>
										<ProgressBar
											width={value.value}
											customBarClass={style.progressBar}
											customPercentageClass={
												i % 2 ? style.percentageRed : style.percentageBlue
											}
										/>
									</div>
								))}
								<p className={style.cardDescription}>{card.description} </p>
							</div>
						))}
					</div>
				</div>
				{competitorTopVideos && (
					<TopVideosChart chartData={competitorTopVideos} />
				)}
				{similarProperties && <TopSimilarProperties data={similarProperties} />}
			</React.Fragment>
		);
	}
}

Marketview.propTypes = {};

const mapStateToProps = createStructuredSelector({
	marketview: makeSelectMarketview()
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(Marketview);
