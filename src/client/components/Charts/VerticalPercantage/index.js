"use strict";

import React from "react";
import PropTypes from "prop-types";

// import style from "./styles.scss";

const VerticalPercentage = props => {
	const { width, height, data } = props;
	return (
		<div style={{ width: width, height: height }}>
			<div
				style={{
					width: (data.first * width) / 100,
					height: height,
					background: "#eee",
					float: "left"
				}}
			>
				1
			</div>
			<div
				style={{
					width: (data.second * width) / 100,
					height: height,
					background: "#000",
					float: "left"
				}}
			>
				2
			</div>
		</div>
	);
};

VerticalPercentage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.array
};

VerticalPercentage.defaultProps = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.array
};

export default VerticalPercentage;
