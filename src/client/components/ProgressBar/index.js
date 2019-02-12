/**
 *
 * ProgressBar
 *
 */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import style from "./style.scss";
/* eslint-disable react/prefer-stateless-function */
const ProgressBar = ({ customBarClass, customPercentageClass, width }) => {
	const barClass = classnames(style.progressBar, customBarClass);
	const percentageClass = classnames( customPercentageClass);
	return (
		<div className={barClass}>
			<div className={percentageClass} style={{ width: `${width}%` }} />
		</div>
	);
};

ProgressBar.propTypes = { customBarClass: PropTypes.string, customPercentageClass: PropTypes.string };

export default ProgressBar;
