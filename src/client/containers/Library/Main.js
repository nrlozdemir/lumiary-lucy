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
			video: null,
			compareMode: false
		};
	}
	static getDerivedStateFromProps(props, state) {
		console.log(props, state);
		return {
			video: props.setVideoObject(videos.find(obj => obj.id == props.params.id))
				.payload
		};
	}

	compareModeOn() {
		this.setState({ compareMode: true });
	}
	compareModeOff() {
		this.setState({ compareMode: false });
	}
	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				<div className={style.main}>
					{this.state.compareMode ? (
						<CompareVideoBrief
							compareModeOn={() => this.compareModeOn()}
							compareModeOff={() => this.compareModeOff()}
							video={this.state.video}
						/>
					) : (
						<VideoBrief
							compareModeOn={() => this.compareModeOn()}
							compareModeOff={() => this.compareModeOff()}
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
	video: PropTypes.object
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(libraryActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Library);
