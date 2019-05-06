import React from 'react'
import { Radar } from 'react-chartjs-2'

const plugins = [
  {
    beforeDraw: function (chart, easing) {
      let ctx = chart.chart.ctx
      let chartArea = chart.chartArea
      chart.config.data.datasets.forEach(function (dataset, i) {
        const meta = chart.controller.getDatasetMeta(i)
        meta.data.forEach(function (bar, index) {
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

const RadarChart = ({ data, width = 430, height = 430 }) => (
  <Radar
    data={data}
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
        padding: 30
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
          label: function (tooltipItem, data) {
            return (
              data['datasets'][0]['data'][tooltipItem['index']] +
              '% ' +
              data.labels[tooltipItem['index']].name
            )
          },
          afterLabel: function (tooltipItem, data) {
            return data.labels[tooltipItem['index']].count + 'k Shares'
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
          color: '#21243b',
        },
        pointLabels: {
          callback: function (value, index, values) {
            return ''
          },
          lineHeight: 4,
        },
        ticks: {
          callback: function (value) {
            return value + 'k'
          },
          backdropColor: 'transparent',
          fontSize: 10,
          display: true,
          maxTicksLimit: 5,
          beginAtZero: true,
          stepSize: 25,
        },
        angleLines: {
          color: '#3D4665',
        },
      },
    }}
  />
)

export default RadarChart
