import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { customChartToolTip } from 'Utils'
import { percentageManipulation } from 'Utils/datasets'
import { withTheme } from 'ThemeContext/withTheme'

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
  } = props
  const { colors } = props.themeContext

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
      borderColor:
        !!stadiumValuesMapped[thisBucketLabel] &&
        stadiumValuesMapped[thisBucketLabel].color,
      borderWidth: 1,
      data: labels.map((label) => {
        return horizontalStackedBarDataOriginal[label][thisBucketLabel]
      }),
    }
  })

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
        tooltips: customChartToolTip(colors, {
          callbacks: {
            title: () => '',
            label: function(tooltipItem, data) {
              const { datasetIndex } = tooltipItem
              const count =
                (data &&
                  data.datasets &&
                  data.datasets[datasetIndex] &&
                  data.datasets[datasetIndex].data[tooltipItem['index']]) ||
                ''
              const name = (data && values && values[datasetIndex].title) || ''
              return `${percentageManipulation(count) || 0}% ${!!name &&
                `| ${name}`}`
            },
          },
        }),
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
