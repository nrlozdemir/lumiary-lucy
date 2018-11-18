"use strict";

import React from "react";
import PropTypes from "prop-types";

// Styles
import style from "./style.scss";
// Components
import Video from "../Video";
import VersusRow from "../VersusRow";

class VersusList extends React.Component {
	render() {
		const { videos } = this.props;
		return (
			<React.Fragment>
				<div className="">
					<div className="col-md-5">Best Performing</div>
					<div className="col-md-2">% difference</div>
					<div className="col-md-5">Worst Performing</div>
				</div>
				{videos.map(video => (
					<VersusRow key={video.key} video={video} />
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
