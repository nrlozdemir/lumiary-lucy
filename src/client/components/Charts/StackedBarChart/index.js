import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import { barDataOptions } from './options'
import { withTheme } from 'ThemeContext/withTheme'

const emptyData = {
  datasets: [],
}

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw() {
    const { ctx } = this._chart
    const vm = this._view
    const strokeColor =
      this._chart.options &&
      this._chart.options.chartArea &&
      this._chart.options.chartArea.backgroundColor
    const strokeWidth =
      this._chart.options &&
      this._chart.options.chartArea &&
      this._chart.options.chartArea.barSpacing

    let left,
      right,
      top,
      bottom,
      startCorner = 0

    left = vm.x - vm.width / 2
    right = vm.x + vm.width / 2
    top = vm.y
    bottom = vm.base

    ctx.beginPath()
    ctx.fillStyle = vm.backgroundColor

    const corners = [[left, bottom], [left, top], [right, top], [right, bottom]]

    let corner = corners[(startCorner + 0) % 4]
    ctx.moveTo(corner[0], corner[1])

    for (let i = 1; i < 4; i += 1) {
      corner = corners[(startCorner + i) % 4]
      let nextCornerId = i + 1
      if (nextCornerId === 4) {
        nextCornerId = 0
      }

      const width = corners[2][0] - corners[1][0]
      const height = corners[0][1] - corners[1][1]
      const x = corners[1][0]
      const y = corners[1][1]

      ctx.moveTo(x, y)
      ctx.lineTo(x + width, y)
      ctx.lineTo(x + width, y + height)
      ctx.lineTo(x, y + height)
      ctx.lineTo(x, y)
      if (strokeWidth && strokeColor) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = strokeColor
        ctx.stroke()
      }
    }
    ctx.fill()
  },
})

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
  const { barData = emptyData, height = 300, width = 500, barSpacing } = props
  const themes = props.themeContext.colors
  return (
    <Bar
      key={Math.random()}
      data={{
        labels: !!barData && !!barData.labels && barData.labels,
        datasets:
          (!!barData &&
            !!barData.datasets &&
            barData.datasets.map((data, index) => {
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
            })) ||
          [],
      }}
      width={width}
      options={{
        ...barDataOptions,
        chartArea: {
          backgroundColor: themes.chartBackground,
          barSpacing,
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
