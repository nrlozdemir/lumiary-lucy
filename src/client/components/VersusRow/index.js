"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
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
			<div className="">
				<div className={style.versusList}>
					<Video key={video.vl.id} video={video.vl} />
				</div>
				<div style={{ color: "#800", height: "135px" }} className={`col-4 bordered listBlockMid`}>
					<RadialPercentage 
						width="135px" 
						height="135px" 
						color1="#2f2e3d"
						color2="#21bcd5"
						fontsize="30"
						percentage={video.diff} 
					/>
				</div>
				<div className={style.versusList}>
					<Video key={video.vr.id} video={video.vr} />
				</div>
			</div>
			<div className="">
				<div className="col-md-5"></div>
				<div className="col-md-2">{video.title}</div>
				<div className="col-md-5"></div>
			</div>
			</React.Fragment>
		);
	}
}

VersusRow.propTypes = {
	video: PropTypes.object
};

VersusRow.defaultProps = {};

export default VersusRow;

