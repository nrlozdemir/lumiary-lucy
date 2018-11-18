"use strict";

import React, { Component } from 'react'

import style from "./styles.scss";
import PropTypes from "prop-types";
import CircularProgressBar from "react-circular-progressbar";
import StyledProgressbar from "../../components/RadialPercentage/StyledProgressbar";
import SegmentedProgressbar from "../../components/RadialPercentage/SegmentedProgressbar";
import RadialPercentage from "../../components/RadialPercentage";
import VersusList from "../../components/VersusList";

class Quickview extends Component {

	render() {
		const { width, height, color, percentage, router } = this.props;

		const versus = [
			{
				title: "Duration",
				vl: {
					id: 1,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 2,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 45
			},
			{
				title: "Scenes",
				vl: {
					id: 3,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 4,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 23
			},
			{
				title: "Product",
				vl: {
					id: 5,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 6,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 76
			},
			{
				title: "Color",
				vl: {
					id: 7,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 8,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 97
			},
			{
				title: "Gender",
				vl: {
					id: 9,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 10,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 38
			},
			{
				title: "FPS",
				vl: {
					id: 11,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 12,
					subtitle: "",
					src: "https://picsum.photos/300/200"
				},
				diff: 67
			},
		];

		return (
			<div className={style.main}>
				<div className="col-8">
					<VersusList router={router} videos={versus} />
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
