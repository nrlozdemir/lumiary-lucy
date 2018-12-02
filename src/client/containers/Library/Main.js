"use strict";

import React from "react";
import PropTypes from "prop-types";
import "chartjs-plugin-datalabels";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as libraryActions } from "Reducers/library";

// Components //
import VideoBrief from "./Sections/videoBrief";
import Card from "../../components/Card";

import switchTabs from "./switchTabs";
import style from "./styles.scss";
import CompareVideoBrief from "./Sections/Compare/compareVideoBrief";
import { videos } from "./options";

class Library extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			video: props.setVideoObject(videos.find(obj => obj.id == props.params.id))
				.payload,
			compareMode: props.location.query.compareWith
				? videos.find(obj => obj.id == props.location.query.compareWith)
				: false
		};
	}

	componentDidMount() {
		this.props.resetCompareVideos();
	}

	changeCompareMode(val) {
		this.setState({ compareMode: val });
	}
	render() {
		return (
			<React.Fragment>
				<div className={style.main}>
					{this.state.compareMode ? (
						<CompareVideoBrief
							changeCompareMode={val => this.changeCompareMode(val)}
							video={this.state.video}
							compareWith={this.state.compareMode}
						/>
					) : (
						<VideoBrief
							changeCompareMode={val => this.changeCompareMode(val)}
							video={this.state.video}
						/>
					)}
				</div>
				<div className="col-12 mt-10 pb-10">
					<Card
						title="Lumiere Data"
						customHeaderClass="bg-charcoal-grey border-bt-dark color-white"
						customBodyClass="bg-charcoal-grey color-white"
					>
						{switchTabs(
							this.props.params.tab,
							this.props.routeParams.id,
							this.props.location.pathname,
							this.state.compareMode
						)}
					</Card>
				</div>
			</React.Fragment>
		);
	}
}

Library.propTypes = {
	router: PropTypes.object,
	params: PropTypes.object,
	location: PropTypes.object,
	routeParams: PropTypes.object,
	video: PropTypes.object,
	setVideoObject: PropTypes.func,
	resetCompareVideos: PropTypes.func
};

const mapStateToProps = state => {
	return {
		selectedVideos: state.library.toJS().compareVideos
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(libraryActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Library);
