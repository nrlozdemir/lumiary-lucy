"use strict";

import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from "./styles.scss";

import CircularProgressBar from "react-circular-progressbar";
import StyledProgressbar from "./StyledProgressbar";
import SegmentedProgressbar from "./SegmentedProgressbar";

class RadialPercentage extends Component {

	render() {

		const { width, height, color, percentage } = this.props;

		return (
		    <div style={{ width: {width}, height: {width}, color: {color} }}>
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
