import React from 'react'
import { Line } from 'react-chartjs-2'
import { randomKey } from 'Utils'
import { chartCombineDataset } from 'Utils/datasets'
import { fromJS } from 'immutable'
import { lineOptions, lineStackedAreaOptions } from './defaultOptions'
import { withTheme } from 'ThemeContext/withTheme'

import { beforeDraw, afterDraw, datasetsDraw } from './utils'

function metricSuffix(number) {
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ['k', 'm', 'B', 'T'][Math.floor(unit / 3) - 1]
    return (number / ('1e' + unit)).toFixed(0) + unitname
  }

  return number
}

function combineChartData(data, type = null, customOptions = null) {
  if (!!customOptions) {
    return chartCombineDataset(data, customOptions)
  }
  if (type === null || type === 'line') {
    return chartCombineDataset(data, lineOptions)
  } else if (type === 'lineStackedArea') {
    return chartCombineDataset(data, lineStackedAreaOptions)
  }
}

class LineChart extends React.Component {
  constructor(props) {
    super(props)

    const themes = this.props.themeContext.colors
    this.state = {
      chartWidth: 1140,
      chartHeight: 285,
      options: {
        responsive: false,
        plugins: {
          datalabels: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
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
                display: this.props.tickUnvisible ? false : true,
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
  }

  mergeObjData(key, value, control = null) {
    if (control || (control === 'onlyValue' && value)) {
      return {
        [key]: value,
      }
    }
    return {}
  }

  xAxesCallback(props, value, index, values) {
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

  yAxesCallback(props, value) {
    if (props.yAxesPercentage) {
      return value + '%'
    }
    if (props.yAxesAbbreviate) {
      return metricSuffix(value)
    }
  }

  yAxesMax(props) {
    let maximumDatainDatasets
    if (props.dynamicPercentage) {
      const v =
        props.dataSet &&
        props.dataSet.datasets &&
        props.dataSet.datasets.map((dataset) => {
          return dataset.data
        })
      maximumDatainDatasets = v && Math.max(...[...v[0], ...v[1]])
    }

    if (props.yAxesPercentage) {
      return maximumDatainDatasets
        ? maximumDatainDatasets + maximumDatainDatasets * 0.3
        : 100
    }

    return props.yAxesMax
  }

  chartDraw(props) {
    const {
      themeContext: { colors: themes },
    } = props

    const data = {
      ...props,
      plugins: [
        ...beforeDraw([props.backgroundColor, themes.chartBackground]),
        ...afterDraw(props.customLine),
        ...datasetsDraw(props.shadow),
      ].filter((obj) => !!obj),
      options: {
        ...props.options,
        scales: {
          ...props.options.scales,
          xAxes: [
            {
              ...props.options.scales.xAxes[0],
              ticks: {
                ...props.options.scales.xAxes[0].ticks,
                ...this.mergeObjData('fontSize', props.ticksFontSize, 'value'),
                ...this.mergeObjData('stepSize', props.xAxesStepSize, 'value'),
                ...this.mergeObjData(
                  'fontWeight',
                  'bold',
                  props.xAxesTicksFontBold
                ),
                ...this.mergeObjData(
                  'callback',
                  (value, index, values) =>
                    this.xAxesCallback(props, value, index, values),
                  props.xAxesFlatten
                ),
              },
            },
          ],
          yAxes: [
            {
              ...props.options.scales.yAxes[0],
              ticks: {
                ...props.options.scales.yAxes[0].ticks,
                ...this.mergeObjData('fontSize', props.ticksFontSize, 'value'),
                ...this.mergeObjData('stepSize', props.yAxesStepSize, 'value'),
                ...this.mergeObjData('max', this.yAxesMax(props), 'value'),
                ...this.mergeObjData(
                  'fontWeight',
                  'bold',
                  props.yAxesTicksFontBold
                ),
                ...this.mergeObjData(
                  'callback',
                  (value) => this.yAxesCallback(props, value),
                  props.xAxesFlatten
                ),
              },
            },
          ],
        },
        tooltips: {
          ...props.options.tooltips,
          ...this.mergeObjData('enabled', false, props.removeTooltip),
          ...this.mergeObjData(
            'callbacks',
            {
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
            props.customTooltipText
          ),
        },
        elements: {
          ...props.options.elements,
          ...this.mergeObjData(
            'point',
            {
              radius: 0,
              hoverRadius: 0,
            },
            props.removePointRadius
          ),
        },
      },
    }

    return data
  }

  render() {
    const { options } = this.state

    const props = this.chartDraw(
      fromJS({ options })
        .mergeDeep(this.props)
        .toJS()
    )

    const customOptions =
      (!!props.customLineOptions && props.customLineOptions) || null
    let combinedData = combineChartData(
      props.dataSet,
      props.chartType,
      customOptions
    )
    if (props.customLineOptions) {
      combinedData.datasets =
        !!combinedData.datasets &&
        combinedData.datasets.map((item, index) => {
          return { ...item, ...props.customLineOptions[index] }
        })
    }

    return (
      <Line
        id="chartjs-customline"
        key={Math.random()}
        data={combinedData}
        datasetKeyProvider={() => randomKey(5)}
        height={this.state.chartHeight}
        width={this.state.chartWidth}
        {...props}
      />
    )
  }
}

export default withTheme(LineChart)
