import React from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import { barDataOptions } from './options'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix, customChartToolTip } from 'Utils'
import { percentageManipulation } from 'Utils/datasets'
import { modifyTooltip } from 'Utils/tooltip'
import { beforeDrawFunc } from 'Utils/chart-plugins'

const emptyData = {
  datasets: [],
}

const rectProto = Chart.elements.Rectangle.prototype.draw

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw() {
    if (this._chart.config.type !== 'bar') {
      return rectProto.apply(this, arguments)
    }

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

const StackedBarChart = (props) => {
  const {
    barData = emptyData,
    height = 300,
    width = 500,
    barSpacing,
    datalabels = false,
    xGridDisplay,
    hideLabels = false,
    metricTitle = false,
    tooltipType = 'basic',
    tooltipTemplate = false,
    property = false,
    platform = false,
    metric = false,
  } = props

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

                  return percentageManipulation(
                    Math.round(value / (totalValue / 100))
                  )
                }),
              }
            })) ||
          [],
      }}
      width={width}
      options={{
        ...barDataOptions,
        tooltips:
          (!!tooltipType &&
            (tooltipType === 'basic' &&
              customChartToolTip(themes, {
                callbacks: {
                  title: (tooltipItem, data) => {
                    return (
                      metricTitle !== false &&
                      !!tooltipItem &&
                      !!tooltipItem[0] &&
                      !!metricTitle[tooltipItem[0]['index']] &&
                      metricTitle[tooltipItem[0]['index']]
                    )
                  },
                  label: function(tooltipItem, data) {
                    const count =
                      (data &&
                        data.datasets &&
                        data.datasets[tooltipItem['datasetIndex']] &&
                        data.datasets[tooltipItem['datasetIndex']].data[
                          tooltipItem['index']
                        ]) ||
                      ''
                    const name =
                      (data &&
                        data.datasets &&
                        data.datasets[tooltipItem['datasetIndex']] &&
                        data.datasets[tooltipItem['datasetIndex']].label) ||
                      ''
                    return `${count || 0}% ${!!name && `| ${name}`}`
                  },
                },
              }))) ||
          (tooltipType === 'extended' &&
            modifyTooltip({
              template: tooltipTemplate || 'VerticalStackedBarChartTemplate',
              data: {
                ...barData,
                property: !!property && property,
                platform: !!platform && platform,
                metric: !!metric && metric,
              },
              options: {
                background: themes.tooltipBackground,
                textColor: themes.tooltipTextColor,
                caretColor: themes.tooltipBackground,
              },
            })),

        chartArea: {
          backgroundColor: themes.chartBackground,
          barSpacing,
        },
        ...(datalabels
          ? {
              plugins: {
                datalabels: {
                  formatter: (value, { datasetIndex, dataIndex }) => {
                    const ogValue =
                      !!barData &&
                      !!barData.datasets &&
                      !!barData.datasets[datasetIndex] &&
                      !!barData.datasets[datasetIndex].data &&
                      !!barData.datasets[datasetIndex].data.length &&
                      !!barData.datasets[datasetIndex].data[dataIndex]
                        ? barData.datasets[datasetIndex].data[dataIndex]
                        : value

                    return metricSuffix(ogValue)
                  },
                  align: 'center',
                  anchor: 'center',
                  color: '#fff',
                  font: {
                    size: 14,
                    family: 'ClanOTBold',
                  },
                },
              },
            }
          : {}),
        scales: {
          xAxes: [
            {
              ...barDataOptions.scales.xAxes[0],
              ticks: {
                ...barDataOptions.scales.xAxes[0].ticks,
                fontColor: themes.textColor,
                padding: 17,
                display: !hideLabels,
              },
              gridLines: {
                ...barDataOptions.scales.xAxes[0].gridLines,
                color: themes.chartStadiumBarBorder,
                display: xGridDisplay || false,
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
      plugins={[
        beforeDrawFunc({
          createBackground: true,
          strokeStyle: true,
        }),
      ]}
      height={height}
    />
  )
}

export default withTheme(StackedBarChart)
