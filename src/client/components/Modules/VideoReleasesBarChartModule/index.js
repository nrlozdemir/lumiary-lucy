import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import { randomKey } from 'Utils'
import { withTheme } from 'ThemeContext/withTheme'

import { options, wrapperBarOptions } from './chartOptions'

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
        {!!legend && !!legend.length && legend.map((item, idx) => (
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

  const maxSteps = !!data && !!data.length && data.reduce(
    (max, obj) => ({
      engagement:
        obj.maxEngagement > max.engagement ? obj.maxEngagement : max.engagement,
      vids: obj.maxVideo > max.vids ? obj.maxVideo : max.vids,
    }),
    { vids: 0, engagement: 0 }
  )

  const stepSize =
    maxSteps.engagement / 2 !== 0 ? maxSteps.engagement / 2 : 50000

  // normalize video counts in relation to engagement
  const videoNormalizer =
    maxSteps.engagement / maxSteps.vids !== 0
      ? maxSteps.engagement / maxSteps.vids
      : 50000

  const normalizedData = !!data && !!data.length && data.map((data) => ({
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        data: data.datasets[0].data.map((v) => v * videoNormalizer),
      },
      { ...data.datasets[1] },
    ],
  }))

  const barChartOptions = {
    ...options,
    tooltips: {
      ...options.tooltips,
      callbacks: {
        title: function(tooltipItem, data) {
          const value = Math.abs(tooltipItem[0].yLabel)
          if (tooltipItem[0].yLabel < 0) {
            return `${~~(value / 1000)}${value >= 1000 ? 'k' : ''} Engagement`
          }
          return `${value / videoNormalizer} Videos`
        },
        label: function() {
          return null
        },
      },
    },
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
      {!!data && !!data.length ? (
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
                data={normalizedData[0]}
                options={{
                  ...wrapperBarOptions,
                  chartArea: {
                    backgroundColor: colors.chartBackground,
                  },
                  scales: {
                    xAxes: [
                      {
                        ...wrapperBarOptions.scales.xAxes[0],
                      },
                    ],
                    yAxes: [
                      {
                        ...wrapperBarOptions.scales.yAxes[0],
                        ticks: {
                          ...wrapperBarOptions.scales.yAxes[0].ticks,
                          fontColor: colors.labelColor,
                          stepSize,
                          callback: function(value, index, values) {
                            if (value == 0) {
                              return 0
                            }
                            const val = Math.abs(value / 1000)
                            const val2 = values[index] / videoNormalizer

                            if (value < 0) {
                              return Math.abs(value) === maxSteps.engagement
                                ? `${~~val}${
                                    Math.abs(value) >= 1000 ? 'k' : ''
                                  }`
                                : ''
                            }
                            return val2 === maxSteps.vids ? `${val2}v` : ''
                          },
                        },
                        gridLines: {
                          ...wrapperBarOptions.scales.yAxes[0].gridLines,
                          color: colors.chartStadiumBarBorder,
                          zeroLineColor: colors.chartStadiumBarBorder,
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
              {!!data &&
                !!data.length &&
                normalizedData.map((chartData, idx) => (
                  <div className="col-3" key={`xxx666xxx-${idx}`}>
                    <div className={style.chartSection}>
                      <Bar
                        key={`vrbcmc-${idx}`}
                        data={chartData}
                        options={barChartOptions}
                        datasetKeyProvider={datasetKeyProvider}
                      />
                    </div>
                    <div className={style.chartSectionBadge}>
                      {!!chartData.label && (
                        <span
                          style={{
                            background: colors.labelBackground,
                            color: colors.labelColor,
                            boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                          }}
                        >
                          {chartData.label}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : null}
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
