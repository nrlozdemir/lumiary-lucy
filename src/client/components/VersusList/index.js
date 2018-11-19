"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import helpers from "../../scss/helpers.scss";
import variables from "../../scss/variables.scss";
import style from "./style.scss";
// Components
import Video from "../Video";
import VersusRow from "../VersusRow";

class VersusList extends React.Component {
	render() {
		const { videos } = this.props;
		return (
			<React.Fragment>
				<div>
					<div className="VersusCellLeft">Best Performing</div>
					<div className="VersusCellMid">% difference</div>
					<div className="VersusCellRight">Worst Performing</div>
				</div>
				{videos.map(video => (
					<React.Fragment key={video.key}>
						<VersusRow key={video.key} video={video} />
						<div className="">
							<div className={style.versusSubTitle}>{video.vl.subtitle}</div>
							<div className={style.versusCategory}>{video.title}</div>
							<div className={style.versusSubTitle}>{video.vr.subtitle}</div>
						</div>
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
