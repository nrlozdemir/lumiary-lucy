"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./style.scss";

import CircularProgressBar from "react-circular-progressbar";
import SegmentedProgressbar from "./SegmentedProgressbar";

class RadialPercentage extends Component {
	render() {
		const { ...otherProps } = this.props;

		return <SegmentedProgressbar {...otherProps} />;
	}
}

RadialPercentage.propTypes = {};

export default RadialPercentage;
