import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import { customChartToolTip, randomKey, metricSuffix } from 'Utils'
import { withTheme } from 'ThemeContext/withTheme'

import { options, wrapperBarOptions } from './chartOptions'
import BarItem from './BarItem'

import Legend from 'Components/Legend'

const barChartContainer = cx(style.panopticBarChart)
const barContainerClass = cx(style.barChartContainer)

import Module from 'Components/Module'

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

const renderLegend = (legend, legendEnd) => {
  if (!!legend && !legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div
        className={`d-flex align-items-center ${
          legendEnd ? 'justify-content-end' : 'justify-content-center'
        }`}
      >
        {!!legend &&
          !!legend.length &&
          legend.map((item, idx) => (
            <Legend
              key={`BarChartLegend_${idx}`}
              color={item.color}
              label={item.label}
            />
          ))}
      </div>
    </div>
  )
}

const VideoReleasesBarChartModule = (props) => {
  const datasetKeyProvider = () => {
    return randomKey(5)
  }
  const {
    data,
    moduleKey,
    title,
    action,
    filters,
    legend,
    legendEnd,
    isEmpty,
    loading = false,
    themeContext: { colors },
  } = props

  if (!data) return false

  const metric = data[0] ? data[0].metric || 'engagement' : 'engagement'

  const maxSteps =
    !!data &&
    !!data.length &&
    data.reduce(
      (max, obj) => ({
        engagement:
          obj.maxEngagement > max.engagement
            ? obj.maxEngagement
            : max.engagement,
        vids: max.vids,
      }),
      { vids: 100, engagement: 0 }
    )

  const stepSize =
    maxSteps.engagement / 2 !== 0 ? maxSteps.engagement / 2 : 50000

  // normalize video counts in relation to engagement
  const videoNormalizer =
    maxSteps.engagement / maxSteps.vids !== 0
      ? maxSteps.engagement / maxSteps.vids
      : 50000

  const normalizedData =
    (!!data &&
      !loading &&
      !!data.length &&
      data.map((data) => ({
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: data.datasets[0].data.map(
              (v) =>
                //if all data array are 0, chart js has some problems, so making the data
                //0.000001 and this is fixed.(this data does not seen in chart)
                Math.round(v * videoNormalizer) || 0.000001
            ),
          },
          {
            ...data.datasets[1],
            //if all data array are 0, chart js has some problems, so making the data
            //0.000001 and this is fixed.(this data does not seen in chart)
            data: data.datasets[1].data.map((e) => e || -0.000001),
          },
        ],
      }))) ||
    []

  const barChartOptions = {
    ...options,
    tooltips: customChartToolTip(colors, {
      callbacks: {
        title: () => '',
        label: function(tooltipItem) {
          const value = Math.abs(tooltipItem.yLabel)
          if (tooltipItem.yLabel < 0) {
            return `${metricSuffix(~~value)} ${metric.charAt(0).toUpperCase() +
              metric.slice(1)}`
          }
          return `${Math.round(value / videoNormalizer)}% Videos`
        },
      },
    }),
    scales: {
      xAxes: [
        {
          ...options.scales.xAxes[0],
          ticks: {
            ...options.scales.xAxes[0].ticks,
            fontColor: colors.textColor,
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
            stepSize,
          },
        },
      ],
    },
  }

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters || []}
      legend={renderLegend(legend, legendEnd)}
      isEmpty={isEmpty}
      loading={loading}
    >
      <div
        className={barChartContainer}
        data-first-legend={legend[0].label}
        data-second-legend={legend[1].label}
        style={{
          background: colors.moduleBackground,
          color: colors.textColor,
        }}
      >
        <div className={barContainerClass}>
          <div className={style.wrapperBarChart}>
            <Bar
              key={Math.random()}
              data={normalizedData[0] || {}}
              options={{
                ...wrapperBarOptions,
                chartArea: {
                  backgroundColor: colors.chartBackground,
                },
                scales: {
                  xAxes: [
                    {
                      ...wrapperBarOptions.scales.xAxes[0],
                      gridLines: {
                        ...wrapperBarOptions.scales.xAxes[0].gridLines,
                        zeroLineColor: colors.barChartZerolineColor,
                        zeroLineWidth: 0.7,
                        color: colors.barChartborderColor,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      ...wrapperBarOptions.scales.yAxes[0],
                      ticks: {
                        ...wrapperBarOptions.scales.yAxes[0].ticks,
                        fontColor: colors.labelColor,
                        stepSize,
                        max: maxSteps.engagement,
                        min: -maxSteps.engagement,
                        callback: function(value, index, values) {
                          if (value == 0) {
                            return 0 + ' '.repeat(2)
                          }
                          const val = Math.abs(value)
                          const val2 = values[index] / videoNormalizer

                          if (value < 0) {
                            return val === maxSteps.engagement
                              ? `${metricSuffix(val)}`
                              : ''
                          }
                          return Math.round(val2) === 100 ? '100%' : ''
                        },
                      },
                      gridLines: {
                        ...wrapperBarOptions.scales.yAxes[0].gridLines,
                        zeroLineColor: colors.barChartZerolineColor,
                        color: colors.barChartborderColor,
                      },
                    },
                  ],
                },
              }}
              datasetKeyProvider={datasetKeyProvider}
              plugins={plugins}
            />
          </div>
          <div className={style.groupChartsWrapper}>
            {!!normalizedData &&
              !!normalizedData.length &&
              normalizedData.map((chartData, idx) => {
                return (
                  <BarItem
                    key={`vrbcmc-${idx}`}
                    chartData={chartData}
                    barChartOptions={barChartOptions}
                    options={options}
                    datasetKeyProvider={datasetKeyProvider}
                    maxSteps={maxSteps}
                    stepSize={stepSize}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </Module>
  )
}

VideoReleasesBarChartModule.defaultProps = {
  data: [],
  legend: [],
  legendEnd: false,
}

VideoReleasesBarChartModule.propTypes = {
  data: PropTypes.any,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  filters: PropTypes.array,
  legend: PropTypes.array,
  legendEnd: PropTypes.bool,
}

export default withTheme(VideoReleasesBarChartModule)
