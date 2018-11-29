"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "./style.scss";
// Components
import SegmentedProgressbar from "../../components/RadialPercentage/SegmentedProgressbar";
import VideoPlayer from "../VideoPlayer";

class VersusRow extends React.Component {
	render() {
		const video = this.props.video;
		return (
			<React.Fragment>
				<div className={style.versusContainer + " " + style.versusShadow}>
					<div className={style.versusVideoContainer}>
						<VideoPlayer
							data={video.vl.video}
							videoId={video.vl.id}
							fontSize={60}
						/>
					</div>
					<div className={style.versusMiddle + " bg-charcoal-grey"}>
						<SegmentedProgressbar fontsize="30" percentage={video.diff} />
					</div>
					<div className={style.versusVideoContainer}>
						<VideoPlayer
							data={video.vr.video}
							videoId={video.vr.id}
							fontSize={60}
						/>
					</div>
				</div>
				<div className={style.versusContainer}>
					<div className={style.versusVideoContainer}>
						<h3 className={style.versusSubTitle}>{video.vl.subtitle}</h3>
					</div>
					<div className={style.versusMiddle}>
						<h3 className={style.versusCategory}>{video.title}</h3>
					</div>
					<div className={style.versusVideoContainer}>
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
				<div className={style.versusContainer}>
					<div className={style.versusVideoContainer}>
						<h3 className={style.versusTitleBold}>Best Performing</h3>
					</div>
					<div className={style.versusMiddle}>
						<h3 className={style.versusTitle}>% difference</h3>
					</div>
					<div className={style.versusVideoContainer}>
						<h3 className={style.versusTitleBold}>Worst Performing</h3>
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
