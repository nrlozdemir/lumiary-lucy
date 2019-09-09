import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { customChartToolTip, ucfirst } from 'Utils'
import { percentageManipulation } from 'Utils/datasets'
import { withTheme } from 'ThemeContext/withTheme'
import { modifyTooltip } from 'Utils/tooltip'

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
      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.left, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.top)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
  },
]

const HorizontalStackedBarChart = (props) => {
  const {
    barData = {},
    options,
    width,
    height,
    values,
    horizontalStackedBarDataOriginal = {},
    stadiumValues,
    tooltipType = false,
  } = props
  const { colors } = props.themeContext

  console.log('component.props', props)

  const { datasets: barDatasets = [] } = barData
  if (barDatasets.length === 0) {
    return null
  }
  const originalBarData = barDatasets.reduce((accumulator, item) => {
    accumulator[item.label] = item
    return accumulator
  }, {})

  const stadiumValuesMapped = stadiumValues.reduce((accumulator, item) => {
    accumulator[item.title] = item
    return accumulator
  }, {})

  const bucketLabels =
    (!!horizontalStackedBarDataOriginal &&
      !!Object.values(horizontalStackedBarDataOriginal).length &&
      Object.keys(Object.values(horizontalStackedBarDataOriginal)[0])) ||
    []

  const labels = Object.keys(horizontalStackedBarDataOriginal).sort()

  const datasets = labels.map((label, i) => {
    const thisBucketLabel = bucketLabels[i]

    return {
      label,
      backgroundColor:
        !!stadiumValuesMapped[thisBucketLabel] &&
        stadiumValuesMapped[thisBucketLabel].color,
      borderColor: colors.chartBackground && colors.chartBackground,
      borderWidth: 2,
      //here we set border right for eact item in a row but exept only last one
      //the calculation below is for, we should prevent setting border if we have
      //just one data and it will be last item at the same time
      borderWidth: function(data) {
        if (data.datasetIndex !== data.dataset.data.length - 1) {
          const filteredArr = reorderDatasetByLabel[data.dataIndex].filter(
            (item, index) => index !== data.datasetIndex
          )
          const isOnlyOneData = filteredArr.every((item) => item === 0)
          if (!isOnlyOneData) {
            return {
              right: 2,
            }
          }
        }
      },
      // borderSkipped: 'left',
      data: labels.map((label) => {
        return horizontalStackedBarDataOriginal[label][thisBucketLabel]
      }),
    }
  })
  let reorderDatasetByLabel = []
  if (datasets && !!datasets.length) {
    datasets.forEach((item) => {
      item.data.forEach((data, i) => {
        if (!reorderDatasetByLabel[i]) {
          reorderDatasetByLabel.push([])
        }
        reorderDatasetByLabel[i].push(data)
      })
    })
  }

  return (
    <HorizontalBar
      key={Math.random()}
      data={{
        datasets,
        labels,
      }}
      width={width}
      height={height}
      options={{
        ...options,
        tooltips:
          (!!tooltipType &&
            (tooltipType === 'basic' &&
              customChartToolTip(colors, {
                callbacks: {
                  title: () => '',
                  label: function(tooltipItem, data) {
                    const { datasetIndex } = tooltipItem
                    const count =
                      (data &&
                        data.datasets &&
                        data.datasets[datasetIndex] &&
                        data.datasets[datasetIndex].data[
                          tooltipItem['index']
                        ]) ||
                      ''
                    const name =
                      (data && values && values[datasetIndex].title) || ''
                    return `${percentageManipulation(count) || 0}% ${!!name &&
                      `| ${name}`}`
                  },
                },
              }))) ||
          (tooltipType === 'extended' &&
            modifyTooltip(
              {
                template: 'HorizontalStackedBarChartTemplate',
                data: {
                  datasets,
                  labels,
                  properties: stadiumValues.map((value) =>
                    ucfirst(value.title)
                  ),
                },
                options: {
                  background: colors.tooltipBackground,
                  textColor: colors.tooltipTextColor,
                  caretColor: colors.tooltipBackground,
                },
              },
              {
                mode: 'single',
              }
            )),
        chartArea: {
          backgroundColor: colors.chartBackground,
        },
        scales: {
          xAxes: [
            {
              ...options.scales.xAxes[0],
              ticks: {
                ...options.scales.xAxes[0].ticks,
                fontColor: colors.textColor,
                callback: (value, index, values) => {
                  if (index === 0) {
                    return ' '.repeat(3) + value + '%'
                  }
                  if (index === values.length - 1) {
                    return value + '%' + ' '.repeat(7)
                  }
                  return value + '%'
                },
              },
              gridLines: {
                ...options.scales.xAxes[0].gridLines,
                color: colors.chartStadiumBarBorder,
              },
            },
          ],
          yAxes: [
            {
              ...options.scales.yAxes[0],
              ticks: {
                ...options.scales.yAxes[0].ticks,
                fontColor: colors.textColor,
              },
              gridLines: {
                ...options.scales.yAxes[0].gridLines,
                color: colors.chartStadiumBarBorder,
                zeroLineColor: colors.chartStadiumBarBorder,
              },
            },
          ],
        },
      }}
      plugins={plugins}
    />
  )
}

export default withTheme(HorizontalStackedBarChart)
