"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import style from "./styles.scss";

class BarChart extends React.PureComponent {
	render() {
		const { width, height, legend, options } = this.props;
		const dataCreator = canvas => {
			const ctx = canvas.getContext("2d");
			const gradient = ctx.createLinearGradient(
				30,
				0,
				0,
				ctx.canvas.height + 30 - Math.max(...this.props.data)
			);
			if (this.props.isGradient) {
				this.props.gradientColors.forEach((color, i) => {
					gradient.addColorStop(i, color);
				});
			}
			return {
				labels: [],
				datasets: [
					{
						backgroundColor: this.props.isGradient ? gradient : "#FFF",
						borderColor: "rgba(255,99,132,0)",
						borderWidth: 0,
						hoverBackgroundColor: this.props.isGradient ? gradient : "#FFF",
						hoverBorderColor: "rgba(255,99,132,0)",
						data: this.props.data
					}
				]
			};
		};
		const plugins = [
			{
				afterDraw: chartInstance => {
					const ctx = chartInstance.chart.ctx;
					const yAxis = chartInstance.chart.scales["y-axis-0"];
					const avarageLineY =
						yAxis.maxHeight / Math.max(...yAxis.ticksAsNumbers);
					ctx.beginPath();
					ctx.moveTo(
						(chartInstance.chart.width -
							10 -
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width) /
							2,
						yAxis.maxHeight - avarageLineY * this.props.avarage
					);
					ctx.lineTo(
						(chartInstance.chart.width -
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width +
							10) /
							2 +
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width,
						yAxis.maxHeight - avarageLineY * this.props.avarage
					);
					ctx.lineWidth = 2;
					ctx.strokeStyle = "#55bdd5";
					ctx.stroke();

					if (Array.isArray(this.props.yLabels) && this.props.yLabels) {
						const labelOnY = yAxis.maxHeight / this.props.yLabels.length;
						this.props.yLabels.forEach((label, i) => {
							i = i + 1;
							ctx.textAlign = "end";
							ctx.fillStyle = "#FFF";
							ctx.font = "500 11px ClanOT";
							ctx.fillText(label, chartInstance.chart.width, i * labelOnY);
						});
					}
				}
			}
		];

		return (
			<div className={style.barContainer}>
				<Bar
					data={dataCreator}
					width={width}
					height={height}
					legend={legend}
					plugins={plugins}
					options={options}
				/>
				<div className={style.xAxis}>
					<div
						className={
							Array.isArray(this.props.yLabels) && this.props.yLabels
								? style.halfLine
								: style.fullLine
						}
					/>
					{this.props.labels.map(label => {
						let words = label.split(" ");
						return (
							<React.Fragment key={label}>
								<h3 className={style.firstLabel} key={label}>
									{words[0]}
								</h3>
								<h3 className={style.secondLabel}>{words[1]}</h3>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		);
	}
}

BarChart.propTypes = {
	barName: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	legend: PropTypes.bool,
	options: PropTypes.object,
	data: PropTypes.array,
	isGradient: PropTypes.bool,
	gradientColors: PropTypes.array,
	labels: PropTypes.array,
	yLabels: PropTypes.array
};

export default BarChart;
