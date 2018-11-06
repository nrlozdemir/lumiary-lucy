"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";
// import style from "./styles.scss";

class BarChart extends React.PureComponent {
	render() {
		const { width, height, legend, options } = this.props;
		const dataCreator = canvas => {
			const ctx = canvas.getContext("2d");
			const gradient = ctx.createLinearGradient(10, 0, 0, 100);
			if (this.props.isGradient) {
				console.log(this.props.gradientColors);
				this.props.gradientColors.forEach((color, i) => {
					gradient.addColorStop(i, color);
				});
			}
			return {
				labels: this.props.labels,
				datasets: [
					{
						backgroundColor: this.props.isGradient ? gradient : "#FFF",
						borderColor: "rgba(255,99,132,0)",
						borderWidth: 1,
						hoverBackgroundColor: this.props.isGradient ? gradient : "#FFF",
						hoverBorderColor: "rgba(255,99,132,0)",
						data: this.props.data
					}
				]
			};
		};
		return (
			<Bar
				data={dataCreator}
				width={width}
				height={height}
				legend={legend}
				options={options}
			/>
		);
	}
}

BarChart.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	legend: PropTypes.bool,
	options: PropTypes.object,
	data: PropTypes.array,
	isGradient: PropTypes.bool,
	gradientColors: PropTypes.array,
	labels: PropTypes.array
};

export default BarChart;
