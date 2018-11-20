"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import helpers from "../../scss/helpers.scss";
import variables from "../../scss/variables.scss";
import style from "./style.scss";
// Components
import CircularProgressBar from "react-circular-progressbar";
import StyledProgressbar from "../../components/RadialPercentage/StyledProgressbar";
import SegmentedProgressbar from "../../components/RadialPercentage/SegmentedProgressbar";
import RadialPercentage from "../../components/RadialPercentage";
import Video from "../Video";

class VersusRow extends React.Component {
	render() {
		const video = this.props.video;
		return (
			<React.Fragment>
			<div className={style.versusRow} style={{ backgroundColor: '#22212f'}}>
				<div className={style.versusCellLeft}>
					<Video styleOverride={style.customVideo} key={video.vl.id} video={video.vl} />
				</div>
				<div className={style.versusCellMid} style={{ backgroundColor: '#2f2e3c'}}>
					<RadialPercentage 
						width="135px" 
						height="135px" 
						color1="#2f2e3d"
						color2="#21bcd5"
						fontsize="30"
						percentage={video.diff} 
					/>
				</div>
				<div className={style.versusCellRight}>
					<Video styleOverride={style.customVideo} key={video.vr.id} video={video.vr} />
				</div>
			</div>
			<div className={style.versusRow}>
				<div className={style.versusSubTitle}>{video.vl.subtitle}</div>
				<div className={style.versusCategory}>{video.title}</div>
				<div className={style.versusSubTitle}>{video.vr.subtitle}</div>
			</div>
			</React.Fragment>
		);
	}
}

VersusRow.propTypes = {
	video: PropTypes.object
};
VersusRow.defaultProps = {};

class VersusList extends React.Component {
	render() {
		const { videos } = this.props;
		return (
			<React.Fragment>
				<div className={style.versusRow}>
					<div className={style.versusTitleBold}>Best Performing</div>
					<div className={style.versusTitle}>% difference</div>
					<div className={style.versusTitleBold}>Worst Performing</div>
				</div>
				{videos.map(video => (
					<React.Fragment key={video.key}>
						<VersusRow key={video.key} video={video} />
					</React.Fragment>
				))}
			</React.Fragment>
		);
	}
}

VersusList.propTypes = {
	videos: PropTypes.array
};
VersusList.defaultProps = {};

export default VersusList;
