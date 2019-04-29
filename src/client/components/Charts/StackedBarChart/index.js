import React from 'react'
import { Bar } from 'react-chartjs-2'
import { barDataOptions } from './options'

const StackedBarChart = ({
    barData,
    height = 300,
    width = 500,
  }) => {
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
  return (
    <Bar
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
                (accumulator, currentValue) => accumulator + currentValue
              )

              return parseFloat((value / (totalValue / 100)).toFixed(2))
            }),
          }
        }),
      }}
      width={width}
      options={{ ...barDataOptions }}
      plugins={plugins}
      height={height}
    />
  )
}

export default StackedBarChart
