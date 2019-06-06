import React from 'react'
import style from './style.scss'
import classnames from 'classnames'
import StackedPercentageChart from 'Components/Charts/StackedPercentageChart'
import {createDataset} from './dummyData'

const PercentageBarGraph = ({
  percentage,
  disableLabels = false,
  color,
  id,
  width = 238,
  height = 44,
  barWidth = 3,
	barSpaceWidth = 2,
	percentageDataSet
}) => {
	const percentageData = (!percentageDataSet) 
	? {
    "datasets": [{
      "data": createDataset(percentage)
    }]
	} 
	: percentageDataSet
	
  return (
		<div className={style.percentageContainer}>
			{!disableLabels && <div className={style.percentage}>{percentage}</div>}
			<div
				className={classnames(style.percentageGraph, {
					[style.noLabel]: disableLabels,
				})}
			>
			<StackedPercentageChart
				key={Math.random()}
				width={width}
				height={height}
				chartType='percentageGraph'
				barWidth={barWidth}
				barSpaceWidth={barSpaceWidth}
				dataSet={
					{
						labels: percentageData.datasets[0].data,
						datasets: percentageData.datasets
					}
				}
				removeTooltip={true}
				removePointRadius={true}
				xAxesFlatten={false}
				flattenFirstSpace={0}
				flattenLastSpace={0}
				options={{
					responsive: false,
					color: color,
					layout: {
						padding: {
							bottom: -10
						}
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
									lineWidth: 1,
									drawBorder: false,
									drawTicks: false
								},
								ticks: {
									display: false,
									beginAtZero: true,
									padding: 0,
									stepSize: 1
								}
							}
						],
						yAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
									drawTicks: false
								},
								ticks: {
									display: false,
									beginAtZero: true,
									padding: 0,
									max: 100,
									stepSize: 10,
								}
							}
						]
					}
				}}
			/>
			</div>
			{!disableLabels && <div className={style.cvScoreLabel}>CV Score</div>}
		</div>
  )
}

export default PercentageBarGraph
