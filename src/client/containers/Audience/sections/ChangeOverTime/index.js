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
			<span>Change Over Time By Property</span>
      <div className={"d-flex align-items-center justify-space-between " + style.headerLabel}>
        <div className="d-flex align-items-center mr-32">
          <span className={style.redRound} />
          <p>Male</p>
        </div>
        <div className="d-flex align-items-center mr-32">
          <span className={style.duskRound} />
          <p>Female</p>
        </div>
      </div>
			<div className={style.selects}>
				<Select
					name="views"
					customClass="custom-select"
					placeholder="Pacing - Slow"
					onChange={console.log}
					options={[{ value: 'Pacing - Slow', label: 'Pacing - Slow' }]}
				/>
				<Select
					name="platforms"
					customClass="custom-select"
					placeholder="Likes"
					onChange={console.log}
					options={[{ value: 'Likes', label: 'Likes' }]}
				/>
				<Select
					name="platforms"
					customClass="custom-select"
					placeholder="Past Month"
					onChange={console.log}
					options={[{ value: 'Past Month', label: 'Past Month' }]}
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
