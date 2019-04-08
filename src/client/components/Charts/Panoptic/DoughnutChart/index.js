import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2'

import { doughnutOptions } from './options'

defaults.global.defaultFontFamily = 'ClanOTBold'
defaults.global.defaultFontSize = 14
defaults.global.defaultFontWeight = 700

const plugins = [
  {
    beforeDraw: function(chart) {
      const ctx = chart.chart.ctx
      const { top, bottom, left, right } = chart.chartArea
      ctx.save()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '14px ClanOTBold'
      ctx.fillText(
        'Total Percentage',
        (bottom - top) / 2 - 55,
        (right - left) / 2 + 4,
        right - left
      )
      ctx.restore()
    },
  },
]

const DoughnutChart = ({ data }) => (
  <Doughnut
    options={doughnutOptions}
    width={270}
    height={270}
    data={{
      labels: [...data],
      datasets: [
        {
          data: [...data],
          borderColor: '#303a5d',
          backgroundColor: ['#acb0be', '#8567f0', '#D0506C', '#51adc0'],
          hoverBackgroundColor: ['#acb0be', '#8567f0', '#D0506C', '#51adc0'],
        },
      ],
    }}
    plugins={plugins}
  />
)

export default DoughnutChart
