"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

class TimeLineChart extends React.PureComponent {
	render() {
		const dataCreator = canvas => {
			const ctx = canvas.getContext("2d");
			let gradient;
			// Mocks //
			if (this.props.isGradient) {
				gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
				gradient.addColorStop(0, "#a3a3a9");
				gradient.addColorStop(0.2, "#ffffff");
				gradient.addColorStop(0.55, "#11c7d8");
				gradient.addColorStop(0.75, "#0a0a81");
				gradient.addColorStop(0.9, "#f5cd00");
				gradient.addColorStop(1, "#7ba376");
			}
			// Mocks //
			return {
				labels: [],
				datasets: [
					{
						fill: true,
						lineTension: 0.1,
						backgroundColor: this.props.isGradient
							? gradient
							: this.props.backgroundColor,
						borderColor: "rgba(75,192,192,0)",
						borderCapStyle: "butt",
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: "miter",
						pointBorderColor: "rgba(75,192,192,1)",
						pointBackgroundColor: "#fff",
						pointBorderWidth: 0,
						pointHoverRadius: 0,
						pointHoverBackgroundColor: "rgba(75,192,192,1)",
						pointHoverBorderColor: "rgba(220,220,220,1)",
						pointHoverBorderWidth: 0,
						pointRadius: 0,
						pointHitRadius: 0,
						data: [
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90,
							90
						]
					}
				]
			};
		};
		const plugins = [
			{
				afterDraw: chartInstance => {
					const ctx = chartInstance.chart.ctx;
					const otherDraws = chartInstance.chart.ctx;
					ctx.beginPath();
					ctx.moveTo(10, 30);
					ctx.lineTo(ctx.canvas.clientWidth, 30);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#fff";
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(10, 60);
					ctx.lineTo(ctx.canvas.clientWidth, 60);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#fff";
					ctx.stroke();
					let i = 10;
					// Mocks //
					const labels = [
						"0:0",
						"0:10",
						"0:20",
						"0:30",
						"0:40",
						"0:50",
						"1",
						"1:10",
						"1:20",
						"1:30",
						"1:40",
						"1:50",
						"2",
						"2:10",
						"2:20",
						"2:30",
						"2:40",
						"2:50",
						"3"
					];
					let avarage = chartInstance.chart.width / labels.length;
					otherDraws.font = "12px ClanOT";
					otherDraws.shadowColor = "black";
					otherDraws.shadowBlur = 6;
					otherDraws.shadowOffsetX = 2;
					otherDraws.shadowOffsetY = 2;
					otherDraws.fillText(
						"Scene 1",
						avarage * 2,
						(chartInstance.chart.height / 2) * 1.4
					);
					otherDraws.fillText(
						"Scene 2",
						avarage * 5,
						(chartInstance.chart.height / 2) * 1.4
					);
					otherDraws.fillText(
						"Scene 3",
						avarage * 10,
						(chartInstance.chart.height / 2) * 1.4
					);
					otherDraws.fillText(
						"Scene 4",
						avarage * 16,
						(chartInstance.chart.height / 2) * 1.4
					);

					labels.forEach(label => {
						otherDraws.font = "10px AnonymousProBold";
						otherDraws.shadowColor = "black";
						otherDraws.shadowBlur = 0;
						otherDraws.shadowOffsetX = 0;
						otherDraws.shadowOffsetY = 0;
						ctx.fillText(label, i - 5, 12);
						ctx.beginPath();
						ctx.moveTo(i, 70);
						ctx.lineTo(i, 20);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(i + avarage * 0.3, 60);
						ctx.lineTo(i + avarage * 0.3, 30);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(i + avarage * 0.7, 60);
						ctx.lineTo(i + avarage * 0.7, 30);
						ctx.stroke();

						i = i + avarage;
					});

					ctx.beginPath();
					ctx.moveTo(avarage * 4, 30);
					ctx.lineTo(avarage * 4, 260);
					ctx.lineWidth = 3;
					ctx.strokeStyle = "#fff";
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(avarage * 7, 30);
					ctx.lineTo(avarage * 7, 260);
					ctx.lineWidth = 3;
					ctx.strokeStyle = "#fff";
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(avarage * 12, 30);
					ctx.lineTo(avarage * 12, 260);
					ctx.lineWidth = 3;
					ctx.strokeStyle = "#fff";
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(ctx.canvas.clientWidth, 70);
					ctx.lineTo(ctx.canvas.clientWidth, 20);
					ctx.stroke();
				}
			}
		];

		return (
			<div>
				<Line
					data={dataCreator}
					width="500"
					height="100"
					plugins={plugins}
					options={{
						layout: {
							padding: 10
						},
						legend: {
							display: false
						},
						plugins: {
							datalabels: {
								display: false
							}
						},
						tooltips: {
							enabled: false
						},
						scales: {
							scaleLabel: {
								display: true,
								lineHeight: 2,
								fontColor: "#fff",
								fontSize: 30
							},
							yAxes: [
								{
									display: false,
									gridLines: {
										display: false
									},
									ticks: {
										min: 0,
										max: 120,
										stepSize: 20
									}
								}
							],
							xAxes: [
								{
									zeroLineWidth: 0,
									position: "top",
									gridLines: {
										display: false
									}
								}
							]
						}
					}}
				/>
			</div>
		);
	}
}

TimeLineChart.propTypes = {
	barName: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	legend: PropTypes.bool,
	options: PropTypes.object,
	data: PropTypes.array,
	isGradient: PropTypes.bool,
	gradientColors: PropTypes.array,
	labels: PropTypes.array,
	backgroundColor: PropTypes.string
};

export default TimeLineChart;
