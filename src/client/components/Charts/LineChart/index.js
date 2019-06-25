import React from 'react'
import { Line } from 'react-chartjs-2'
import { randomKey } from 'Utils'
import { chartCombineDataset } from 'Utils/datasets'
import { fromJS } from 'immutable'
import { lineOptions, lineStackedAreaOptions } from './defaultOptions'

import { withTheme } from 'ThemeContext/withTheme'

function metricSuffix(number) {
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

function addPercentage(number) {
  return number + '%'
}

function combineChartData(data, type = null) {
  if (type === null || type === 'line') {
    return chartCombineDataset(data, lineOptions)
  } else if (type === 'lineStackedArea') {
    return chartCombineDataset(data, lineStackedAreaOptions)
  }
}

class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const themes = this.props.themeContext.colors
    const defaultProps = {
      width: 1200,
      height: 300,
      options: {
        responsive: false,
        plugins: {
          datalabels: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          xAlign: 'center',
          yAlign: 'bottom',
          backgroundColor: '#fff',
          titleFontColor: '#21243B',
          bodyFontColor: '#21243B',
          footerFontColor: '#21243B',
          xPadding: 14,
          yPadding: 14,
          cornerRadius: 10,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: themes.chartStadiumBarBorder,
                lineWidth: 0.7,
                drawBorder: true,
                drawTicks: false,
              },
              ticks: {
                fontColor: themes.textColor,
                fontSize: 12,
                fontFamily: 'ClanOTNews',
                fontWeight: 'normal',
                stepSize: 1,
                beginAtZero: true,
                padding: 20,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: themes.chartStadiumBarBorder,
                lineWidth: 0.7,
                drawBorder: true,
                drawTicks: false,
              },
              ticks: {
                display: true,
                fontColor: themes.textColor,
                fontSize: 12,
                fontFamily: 'ClanOTNews',
                fontWeight: 'normal',
                max: 250,
                stepSize: 50,
                beginAtZero: true,
                padding: 20,
              },
            },
          ],
        },
      },
    }

    let props = fromJS(defaultProps)
      .mergeDeep(this.props)
      .toJS()

    let plugins = []

    if (props.backgroundColor || themes.chartBackground) {
      plugins.push({
        beforeDraw: (chart, easing) => {
          let ctx = chart.chart.ctx
          let chartArea = chart.chartArea

          ctx.save()
          ctx.fillStyle = props.backgroundColor || themes.chartBackground
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        },
      })
    }

    if (props.xAxesFlatten) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        callback: (value, index, values) => {
          if (props.xAxesFlatten) {
            let space = props.flattenSpace || 11
            if (value.length === 1) {
              space = props.flattenSpace || 2
            }
            if (index === 0) {
              return ' '.repeat(props.flattenFirstSpace || space) + value
            }
            if (index === values.length - 1) {
              return value + ' '.repeat(props.flattenLastSpace || space)
            }
            return value
          }
          return value
        },
      }
    }

    if (props.yAxesPercentage) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        max: 100,
        callback: (value, index, values) => {
          return addPercentage(value)
        },
      }
    }

    if (props.yAxesAbbreviate) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        callback: (value, index, values) => {
          return metricSuffix(value)
        },
      }
    }

    if (props.customTooltipText) {
      props.options.tooltips = {
        ...props.options.tooltips,
        callbacks: {
          title: (tooltipItem, data) => {
            const { datasetIndex, index } = tooltipItem[0]
            return (
              metricSuffix(data.datasets[datasetIndex].data[index]) +
              ' ' +
              props.customTooltipText
            )
          },
          label: (tooltipItem, data) => {
            return null
          },
        },
      }
    }

    if (props.removeTooltip) {
      props.options.tooltips = {
        enabled: false,
      }
    }

    if (props.removePointRadius) {
      props.options.elements = {
        ...props.options.elements,
        point: {
          radius: 0,
        },
      }
    }

    if (props.ticksFontSize) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        fontSize: props.ticksFontSize,
      }

      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        fontSize: props.ticksFontSize,
      }
    }

    if (props.xAxesStepSize) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        stepSize: props.xAxesStepSize,
      }
    }

    if (props.yAxesStepSize) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        stepSize: props.yAxesStepSize,
      }
    }

    if (props.yAxesMax) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        max: props.yAxesMax,
      }
    }

    if (props.xAxesTicksFontBold) {
      props.options.scales.xAxes[0].ticks = {
        ...props.options.scales.xAxes[0].ticks,
        fontWeight: 'bold',
      }
    }

    if (props.yAxesTicksFontBold) {
      props.options.scales.yAxes[0].ticks = {
        ...props.options.scales.yAxes[0].ticks,
        fontWeight: 'bold',
      }
    }

    return (
      <React.Fragment>
        <Line
          key={Math.random()}
          data={combineChartData(props.dataSet, props.chartType)}
          plugins={plugins}
          datasetKeyProvider={this.datasetKeyProvider}
          {...props}
        />
      </React.Fragment>
    )
  }
}

export default withTheme(LineChart)
