import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-style";
import style from "./../styles.scss";

const lineData = {
	labels: [
		"1Q16",
		"2Q16",
		"3Q16",
		"4Q16",
		"5Q16",
		"6Q16",
		"7Q16",
		"8Q16",
		"9Q16"
	],
	datasets: [
		{
			label: "One",
			fill: false,
			lineTension: 0,
			backgroundColor: "rgba(255,0,0,0.3)",
			borderColor: "#1daac1",
			borderWidth: 2,
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(0,0,0,1)",
			pointBackgroundColor: "#1daac1",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBorderWidth: 1,
			pointRadius: 5,
			pointHitRadius: 0,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			shadowBlur: 15,
			shadowColor: "#00adc4",
			data: [65, 59, -80, 81, 86, -35, 43, -59, -80, 81, 86]
		},
		{
			label: "Second",
			fill: false,
			lineTension: 0,
			borderWidth: 2,
			backgroundColor: "rgba(255,0,0,0.3)",
			borderColor: "#0b424b",
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(0,0,0,1)",
			pointBackgroundColor: "#0b424b",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointRadius: 5,
			pointHitRadius: 0,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			shadowBlur: 15,
			shadowColor: "#0b424b",
			data: [-65, 69, 40, -42, 36, 35, 43, -79, -10, 4, 0]
		},
		{
			label: "Third",
			fill: false,
			lineTension: 0,
			borderWidth: 2,
			backgroundColor: "rgba(255,0,0,0.3)",
			borderColor: "#006c7a",
			borderCapStyle: "butt",
			borderDashOffset: 0.0,
			borderDash: [],
			borderJoinStyle: "round",
			pointBorderColor: "rgba(0,0,0,1)",
			pointBackgroundColor: "#006c7a",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointRadius: 5,
			pointHitRadius: 0,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			shadowBlur: 15,
			shadowColor: "#006c7a",
			data: [-65, -59, 20, 30, -12, -25, -3, -69, -70, -11, 86]
		}
	]
};
const LineChart = () => (
	<React.Fragment>
		<div className={" col-6"}>
			<div className={style.controlGroup}>
				<label className={style.control + " controlCheckbox"}>
					FPS
					<input type="checkbox" checked="checked" />
					<div className={style.controlIndicator + " " + style.first} />
				</label>

				<label className={style.control + " controlCheckbox"}>
					Aspect Ratio
					<input type="checkbox" checked="checked" />
					<div className={style.controlIndicator + " second"} />
				</label>

				<label className={style.control + " controlCheckbox"}>
					Scenes per Video <input type="checkbox" checked="checked" />
					<div className={style.controlIndicator} />
				</label>
				<button className={style.buttonStyle}>Add Attribute</button>
			</div>
		</div>

		<Line
			data={lineData}
			options={{
				legend: {
					display: false
				},
				scales: {
					scaleLabel: { fontColor: "#00", fontSize: "15" },
					xAxes: [
						{
							gridLines: {
								lineWidth: 2,
								offsetGridLines: true
							}
						}
					],
					yAxes: [
						{
							position: "right",
							gridLines: {
								display: true,
								zeroLineWidth: 20,
								lineWidth: 4
							},
							ticks: {
								fontColor: "#fff",
								fontSize: 12,
								min: -100,
								max: 100,
								callback: function(value) {
									return value === 0 ? "Baseline" : "";
								}
							}
						}
					]
				},

				layout: {
					padding: {
						left: 50,
						right: 50,
						bottom: 50,
						top: 50
					}
				},
				tooltips: {
					enabled: false
				},
				plugins: {
					datalabels: {
						display: false
					}
				}
			}}
		/>
	</React.Fragment>
);
export default LineChart;
