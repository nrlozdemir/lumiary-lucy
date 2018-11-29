"use strict";

import React, { Component } from "react";

import style from "./style.scss";
import VersusList from "../../components/VersusList";
import RankingsList from "../../components/RankingsList";
import Select from "./../../components/Form/Controls/Select/index";

class Quickview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ageRange: { value: "18-24", label: "18-24" }
		};
	}
	onChange(e) {
		this.setState({ ageRange: e });
	}
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
				<div className="grid-container mt-50">
					<div className="col-3">
						<div className={style.genders}>
							<div className={style.gender}>
								<div>
									<icon className="qf-iconMale" />
									<span>Male</span>
								</div>
							</div>
							<div className={style.gender}>
								<div>
									<icon className="qf-iconFemale" />
									<span>Female</span>
								</div>
							</div>
						</div>
					</div>
<<<<<<< HEAD
					<div className={style.quickviewHeader_cellMid}>
						<table>
							<tr>
								<td>
									<img
										src={`https://s3.amazonaws.com/quickframe-static/img/lumiere/crosshair.png`}
									/>
								</td>
								<td>Age range:</td>
								<td>18-24</td>
							</tr>
						</table>
=======
					<div className="col-6">
						<div className={style.ageContainer}>
							<div>
								<img src={require("./../../assets/crosshair.png")} />
							</div>
							<div className={style.ageRangeText}>Age Range:</div>
							<div>
								<Select
									className={style.ageRangeDropdownElement}
									options={[
										{ value: "18-24", label: "18-24" },
										{ value: "24-30", label: "24-30" },
										{ value: "30-43", label: "30-43" }
									]}
									onChange={e => this.onChange(e)}
									value={this.state.ageRange}
								/>
							</div>
						</div>
>>>>>>> feat: quickview page header side has done
					</div>
					<div className="col-3">
						<p className={style.viewContainer}>
							<span className="qf-iconLeft-Arrow" />
							<span> views</span>
							<span className="qf-iconRight-Arrow" />
						</p>
					</div>
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
