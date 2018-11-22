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
					<div className={style.versusCellMid} style={{ backgroundColor: '#2f2e3c', height: '175px'}}>
						<RadialPercentage fontsize="30" percentage={video.diff} />
					</div>
					<div className={style.versusCellRight}>
						<Video styleOverride={style.customVideo} key={video.vr.id} video={video.vr} />
					</div>
				</div>
				<div className='versusRow endOfRow'>
					<div className={style.versusCellLeft}>
						<h3 className={style.versusSubTitle}>{video.vl.subtitle}</h3>
					</div>
					<div className={style.versusCellMid}>
						<h3 className={style.versusCategory}>{video.title}</h3>
					</div>
					<div className={style.versusCellRight}>
						<h3 className={style.versusSubTitle}>{video.vr.subtitle}</h3>
					</div>
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
					<div className={style.versusCellLeft}>
						<h3 className={style.versusTitleBold} style={{fontSize: '18px', fontFamily: 'clanOT'}}>Best Performing</h3>
					</div>
					<div className={style.versusCellMid}>
						<h3 className={style.versusTitle}>% difference</h3>
					</div>
					<div className={style.versusCellRight}>
						<h3 className={style.versusTitleBold} style={{fontSize: '18px', fontFamily: 'clanOT'}}>Worst Performing</h3>
					</div>
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
