import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

class TimeLineChart extends React.PureComponent {
	render() {
		const dataCreator = () => {
			return {
				labels: [],
				datasets: [
					{
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
					const background = chartInstance.chart.ctx;
					let gradient;

					if (this.props.isGradient) {
						gradient = background.createLinearGradient(
							0,
							0,
							ctx.canvas.clientWidth,
							0
						);
						gradient.addColorStop(0, "#a3a3a9");
						gradient.addColorStop(0.2, "#ffffff");
						gradient.addColorStop(0.55, "#11c7d8");
						gradient.addColorStop(0.75, "#0a0a81");
						gradient.addColorStop(0.9, "#f5cd00");
						gradient.addColorStop(1, "#7ba376");
					}
					background.fillStyle = this.props.isGradient
						? gradient
						: this.props.backgroundColor;
					background.fillRect(
						0,
						60,
						ctx.canvas.clientWidth,
						ctx.canvas.clientHeight - 60
					);

					ctx.beginPath();
					ctx.moveTo(0, 30);
					ctx.lineTo(ctx.canvas.clientWidth, 30);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#fff";
					ctx.stroke();

					ctx.beginPath();
					ctx.moveTo(0, 60);
					ctx.lineTo(ctx.canvas.clientWidth, 60);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#fff";
					ctx.stroke();
					let i = 0;
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

					labels.forEach(label => {
						otherDraws.font = "10px AnonymousProBold";
						otherDraws.shadowColor = "black";
						otherDraws.fillStyle = "#fff";
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
					let total = 0;

					otherDraws.font = "12px ClanOT";
					otherDraws.fillStyle = "#fff";
					otherDraws.shadowColor = "black";
					otherDraws.shadowBlur = 6;
					otherDraws.shadowOffsetX = 2;
					otherDraws.shadowOffsetY = 2;
					this.props.datas.forEach((data, i) => {
						otherDraws.fillText(
							`Scene ${i}`,
							(ctx.canvas.clientWidth * total) / 100 +
								((ctx.canvas.clientWidth * data) / 100) * 0.5 -
								20,
							(chartInstance.chart.height / 2) * 1.4
						);
						total += data;
						ctx.beginPath();
						ctx.moveTo((ctx.canvas.clientWidth * total) / 100, 30);
						ctx.lineTo((ctx.canvas.clientWidth * total) / 100, 260);
						ctx.lineWidth = 1;
						ctx.strokeStyle = this.props.color;
						ctx.stroke();
					});

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
										stepSize: 20,
										barPercentage: 1
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
	backgroundColor: PropTypes.string,
	datas: PropTypes.array,
	color: PropTypes.string
};

export default TimeLineChart;
