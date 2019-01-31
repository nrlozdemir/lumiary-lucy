import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import classnames from "classnames";
import style from "./style.scss";

import { radarData } from "./options";

class CompareShares extends Component {
	render() {
		const compareSharesContainer = classnames(
			"shadow-1 col-12 mt-48 mb-48",
			style.compareSharesContainer
		);

		const info = classnames("col-6", style.info);
		const radarComponent = classnames("col-4", style.radarComponent);

		return (
			<div className={compareSharesContainer}>
				<div className={style.componentTitle}>
					Dominant Color, Facebook & YouTube Shares
				</div>
				<div className={radarComponent}>
					<Radar
						data={radarData}
						height={250}
						options={{
							legend: {
								display: false
							},
							tooltips: {
								backgroundColor: "#fff",
								cornerRadius: 0,
								titleFontColor: "#000",
								mode: "point",
								bodyFontColor: "#000"
							},

							scale: {
								gridLines: {
									display: true,
									lineWidth: 10
								},
								pointLabels: {
									callback: function(value, index, values) {
										return "●";
									},
									fontSize: 16,
									fontColor: radarData.labels.map(lbl => lbl)
								},
								ticks: {
									display: false,
									maxTicksLimit: 5
								}
							}
						}}
					/>
				</div>
				<div className="col-4">
					<div className={info}>
						<div className={style.infoTitle}>Facebook</div>
						<ul>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
						</ul>
					</div>
					<div className={info}>
						<div className={style.infoTitle}>Facebook</div>
						<ul>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
							<li>
								<span>Blue</span>
								<br /> 24.6k Shares
							</li>
						</ul>
					</div>
				</div>
				<div className={radarComponent}>
					<Radar
						data={radarData}
						height={250}
						options={{
							legend: {
								display: false
							},
							tooltips: {
								backgroundColor: "#fff",
								cornerRadius: 0,
								titleFontColor: "#000",
								mode: "point",
								bodyFontColor: "#000"
							},

							scale: {
								gridLines: {
									display: true,
									lineWidth: 10
								},
								pointLabels: {
									callback: function(value, index, values) {
										return "●";
									},
									fontSize: 16,
									fontColor: radarData.labels.map(lbl => lbl)
								},
								ticks: {
									display: false,
									maxTicksLimit: 5
								}
							}
						}}
					/>
				</div>
			</div>
		);
	}
}

export default CompareShares;
