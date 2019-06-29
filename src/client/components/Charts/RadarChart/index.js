import React from 'react'
import { Radar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { metricSuffix } from 'Utils'

const plugins = [
  {
    beforeDraw: function(chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function(dataset, i) {
        const meta = chart.controller.getDatasetMeta(i)
        meta.data.forEach(function(bar, index) {
          ctx.beginPath()
          const color = chart.config.data.labels[index].color
          const selected = chart.config.data.labels[index].selected
          const pointLabelPosition = bar._scale.getPointPosition(
            index,
            bar._scale.getDistanceFromCenterForValue(bar._scale.max) +
              (selected ? 31 : 25)
          )
          // draw a circle at that point
          ctx.beginPath()
          ctx.arc(
            pointLabelPosition.x,
            pointLabelPosition.y,
            selected ? 12 : 6,
            0,
            2 * Math.PI,
            false
          )
          ctx.fillStyle = color
          ctx.fill()
          if (selected) {
            ctx.stroke()
            // ctx.shadowColor = 'black'
            // ctx.shadowBlur = 0
            // ctx.shadowOffsetX = 0
            // ctx.shadowOffsetY = 8
          }
        })
      })
    },
  },
]

const RadarChart = (props) => {
  const { data, width = 430, height = 430 } = props
  const themes = props.themeContext.colors
  let parsedData = data || {}
  let maxTicksStepLimit = 100000
  let stepSize = 2500000

  const hasData =
    !!parsedData && !!parsedData.datasets && !!parsedData.datasets[0]

  if (hasData) {
    parsedData.datasets[0].backgroundColor = themes.chartBackgroundColor
    parsedData.datasets[0].pointBackgroundColor =
      themes.chartPointBackgroundColor
    parsedData.datasets[0].pointBorderColor = themes.chartPointBorderColor

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
        layout: {
          padding: 30,
        },
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
              return (
                metricSuffix(data.labels[tooltipItem['index']].count) +
                ' Shares'
              )
            },
          },
        },
        plugins: {
          datalabels: false,
        },
        scale: {
          gridLines: {
            lineWidth: 19,
            zeroLineColor: '#FFF',
            color: themes.bodyBackground,
          },
          pointLabels: {
            callback: function(value, index, values) {
              return ''
            },
            lineHeight: 4,
          },
          ticks: {
            stepSize,
            callback: function(value) {
              return metricSuffix(value)
            },
            backdropColor: 'transparent',
            fontSize: 10,
            display: true,
            maxTicksLimit: 5,
            min: 0,
            max: maxTicksStepLimit,
            beginAtZero: true,
          },
          angleLines: {
            color: '#3D4665',
          },
        },
      }}
    />
  )
}

export default withTheme(RadarChart)
