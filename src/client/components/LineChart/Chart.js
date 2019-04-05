import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'

import style from './style.scss'
import data from './dummyChartData'
import 'chartjs-plugin-style'

class LineChart extends React.PureComponent {
  render() {
    const { width, height, backgroundColor, dataSet, options } = this.props
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
        },
      },
    ]
    return (
      <div className={style.lineChartWrapper}>
        <Line
          data={dataSet || data}
          width={width}
          height={height}
          plugins={plugins}
          options={{
            responsive: false,
            chartArea: {
              backgroundColor: backgroundColor || 'transparent',
            },
            legend: {
              display: false,
            },
            tooltips: {
              position: 'nearest',
              backgroundColor: '#fff',
              titleFontColor: '#242b49',
              bodyFontColor: '#242b49',
              footerFontColor: '#242b49',
              xPadding: 10,
              yPadding: 16,
              cornerRadius: 0,
              callbacks: {
                label: function(tooltipItem, data) {
                  const { datasetIndex, index } = tooltipItem
                  return data.datasets[datasetIndex].data[index]
                },
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: true,
                    color: '#5a6386',
                    lineWidth: 0.7,
                    drawBorder: true,
                    drawTicks: false,
                  },
                  ticks: {
                    fontColor: '#fff',
                    fontSize: 12,
                    stepSize: 1,
                    beginAtZero: true,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: '#5a6386',
                    lineWidth: 0.7,
                    drawBorder: true,
                    drawTicks: false,
                  },
                  ticks: {
                    display: false,
                  },
                },
              ],
            },
            ...options,
          }}
        />
      </div>
    )
  }
}

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  options: PropTypes.object,
}

export default LineChart
