import React from 'react'
import { Radar } from 'react-chartjs-2'

import { radarChartOptions } from './options'

const RadarChart = ({ data }) => (
  <Radar
    data={data}
    width={420}
    height={420}
    responsive={true}
    options={{
      legend: {
        display: false,
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
            return (
              data['datasets'][0]['data'][tooltipItem['index']] +
              '% ' +
              data.labels[tooltipItem['index']].name
            )
          },
          afterLabel: function(tooltipItem, data) {
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
        },
        pointLabels: {
          fontColor: data.labels.map((lbl) => lbl.color),
          callback: function(value, index, values) {
            if (value.selected) return ' ● '
            return ' • '
          },
          fontSize: 54,
        },
        ticks: {
          callback: function(value) {
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
