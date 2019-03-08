import React from 'react';

import style from 'Containers/Audience/style.scss';
import LineChart from 'Components/LineChart/Chart'
import Select from 'Components/Form/Select';
import { lineChartOptions, lineChartData_DatasetOptions } from "./options";
import { chartCombineDataset } from "Utils";

const lineChartData = {
	"labels": [
		"week 1",
		"week 2",
		"week 3",
		"week 4"
	],
	"datasets": [
		{
			"data": [275000, 280000, 285000, 670000]
		},
		{
			"data": [400000, 200000, 600000, 550000]
		}
	]
}

function combineChartData(chartData) {
	return chartCombineDataset(
		chartData,
		lineChartData_DatasetOptions,
		{
			beforeDraw: function(chart, easing) {
				if (
					chart.config.options.chartArea &&
					chart.config.options.chartArea.backgroundColor
				) {
					const ctx = chart.chart.ctx
					const chartArea = chart.chartArea

					ctx.save()
					ctx.fillStyle = chart.config.options.chartArea.backgroundColor
					ctx.fillRect(
						chartArea.left,
						chartArea.top,
						chartArea.right - chartArea.left,
						chartArea.bottom - chartArea.top
					)
					ctx.restore()
				}
			}
		}
	)
}

export const ChangeOverTime = props => (
	<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
		<div className={style.cardTitle + ' col-12'}>
			<span>Dominant Color Performance By Gender</span>
			<div className={style.selects}>
				<Select
					name="views"
					customClass="custom-select"
					placeholder="Select Views"
					// value={views || ''}
					value={''}
					onChange={(option) => this.handleChange(option, 'views')}
					options={[{ value: 'Views', label: 'Views' }, { value: 'Comments', label: 'Comments' }]}
				/>
				<Select
					name="platforms"
					customClass="custom-select"
					placeholder="Select Platforms"
					// value={platforms || ''}
					value={''}
					onChange={(option) => this.handleChange(option, 'platforms')}
					options={[{ value: 'All Platforms', label: 'All Platforms' }]}
				/>
				<Select
					name="platforms"
					customClass="custom-select"
					placeholder="Select Platforms"
					// value={platforms || ''}
					value={''}
					onChange={(option) => this.handleChange(option, 'platforms')}
					options={[{ value: 'All Platforms', label: 'All Platforms' }]}
				/>
			</div>
		</div>
		<div className="col-12">
			<LineChart
				backgroundColor="#242b49"
				dataSet={() => combineChartData(lineChartData)}
				width={1070}
				height={291}
				options={lineChartOptions}
			/>
		</div>
	</div>
)
