import React, { Component } from "react";

// Styles
import style from "./styles.scss";
import LineChart from "./Sections/lineChart";

class Panoptic extends Component {
	render() {
		return (
			<div>
				<div className={style.panopticHero}>
					<div className={style.chartPanel + " col-6"}>
						<div className={style.controlGroup}>
							<label className={style.control + " controlCheckbox"}>
								2D Animation
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator + " " + style.first} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Stop Motion
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator + " second"} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Motion Graphics
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator} />
							</label>

							<label className={style.control + " controlCheckbox"}>
								Live Action
								<input type="checkbox" checked="checked" />
								<div className={style.controlIndicator} />
							</label>
						</div>

						<figure className={style.chart}>
							<img src={require("../../assets/group.png")} />
						</figure>
					</div>

					<div className={style.resultsPanel + " col-3"}>
						<div className={style.outerWrapFirst}>
							<div className={style.skewBarFirst} />
							<p>69%</p>
						</div>
						<div className={style.outerWrapSecond}>
							<div className={style.skewBarSecond} />
						</div>
						<div className={style.outerWrapThird}>
							<div className={style.skewBarThird} />
						</div>
						<div className={style.outerWrapFourth}>
							<div className={style.skewBarFourth} />
						</div>
					</div>
					<div className={style.rightPanel + " col-3"}>tatatatatata</div>
				</div>
				<LineChart />
			</div>
		);
	}
}

export default Panoptic;
