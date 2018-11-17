"use strict";

import React, { Component } from 'react'

import style from "./styles.scss";
import PropTypes from "prop-types";
import RadialPercentage from "../../components/RadialPercentage";

class Quickview extends React.PureComponent {

	render() {
		const items = ['Duration', 'Scenes', 'Product', 'Color', 'Gender', 'FPS'];
		const { width, height, color, percentage } = this.props;

		return (
			<div className={style.main}>
				<div className="col-8">
					<div className="col-4">
						testarea
					</div>
					<div className="col-4">
					</div>
					<div className="col-4">

					</div>
				</div>
				<div className="col-4">

				</div>
			</div>
		);
	}
}

Quickview.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color: PropTypes.string,
	percentage: PropTypes.string
};
Quickview.defaultProps = {};

export default Quickview;
