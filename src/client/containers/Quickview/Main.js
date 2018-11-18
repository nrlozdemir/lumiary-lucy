"use strict";

import React, { Component } from 'react'

import style from "./styles.scss";
import PropTypes from "prop-types";
import CircularProgressBar from "react-circular-progressbar";
import StyledProgressbar from "../../components/RadialPercentage/StyledProgressbar";
import SegmentedProgressbar from "../../components/RadialPercentage/SegmentedProgressbar";
import RadialPercentage from "../../components/RadialPercentage";

class Quickview extends Component {

	render() {
		const items = ['Duration', 'Scenes', 'Product', 'Color', 'Gender', 'FPS'];
		const { width, height, color, percentage } = this.props;

		return (
			<div className={style.main}>
				<div className="col-8">
					<div style={{ color: '#fff' }} className={`col-4 bordered listBlockLeft`}>
						testarea
					</div>
					<div style={{ color: '#800', height: '135px' }} className={`col-4 bordered listBlockMid`}>
						<RadialPercentage 
							width="135px" 
							height="135px" 
							color1="#2f2e3d"
							color2="#21bcd5"
							percentage="16" 
							fontsize="30"
						/>
					</div>
					<div className={`col-4 bordered listBlockRight`}>

					</div>
				</div>
				<div className="col-4">

				</div>
			</div>
		);
	}
}

Quickview.propTypes = {};
Quickview.defaultProps = {};

export default Quickview;
