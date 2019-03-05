import React from 'react'
import { Doughnut } from "react-chartjs-2"

import { doughnutOptions } from "./options"

const DoughnutChart = ({doughnutData, color}) => (
	<Doughnut
		options={doughnutOptions}
		width={124}
		height={124}
		data={{
			labels: ["Red", "Green"],
			datasets: [
				{
					data: [...doughnutData],
					borderColor: "#303a5d",
					backgroundColor: [
						"#ffffff",
						"#ffffff",
						"#ffffff",
						color ? color : "#51adc0"
					],
					hoverBackgroundColor: [
						"#ffffff",
						"#ffffff",
						"#ffffff",
						color ? color : "#51adc0"
					]
				}
			]
		}}
	/>
)

export default DoughnutChart
