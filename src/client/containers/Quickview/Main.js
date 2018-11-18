"use strict";

import React, { Component } from 'react'

import style from "./styles.scss";
import PropTypes from "prop-types";
import VersusList from "../../components/VersusList";

class Quickview extends Component {

	render() {
		const versus = [
			{
				key: 1,
				title: "Duration",
				vl: {
					id: 1,
					subtitle: "0:15\"",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 2,
					subtitle: "3:30\"",
					src: "https://picsum.photos/300/200"
				},
				diff: 45
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					id: 3,
					subtitle: "3 Total",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 4,
					subtitle: "8 Scenes",
					src: "https://picsum.photos/300/200"
				},
				diff: 23
			},
			{
				key: 3,
				title: "Product",
				vl: {
					id: 5,
					subtitle: "Appearing for 80% of video",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 6,
					subtitle: "No apperance",
					src: "https://picsum.photos/300/200"
				},
				diff: 76
			},
			{
				key: 4,
				title: "Color",
				vl: {
					id: 7,
					subtitle: "Vibrant - Warm",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 8,
					subtitle: "Cool - Dull",
					src: "https://picsum.photos/300/200"
				},
				diff: 97
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					id: 9,
					subtitle: "Mostly Female",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 10,
					subtitle: "Mostly Male",
					src: "https://picsum.photos/300/200"
				},
				diff: 38
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					id: 11,
					subtitle: "240 FPS at 4K",
					src: "https://picsum.photos/300/200"
				},
				vr: {
					id: 12,
					subtitle: "30 FPS at 1080p",
					src: "https://picsum.photos/300/200"
				},
				diff: 67
			},
		];

		return (
			<div className={style.main}>
				<div className="col-8">
					<VersusList videos={versus} />
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
