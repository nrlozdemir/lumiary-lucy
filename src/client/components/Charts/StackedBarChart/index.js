import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDataOptions } from './options'
import { withTheme } from 'ThemeContext/withTheme'

const plugins = [
	{
		beforeDraw: function(chart, easing) {
			let ctx = chart.chart.ctx
			let chartArea = chart.chartArea
			if (
				chart.config.options.chartArea &&
				chart.config.options.chartArea.backgroundColor
				) {
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

					let configX = chart.config.options.scales.xAxes
					//Save the rendering context state
					ctx.save()
					ctx.strokeStyle = configX[0].gridLines.color
					ctx.lineWidth = configX[0].gridLines.lineWidth

					ctx.beginPath()
					ctx.moveTo(chart.chartArea.right, chart.chartArea.top)
					ctx.lineTo(chart.chartArea.right, chart.chartArea.bottom)
					ctx.stroke()

					//Restore the rendering context state
					ctx.restore()
				},
			},
		]

		const StackedBarChart = (props) => {
			const { barData, height = 300, width = 500 } = props
			const themes = props.themeContext.colors
			return (
				<Bar
				key={Math.random()}
				data={{
					labels: barData.labels,
					datasets: barData.datasets.map((data, index) => {
						const indexValues = data.data.map((v, i) => {
							return barData.datasets.map((d) => d.data[i])
						})
						return {
							...data,
							data: data.data.map((value, i) => {
								const totalValue = indexValues[i].reduce(
									(accumulator, currentValue) => accumulator + currentValue)
									return parseFloat((value / (totalValue / 100)).toFixed(2))
								}),
								borderColor: props.barSpacing && themes.chartBackground,
								borderWidth: props.barSpacing && data.data.map((value, i) => {
									return {
										top: (index !== 3) ? props.barSpacing : 0,
										right: 0,
										bottom: 0,
										left: 0
									}
								})
							}
						}),
					}}
					width={width}
					options={{
						...barDataOptions,
						chartArea: {
							backgroundColor: themes.chartBackground,
						},
						scales: {
							xAxes: [
								{
									...barDataOptions.scales.xAxes[0],
									ticks: {
										...barDataOptions.scales.xAxes[0].ticks,
										fontColor: themes.textColor,
									},
									gridLines: {
										...barDataOptions.scales.xAxes[0].gridLines,
										color: themes.chartStadiumBarBorder,
									},
								},
							],
							yAxes: [
								{
									...barDataOptions.scales.yAxes[0],
									ticks: {
										...barDataOptions.scales.yAxes[0].ticks,
										fontColor: themes.textColor,
									},
									gridLines: {
										...barDataOptions.scales.yAxes[0].gridLines,
										color: themes.chartStadiumBarBorder,
										zeroLineColor: themes.chartStadiumBarBorder,
									},
								},
							],
						},
					}}
					plugins={plugins}
					height={height}
					/>
					)
				}

				export default withTheme(StackedBarChart)
