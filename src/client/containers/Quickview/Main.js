"use strict";

import React, { Component } from "react";

import variables from "../../scss/variables.scss";
import style from "./style.scss";
import PropTypes from "prop-types";
import VersusList from "../../components/VersusList";
import RankingsList from "../../components/RankingsList";
import Dropdown from "../../components/Dropdown";
import { AgeIcon, SexIcon } from "../../components/Form/Controls/Radio";

class Quickview extends Component {
	render() {
		const versus = [
			{
				key: 1,
				title: "Duration",
				vl: {
					subtitle: '0:15"',
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				vr: {
					subtitle: '3:30"',
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/3.jpg",
					id: "kumascape3",
					video: "//media.quickframe.com/video/video/6324.mp4",
					subtitle: "3 Total"
				},
				vr: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "8 Scenes"
				},
				diff: "23"
			},
			{
				key: 3,
				title: "Product",
				vl: {
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4",
					subtitle: "Appearing for 80% of video"
				},
				vr: {
					subtitle: "No apperance",
					poster: "//static.quickframe.com/homepage/lumascape/4.jpg",
					id: "lumascape4",
					video: "//media.quickframe.com/video/video/13433.mp4"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					subtitle: "Vibrant - Warm",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Cool - Dull",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				diff: "97"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					subtitle: "Mostly Female",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "Mostly Male",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				diff: "38"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					subtitle: "240 FPS at 4K",
					poster: "//static.quickframe.com/homepage/lumascape/12.jpg",
					id: "lumascape12",
					video: "//media.quickframe.com/video/video/15991.mp4"
				},
				vr: {
					subtitle: "30 FPS at 1080p",
					poster: "//static.quickframe.com/homepage/lumascape/1.jpg",
					id: "lumascape1",
					video: "//media.quickframe.com/video/video/7485.mp4"
				},
				diff: "67"
			}
		];

		return (
			<React.Fragment>
				<div className={style.quickviewHeader}>
					<div className={style.quickviewHeader_cellLeft}>
						<div className={style.genders}>
							<icon className="qf-iconMale" />
							<span>Male</span>
						</div>
						<div className={style.genders}>
							<icon className="qf-iconFemale" />
							<span>Female</span>
						</div>
					</div>
					<div className={style.quickviewHeader_cellMid}>
						<table>
							<tr>
								<td>
									<img src={require("./../../assets/crosshair.png")} />
								</td>
								<td>Age range:</td>
								<td>18-24</td>
							</tr>
						</table>
					</div>
					<div className={style.quickviewHeader_cellRight}>
						<span className="qf-iconLeft-Arrow" /> views
						<span className="qf-iconRight-Arrow" />
					</div>
					<hr />
				</div>
				<div className="grid-container">
					<div className="col-8">
						<VersusList videos={versus} />
					</div>
					<div className="col-4">
						<RankingsList />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

Quickview.propTypes = {};
Quickview.defaultProps = {};

export default Quickview;
