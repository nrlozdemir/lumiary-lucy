import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix } from 'Utils'

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
  const { data, width = 460, height = 460 } = props
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

    maxTicksStepLimit = parsedData.datasets[0].data.every(
      (n) => n <= 100000 // 100k
    )
      ? 100000 // 100k
      : max // any big number than 100k
  }

  return (
    <Radar
      data={parsedData}
      width={width}
      height={height}
      plugins={plugins}
      options={{
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        // layout: {
        //   padding: 30,
        // },
        tooltips: {
          backgroundColor: '#fff',
          cornerRadius: 6,
          titleFontColor: '#000',
          mode: 'point',
          titleFontFamily: 'ClanOTBold',
          bodyFontColor: '#000',
          yAlign: 'bottom',
          xAlign: 'center',
          displayColors: false,
          callbacks: {
            title: () => '',
            label: function(tooltipItem, data) {
              return data.labels[tooltipItem['index']].name
            },
            afterLabel: function(tooltipItem, data) {
              return `${metricSuffix(
                data.labels[tooltipItem['index']].count
              )} ${data.datasets[0].metric}`
            },
          },
        },
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
