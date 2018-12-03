import React from "react";
import PropTypes from "prop-types";
import {
	Line
} from "react-chartjs-2";

class LineChart extends React.PureComponent {
	render() {
		const data = {
			labels: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July"
			],
			datasets: [{
					label: "My First dataset",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [6, 4, 2, 4, 2, 2, 0, 4, 2, 6, 6, 0, 2, 2, 4, 6, 2, 0, 4, 2, 4]
				},
				{
					label: "Second Set",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [6, 4, 2, 4, 2, 2, 0, 4, 2, 6, 6, 0, 2, 2, 4, 6, 2, 0, 4, 2, 4]
				}
			]
		};

		const {
			width,
			height,
			options
		} = this.props;

		return ( <
			div >
			<
			Line data = {
				data
			}
			width = {
				width
			}
			height = {
				height
			}
			options = {
				options
			}
			/> <
			/div>
		);
	}
}

LineChart.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	data: PropTypes.array,
	options: PropTypes.object
};

export default LineChart;
