import React from 'react'
import { doughnutOptions } from "./options"

const Doughnut = ({data}) => (
	<Doughnut
		options={doughnutOptions}
		width={124}
		height={124}
		data={{
			labels: ["Red", "Green"],
			datasets: [
				{
					data: [...data],
					borderColor: "#303a5d",
					backgroundColor: [
						"#ffffff",
						"#ffffff",
						"#ffffff",
						"#51adc0"
					],
					hoverBackgroundColor: [
						"#ffffff",
						"#ffffff",
						"#ffffff",
						"#51adc0"
					]
				}
			]
		}}
	/>
);

export default Doughnut;
