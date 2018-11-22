"use strict";

import React, { Component } from 'react'

import variables from "../../scss/variables.scss";
import style from "./style.scss";
import PropTypes from "prop-types";
import VersusList from "../../components/VersusList";
import RankingsList from "../../components/RankingsList";
import Dropdown from "../../components/Dropdown";
import {AgeIcon, SexIcon} from "../../components/Form/Controls/Radio";

class Quickview extends Component {

	render() {
		const versus = [
			{
				key: 1,
				title: "Duration",
				vl: {
					id: 1,
					subtitle: "0:15\"",
					src: "https://picsum.photos/290/175?id=234624"
				},
				vr: {
					id: 2,
					subtitle: "3:30\"",
					src: "https://picsum.photos/290/175?id=234352"
				},
				diff: "45"
			},
			{
				key: 2,
				title: "Scenes",
				vl: {
					id: 3,
					subtitle: "3 Total",
					src: "https://picsum.photos/290/175?id=23683"
				},
				vr: {
					id: 4,
					subtitle: "8 Scenes",
					src: "https://picsum.photos/290/175?id=289624"
				},
				diff: "23"
			},
			{
				key: 3,
				title: "Product",
				vl: {
					id: 5,
					subtitle: "Appearing for 80% of video",
					src: "https://picsum.photos/290/175?id=896745"
				},
				vr: {
					id: 6,
					subtitle: "No apperance",
					src: "https://picsum.photos/290/175?id=768452"
				},
				diff: "76"
			},
			{
				key: 4,
				title: "Color",
				vl: {
					id: 7,
					subtitle: "Vibrant - Warm",
					src: "https://picsum.photos/290/175?id=346259"
				},
				vr: {
					id: 8,
					subtitle: "Cool - Dull",
					src: "https://picsum.photos/290/175?id=358679"
				},
				diff: "97"
			},
			{
				key: 5,
				title: "Gender",
				vl: {
					id: 9,
					subtitle: "Mostly Female",
					src: "https://picsum.photos/290/175?id=34951"
				},
				vr: {
					id: 10,
					subtitle: "Mostly Male",
					src: "https://picsum.photos/290/175?id=657146"
				},
				diff: "38"
			},
			{
				key: 6,
				title: "FPS",
				vl: {
					id: 11,
					subtitle: "240 FPS at 4K",
					src: "https://picsum.photos/290/175?id=674659"
				},
				vr: {
					id: 12,
					subtitle: "30 FPS at 1080p",
					src: "https://picsum.photos/290/175?id=123574"
				},
				diff: "67"
			},
		];

		return (
			<React.Fragment>
				<div className={style.quickviewHeader}>
					<div className={style.quickviewHeader_cellLeft}>
						<ul className={style.genderSelect}>
							<li><i className="qf-iconMale"></i>Male</li>
							<li><i className="qf-iconFemale"></i>Female</li>
						</ul>
					</div>
					<div className={style.quickviewHeader_cellMid}>
						<AgeIcon className={style.testere} />
						<Dropdown 
							className="kestere"
							buttonLabel="Age Range"
							buttonClassName=""
							arrowClassName=""
							arrow={true}
						>
							<div className="dd_child age-women-up-to-10">18-25</div>
							<div className="dd_child age-women-11-17">26-35</div>
							<div className="dd_child age-women-18-24">36-45</div>
						</Dropdown>
					</div>
					<div className={style.quickviewHeader_cellRight}>
						<span className="qf-iconLeft-Arrow"></span> views <span className="qf-iconRight-Arrow"></span>
					</div>
				</div>
				<div className={style.quickviewContent}>
					<div className={style.VersusList}>
						<VersusList videos={versus} />
					</div>
					<div className={style.RankingsList}>
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