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
  if (!legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div
        className={`d-flex align-items-center ${
          legendEnd ? 'justify-content-end' : 'justify-content-center'
        }`}
      >
        {legend.map((item, idx) => (
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
    themeContext: { colors },
  } = props

  if (!data && !data.length) return false
  const barChartOptions = {
    ...options,
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
              data={data}
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
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar
                  key={Math.random()}
                  data={data}
                  options={barChartOptions}
                  datasetKeyProvider={datasetKeyProvider}
                />
              </div>
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    shadowColor: colors.labelShadow,
                  }}
                >
                  Live Action
                </span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar
                  data={data}
                  options={barChartOptions}
                  datasetKeyProvider={datasetKeyProvider}
                />
              </div>
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    shadowColor: colors.labelShadow,
                  }}
                >
                  Stop Motion
                </span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar
                  data={data}
                  options={barChartOptions}
                  datasetKeyProvider={datasetKeyProvider}
                />
              </div>
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    shadowColor: colors.labelShadow,
                  }}
                >
                  Cinemagraph
                </span>
              </div>
            </div>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar data={data} options={barChartOptions} />
              </div>
              <div className={style.chartSectionBadge}>
                <span
                  style={{
                    background: colors.labelBackground,
                    color: colors.labelColor,
                    shadowColor: colors.labelShadow,
                  }}
                >
                  Animation
                </span>
              </div>
            </div>
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
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  filters: PropTypes.array,
  legend: PropTypes.array,
  legendEnd: PropTypes.bool,
}

export default withTheme(VideoReleasesBarChartModule)
