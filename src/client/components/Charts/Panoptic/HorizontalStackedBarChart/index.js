import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

import { barChartOptions } from './options'

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        var ctx = chart.chart.ctx
        var chartArea = chart.chartArea

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
    },
  },
]

const HorizontalStackedBarChart = ({ barData }) => (
  <HorizontalBar
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
    width={500}
    height={340}
    options={barChartOptions}
    plugins={plugins}
  />
)

export default HorizontalStackedBarChart
