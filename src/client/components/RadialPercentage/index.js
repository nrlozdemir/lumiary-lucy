"use strict";

import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from "./style.scss";

import CircularProgressBar from "react-circular-progressbar";
import StyledProgressbar from "./StyledProgressbar";
import SegmentedProgressbar from "./SegmentedProgressbar";

class RadialPercentage extends Component {

	render() {

		const { width, height, color1, color2, percentage, fontsize } = this.props;

		return (
		    <div className={style.CircularProgressbar}>
		      <SegmentedProgressbar 
		      	fontsize={fontsize} 
		      	color1={color1} 
		      	color2={color2} 
		      	percentage={percentage} 
		      />
		    </div>
		);
	}
}

RadialPercentage.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color1: PropTypes.string,
	color2: PropTypes.string,
	percentage: PropTypes.string,
	fontsize: PropTypes.string
};

export default RadialPercentage;
