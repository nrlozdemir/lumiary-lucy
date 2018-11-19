"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
import style from "./styles.scss";

class BarChart extends React.PureComponent {
	render() {
		const {
			width,
			height,
			legend,
			options,
			barBorder,
			barBorderColor,
			yLabelsLeft,
			yLabels,
			labels
		} = this.props;
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
						borderColor: 0,
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
				beforeDraw: chartInstance => {
					const ctx = chartInstance.chart.ctx;
					const yAxis = chartInstance.chart.scales["y-axis-0"];
					ctx.globalCompositeOperation = "destination-over";
					ctx.closePath();
					const avarageLineY = yAxis.height / Math.max(...yAxis.ticksAsNumbers);
					let avarageLineStart = chartInstance.chart.config.options.scales
						.yAxes[0].display
						? 0
						: 5;
					let avarageLineEnd = chartInstance.chart.config.options.scales
						.yAxes[0].display
						? 30
						: 5;
					if (
						Array.isArray(this.props.yLabels) &&
						this.props.yLabels &&
						!yLabelsLeft
					) {
						const labelOnY = yAxis.height / this.props.yLabels.length;
						let i = 0;
						yLabels.forEach(label => {
							i += 1;
							ctx.textAlign = "end";
							ctx.fillStyle = "#FFF";
							ctx.font = "500 11px ClanOT";
							ctx.fillText(label, chartInstance.chart.width, i * labelOnY);
						});
					}
					if (barBorder) {
						ctx.strokeStyle = barBorderColor;
						ctx.strokeRect(
							(chartInstance.chart.width -
								chartInstance.chart.getDatasetMeta(0).data[0]._model.width +
								5) /
								2,
							3,
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width,
							yAxis.height
						);
					}
					ctx.beginPath();
					ctx.moveTo(
						(chartInstance.chart.width -
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width -
							avarageLineStart) /
							2,
						yAxis.height - avarageLineY * this.props.avarage
					);
					ctx.lineTo(
						(chartInstance.chart.width -
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width +
							avarageLineEnd) /
							2 +
							chartInstance.chart.getDatasetMeta(0).data[0]._model.width,
						yAxis.height - avarageLineY * this.props.avarage
					);
					ctx.lineWidth = 2;
					ctx.strokeStyle = "#55bdd5";
					ctx.stroke();
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
							!barBorder
								? Array.isArray(yLabels) && yLabels
									? style.halfLine
									: style.fullLine
								: null
						}
					/>
					{labels.map(label => {
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
	yLabels: PropTypes.array,
	barBorder: PropTypes.bool,
	barBorderColor: PropTypes.string,
	yLabelsLeft: PropTypes.bool
};

export default BarChart;
