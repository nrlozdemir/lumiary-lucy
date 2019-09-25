import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { customChartToolTip, ucfirst } from 'Utils'
import { percentageManipulation } from 'Utils/datasets'
import { withTheme } from 'ThemeContext/withTheme'
import { modifyTooltip } from 'Utils/tooltip'
import { beforeDrawFunc } from 'Utils/chart-plugins'
import get from 'lodash/get'
class HorizontalStackedBarChart extends React.Component {
  constructor(props) {
    super(props)
  }

  getTooltips({ datasets, labels }) {
    const {
      values,
      stadiumValues,
      tooltipType = false,
      themeContext: { colors },
    } = this.props

    return (
      (!!tooltipType &&
        (tooltipType === 'basic' &&
          customChartToolTip(colors, {
            callbacks: {
              title: () => '',
              label: function(tooltipItem, data) {
                const { datasetIndex } = tooltipItem
                const count = get(
                  data,
                  `datasets[${datasetIndex}].data[tooltipItem.index]`,
                  ''
                )
                const name = get(values, `[${datasetIndex}].title`, '')

                return `${percentageManipulation(count) || 0}% ${!!name &&
                  `| ${name}`}`
              },
            },
          }))) ||
      (tooltipType === 'extended' &&
        modifyTooltip(
          {
            template: 'HorizontalStackedBarChartTemplate',
            data: {
              datasets,
              labels,
              properties: stadiumValues.map((value) => ucfirst(value.title)),
            },
            options: {
              background: colors.tooltipBackground,
              textColor: colors.tooltipTextColor,
              caretColor: colors.tooltipBackground,
            },
          },
          {
            mode: 'single',
          }
        ))
    )
  }

  getxAxesTicksCallback(value, index, values) {
    if (index === 0) {
      return ' '.repeat(3) + value + '%'
    }
    if (index === values.length - 1) {
      return value + '%' + ' '.repeat(7)
    }
    return value + '%'
  }

  getOptions() {
    const {
      options,
      themeContext: { colors },
    } = this.props

    return {
      ...options,
      chartArea: {
        backgroundColor: colors.chartBackground,
      },
      scales: {
        xAxes: [
          {
            ...options.scales.xAxes[0],
            ticks: {
              ...options.scales.xAxes[0].ticks,
              fontColor: colors.textColor,
              callback: this.getxAxesTicksCallback,
            },
            gridLines: {
              ...options.scales.xAxes[0].gridLines,
              color: colors.chartStadiumBarBorder,
            },
          },
        ],
        yAxes: [
          {
            ...options.scales.yAxes[0],
            ticks: {
              ...options.scales.yAxes[0].ticks,
              fontColor: colors.textColor,
            },
            gridLines: {
              ...options.scales.yAxes[0].gridLines,
              color: colors.chartStadiumBarBorder,
              zeroLineColor: colors.chartStadiumBarBorder,
            },
          },
        ],
      },
    }
  }

  createDatasets(
    label,
    i,
    colors,
    stadiumValuesMapped,
    bucketLabels,
    labels,
    reorderDatasetByLabel = []
  ) {
    const { horizontalStackedBarDataOriginal = {} } = this.props

    const thisBucketLabel = bucketLabels[i]

    return {
      label,
      backgroundColor:
        !!stadiumValuesMapped[thisBucketLabel] &&
        stadiumValuesMapped[thisBucketLabel].color,
      borderColor: colors.chartBackground && colors.chartBackground,
      borderWidth: 2,
      data: labels.map((label) => {
        return horizontalStackedBarDataOriginal[label][thisBucketLabel]
      }),
    }
  }

  getDatasets() {
    const {
      horizontalStackedBarDataOriginal = {},
      stadiumValues,
      themeContext: { colors },
    } = this.props

    const stadiumValuesMapped = stadiumValues.reduce((accumulator, item) => {
      accumulator[item.title] = item
      return accumulator
    }, {})

    const bucketLabels =
      (!!horizontalStackedBarDataOriginal &&
        !!Object.values(horizontalStackedBarDataOriginal).length &&
        Object.keys(Object.values(horizontalStackedBarDataOriginal)[0])) ||
      []

    const labels = Object.keys(horizontalStackedBarDataOriginal).sort()

    const datasets = labels.map((label, i) => {
      return this.createDatasets(
        label,
        i,
        colors,
        stadiumValuesMapped,
        bucketLabels,
        labels,
        reorderDatasetByLabel
      )
    })
    let reorderDatasetByLabel = []
    if (datasets && !!datasets.length) {
      datasets.forEach((item) => {
        item.data.forEach((data, i) => {
          if (!reorderDatasetByLabel[i]) {
            reorderDatasetByLabel.push([])
          }
          reorderDatasetByLabel[i].push(data)
        })
      })
    }

    return datasets
  }

  render() {
    const {
      barData = {},
      width,
      height,
      horizontalStackedBarDataOriginal = {},
    } = this.props

    const { datasets: barDatasets = [] } = barData
    if (barDatasets.length === 0) {
      return null
    }

    const labels = Object.keys(horizontalStackedBarDataOriginal).sort()
    const data = {
      datasets: this.getDatasets(),
      labels,
    }
    const options = {
      ...this.getOptions(),
      tooltips: this.getTooltips(data),
    }

    return (
      <HorizontalBar
        key={Math.random()}
        data={data}
        width={width}
        height={height}
        options={options}
        plugins={[
          beforeDrawFunc({
            createBackground: true,
            strokeStyle: true,
          }),
        ]}
      />
    )
  }
}

export default withTheme(HorizontalStackedBarChart)
