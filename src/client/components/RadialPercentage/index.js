"use strict";

import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import style from "./styles.scss";

import CircularProgressbar from "react-circular-progressbar";
import SegmentedProgressbar from "./SegmentedProgressbar";
import StyledProgressbar from "./StyledProgressbar";

class RadialPercentage extends React.PureComponent {

	render() {

		const { width, height, color, percentage } = this.props;

		return (
		    <div style={{ width: "135px", height: "135px", color: "#2f2e3d" }}>
		      <SegmentedProgressbar percentage={percentage} />
		    </div>
		);
	}
}

RadialPercentage.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color: PropTypes.string,
	percentage: PropTypes.string
};

export default RadialPercentage;
