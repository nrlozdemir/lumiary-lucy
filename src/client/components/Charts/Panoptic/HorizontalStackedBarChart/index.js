import React from 'react';
import { HorizontalBar } from "react-chartjs-2";

import { barChartOptions } from "./options";

const HorizontalStackedBarChart = ({barData}) => (
	<HorizontalBar
		data={{
			labels: barData.labels,
			datasets: barData.datasets.map((data, index) => {
				const indexValues = data.data.map((v, i) => {
					return barData.datasets.map(d => d.data[i]);
				});

				return {
					...data,
					data: data.data.map((value, i) => {
						const totalValue = indexValues[i].reduce(
							(accumulator, currentValue) => accumulator + currentValue
						);

						return parseFloat((value / (totalValue / 100)).toFixed(2));
					})
				};
			})
		}}
		width={500}
		height={300}
		options={barChartOptions}
	/>
);

export default HorizontalStackedBarChart;
