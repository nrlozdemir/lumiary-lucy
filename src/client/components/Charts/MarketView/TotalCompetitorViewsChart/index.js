import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDurationOptions } from './options'

const TotalCompetitorViewsChart = ({
  barDurationData,
  height = 290,
	width = 200,
	tickOptions = {},
}) => {
  const chartOptions = {
    ...barDurationOptions,
    scales: {
      ...barDurationOptions.scales,
      yAxes: [
        {
          ...barDurationOptions.scales.yAxes[0],
          ticks: {
            ...barDurationOptions.scales.yAxes[0].ticks,
            ...tickOptions,
					},
				}
			]
		}
	};

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
        ctx.strokeStyle =
          configX[0].gridLines.color ||
          Chart.defaults.bar.scales.xAxes[0].gridLines.color ||
          '#5a6386'
        ctx.lineWidth =
          configX[0].gridLines.lineWidth ||
          Chart.defaults.bar.scales.xAxes[0].gridLines.lineWidth ||
          1

        ctx.beginPath()
        ctx.moveTo(chart.chartArea.right, chart.chartArea.top)
        ctx.lineTo(chart.chartArea.right, chart.chartArea.bottom)
        ctx.stroke()

        //Restore the rendering context state
        ctx.restore()
      },
    },
	]

  return (
    <Bar
      data={barDurationData}
			height={height}
			width={width}
      options={{ ...chartOptions }}
      plugins={plugins}
    />
  )
}

export default TotalCompetitorViewsChart
