import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix, customChartToolTip, ucfirst } from 'Utils'

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      // Run function when before draw chart
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function(dataset, i) {
        const meta = chart.controller.getDatasetMeta(i)
        meta.data.forEach(function(bar, index) {
          if (
            !!chart.config.data.labels &&
            !!chart.config.data.labels.length &&
            !!!!chart.config.data.labels[index]
          ) {
            const color = chart.config.data.labels[index].color
            const selected = chart.config.data.labels[index].selected
            const pointLabelPosition = bar._scale.getPointPosition(
              index,
              bar._scale.getDistanceFromCenterForValue(bar._scale.max) +
                (selected ? 36 : 30)
            )

            ctx.beginPath()
            // draw a circle at that point
            ctx.arc(
              pointLabelPosition.x,
              pointLabelPosition.y,
              selected ? 14 : 8,
              0,
              2 * Math.PI,
              false
            )

            if (selected) {
              ctx.lineWidth = 1
              ctx.shadowBlur = 4
              ctx.shadowOffsetY = 2
              ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
              ctx.strokeStyle = chart.options.scale.pointLabels
              ctx.stroke()
              ctx.shadowBlur = 0
              ctx.shadowOffsetY = 0
            }

            ctx.fillStyle = color
            ctx.fill()
            ctx.closePath()
          }
        })
      })
    },
    beforeDatasetsDraw: function(chart) {
      // Run function when before apply the datasets draw chart
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function(dataset, i) {
        const meta = chart.controller.getDatasetMeta(i)
        meta.data.forEach(function(bar, index) {
          if (
            !!chart.config.data.labels &&
            !!chart.config.data.labels.length &&
            !!!!chart.config.data.labels[index]
          ) {
            const pointPosition = bar._scale.getPointPosition(
              index,
              bar._scale.getDistanceFromCenterForValue(bar._scale.max) + 13
            )
            ctx.beginPath()
            ctx.moveTo(pointPosition.x, pointPosition.y)
            ctx.lineTo(chart.scale.xCenter, chart.scale.yCenter)
            ctx.lineWidth = 1
            ctx.strokeStyle = chart.options.scale.angleLines.customColor
            ctx.stroke()
            ctx.closePath()
          }
        })
      })
    },
  },
]

const RadarChart = (props) => {
  const { data } = props
  const themes = props.themeContext.colors
  let parsedData = data || {}
  let maxTicksStepLimit = 100000
  let stepSize = 25000

  const hasData =
    !!parsedData && !!parsedData.datasets && !!parsedData.datasets[0]

  if (hasData) {
    parsedData.datasets[0].backgroundColor = themes.chartBackgroundColor
    parsedData.datasets[0].pointBackgroundColor =
      themes.chartPointBackgroundColor
    parsedData.datasets[0].pointBorderColor = themes.chartPointBorderColor
    parsedData.datasets[0].pointBorderWidth = 4

    const max = Math.max(...parsedData.datasets[0].data)

    stepSize = max / 4

    maxTicksStepLimit = max
  }

  const { labels = [] } = parsedData
  const colorOrder = {
    Red: {},
    'Orange-Red': {},
    Orange: {},
    'Yellow-Orange': {},
    Yellow: {},
    'Yellow-Green': {},
    Green: {},
    'Blue-Green': {},
    Blue: {},
    'Blue-Purple': {},
    Purple: {},
    'Red-Purple': {},
  }

  labels.forEach((label) => {
    if (colorOrder[label.name]) {
      colorOrder[label.name] = label
    }
  })

  const useAllVals = true

  const thisData = Object.keys(colorOrder).reduce(
    (accumulator, key) => {
      let count = colorOrder[key].count || 0
      if (count !== 0 || useAllVals) {
        accumulator.dataKeys.push(key)
        accumulator.dataValues.push(count || 0)
      }

      return accumulator
    },
    {
      dataKeys: [],
      dataValues: [],
    }
  )

  const theData =
    labels.length === 0
      ? {}
      : {
          datasets: [
            {
              ...parsedData.datasets[0],
              data: thisData.dataValues,
            },
          ],
          labels: thisData.dataKeys.map((color) => {
            return colorOrder[color]
          }),
        }

  return (
    <Radar
      data={theData}
      plugins={plugins}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: 40,
        },
        tooltips: customChartToolTip(themes, {
          callbacks: {
            title: () => '',
            label: function(tooltipItem, data) {
              const count =
                (data &&
                  data.labels &&
                  data.labels[tooltipItem['index']] &&
                  data.labels[tooltipItem['index']].count) ||
                0
              const metric =
                (data &&
                  data.datasets &&
                  data.datasets[0] &&
                  data.datasets[0].metric) ||
                ''
              const name =
                data &&
                data.labels &&
                data.labels[tooltipItem['index']] &&
                data.labels[tooltipItem['index']].name
              return `${metricSuffix(count) || 0}% ${ucfirst(metric) ||
                ''} ${!!name && `| ${name}`}`
            },
          },
        }),
        plugins: {
          datalabels: false,
        },
        scale: {
          gridLines: {
            display: true,
            lineWidth: 25,
            color: themes.bodyBackground,
          },
          pointLabels: {
            callback: function(value, index, values) {
              return ''
            },
            lineHeight: 4,
            borderColor: themes.textColor,
          },
          ticks: {
            stepSize,
            callback: function(value) {
              return metricSuffix(value)
            },
            backdropColor: 'transparent',
            fontSize: 10,
            fontFamily: 'ClanOTNews',
            fontColor: themes.chartTickColor,
            display: true,
            maxTicksLimit: 5,
            min: 0,
            max: maxTicksStepLimit,
            beginAtZero: true,
          },
          angleLines: {
            display: false,
            customColor: themes.chartAngleLineColor,
          },
        },
      }}
    />
  )
}

export default withTheme(RadarChart)
