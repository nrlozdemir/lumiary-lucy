import React from 'react'
import { Radar } from "react-chartjs-2";

import { radarChartOptions } from "./options";

const RadarChart = ({ data }) => (
	<Radar
		data={data}
		height={250}
		options={{
			...radarChartOptions,
			pointLabels: {
				...radarChartOptions.pointLabels,
				fontColor: data.labels.map(lbl => lbl)
			},
		}}
	/>
);

export default RadarChart
