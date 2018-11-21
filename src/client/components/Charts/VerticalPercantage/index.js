"use strict";

import React from "react";
import PropTypes from "prop-types";

import style from "./styles.scss";

const VerticalPercentage = ({ height, data, float, labels }) => {
	const rotatedLabels = float === "left" ? labels : labels.reverse();
	return (
		<div style={{ height: height }}>
			<div className={style.labelPlace}>
				{rotatedLabels.map(label => (
					<React.Fragment key={label}>
						<div>
							<p className={float}>{label}</p>
						</div>
					</React.Fragment>
				))}
			</div>
			<div className={style.bar} style={{ height: height }}>
				<div
					style={{
						width: data,
						height: height - 2,
						background: "#eee",
						float: float
					}}
				/>
			</div>
		</div>
	);
};

VerticalPercentage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.array,
	float: PropTypes.string,
	labels: PropTypes.array
};

VerticalPercentage.defaultProps = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.array,
	float: PropTypes.string,
	labels: PropTypes.array
};

export default VerticalPercentage;
