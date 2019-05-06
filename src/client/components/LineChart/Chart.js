import React from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-chartjs-2'
import { randomKey } from 'Utils/index'
import style from './style.scss'
import data from './dummyChartData'

// Bar chart crash while this line allow, i will found a solution for this case
// import 'chartjs-plugin-style'

class LineChart extends React.PureComponent {
  datasetKeyProvider() {
    return randomKey(5)
  }
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
          datasetKeyProvider={this.datasetKeyProvider}
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
              titleFontColor: '#21243B',
              bodyFontColor: '#21243B',
              footerFontColor: '#21243B',
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
                    color: '#545B79',
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
                    color: '#545B79',
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
