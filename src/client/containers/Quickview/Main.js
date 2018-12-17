"use strict";

import React, { Component } from "react";

import style from "./style.scss";
import VersusList from "../../components/VersusList";
import RankingsList from "../../components/RankingsList";
import Select from "./../../components/Form/Controls/Select/index";
import { shuffleArray } from "../../utils";
import { versus } from "../Library/options";

class Quickview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ageRange: { value: "18-24", label: "18-24", name: "versus1" },
			gender: "male"
		};
	}

	onChange(field, e) {
		this.setState({ [field]: e });
	}

	render() {
		return (
			<React.Fragment>
				<div className="grid-container mt-50">
					<div className="col-3">
						<div className={style.genders}>
							<div className={style.gender}>
								<div>
									<icon className="qf-iconMale" />
									<span onClick={() => this.onChange("gender", "male")}>
										Male
									</span>
								</div>
							</div>
							<div className={style.gender}>
								<div>
									<icon className="qf-iconFemale" />
									<span onClick={() => this.onChange("gender", "female")}>
										Female
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className={style.ageContainer}>
							<div>
								<img
									src={`https://s3.amazonaws.com/quickframe-static/img/lumiere/crosshair.png`}
								/>
							</div>
							<div className={style.ageRangeText}>Age Range:</div>
							<div>
								<Select
									className={style.ageRangeDropdownElement}
									options={[
										{ value: "18-24", label: "18-24", name: "versus1" },
										{ value: "24-30", label: "24-30", name: "versus2" },
										{ value: "30-43", label: "30-43", name: "versus3" }
									]}
									onChange={e => this.onChange("ageRange", e)}
									value={this.state.ageRange}
								/>
							</div>
						</div>
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
						<VersusList
							videos={versus[this.state.gender][this.state.ageRange.name]}
						/>
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
