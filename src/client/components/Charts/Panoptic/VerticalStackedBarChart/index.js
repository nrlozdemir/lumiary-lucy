import React from 'react'
import { Bar } from "react-chartjs-2";
import { randomKey } from 'Utils/index'


import { stackedChartOptions } from "./options";

class VerticalStackedBarChart extends React.PureComponent{

	datasetKeyProvider() {
		return randomKey(5)
	}

	render (){
		const { data } = this.props;
		return (
			<Bar
				width={550}
				height={300}
				backgroundColor="#242b49"
				data={data}
				datasetKeyProvider={this.datasetKeyProvider}
				options={{
					...stackedChartOptions,
				}}
			/>
		)
	}
}

export default VerticalStackedBarChart
