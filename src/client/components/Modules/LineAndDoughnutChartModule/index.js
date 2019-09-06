import React from 'react'
import cx from 'classnames'
import Module from 'Components/Module'
import style from './style.scss'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { Line } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import moment from 'moment'
import { customChartToolTip, ucfirst } from 'Utils'
import {
  percentageManipulation,
  getCVScoreChartAttributes,
} from 'Utils/datasets'
import { modifyTooltip } from 'Utils/tooltip'

const sortCircles = (index) => {
  const text = {
    0: '1st',
    1: '2nd',
    2: '3rd',
    3: '4th',
  }
  return text[index]
}

const LineAndDoughnutChartModule = ({
  moduleKey,
  title,
  action,
  lineChartData = {},
  lineChartOptions,
  filters,
  isEmpty,
  loading = false,
  platform,
  properties,
  average,
  themeContext: { colors },
}) => {
  const percentageCol = cx('col-4-no-gutters', style.percentageCol)
  const container = cx('grid-container', style.container)
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
      beforeDatasetsDraw: function(chart, options) {
        chart.ctx.shadowColor = colors.lineChartShadowColorDark
        chart.ctx.shadowBlur = 2
        chart.ctx.shadowOffsetX = 1
        chart.ctx.shadowOffsetY = 1.2
      },
      afterDatasetsDraw: function(chart, options) {
        chart.ctx.shadowColor = 'transparent'
        chart.ctx.shadowBlur = 0
      },
    },
  ]
  const manipulatedProperties = percentageManipulation(properties)
  let sortableManipulatedProperties = []
  for (let property in manipulatedProperties) {
    sortableManipulatedProperties.push([
      { ...manipulatedProperties[property], name: property },
    ])
  }
  const sortedProperties = sortableManipulatedProperties.sort((a, b) => {
    const bValue = b[0].score.value === 'N/A' ? 0 : b[0].score.value
    const aValue = a[0].score.value === 'N/A' ? 0 : a[0].score.value
    return bValue - aValue
  })

  const { datasets = [] } = lineChartData
  const datasetMap = datasets.reduce((accumulator, dataset) => {
    accumulator[dataset.label] = dataset
    return accumulator
  }, {})

  const { datasets: lineChartDataSets = [] } = lineChartData
  const { chartYAxisMax, chartYAxisStepSize } = getCVScoreChartAttributes(
    lineChartDataSets,
    lineChartDataSets.reduce((accumulator, dataset) => {
      dataset.data.forEach((item) => {
        if (item > accumulator) {
          accumulator = item
        }
      })
      return accumulator
    }, 0)
  )

  let manipulateData = !!lineChartData && lineChartData

  !!manipulateData &&
    Object.keys(manipulateData).map((el, i) => {
      if (el === 'datasets') {
        Object.values(manipulateData[el]).map((d, k) => {
          manipulateData[el][k] = {
            ...d,

            borderWidth: 4,
            pointBackgroundColor:
              colors.themeType === 'dark' &&
              d.backgroundColor.substr(0, 4) === '#fff'
                ? '#acb0be'
                : d.backgroundColor,
            pointHoverBackgroundColor:
              colors.themeType === 'dark' &&
              d.backgroundColor.substr(0, 4) === '#fff'
                ? '#acb0be'
                : d.backgroundColor,
            pointBorderColor: colors.lineChartPointBorderColor,
            pointHoverBorderColor: colors.lineChartPointHoverBorderColor,
            pointBorderWidth: 1,
            pointHoverBorderWidth: 1,
            pointRadius: 5.4,
            pointHitRadius: 5.4,
            pointHoverRadius: 5.4,
          }
        })
      }
    })

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters}
      isEmpty={isEmpty}
      loading={loading}
    >
      <div className="grid-collapse">
        <div className="grid-container">
          <div className="col-12-no-gutters">
            <div className={style.vitalityChartContainer}>
              <div
                className={`${cx(style.contentVitalityChart)}`}
                data-legend="Content Vitality Score"
              >
                <Line
                  key={Math.random()}
                  data={manipulateData}
                  width={1230}
                  height={291}
                  plugins={plugins}
                  options={{
                    ...lineChartOptions,
                    responsive: false,
                    layout: {
                      padding: {
                        left: 30,
                        right: 70,
                        top: 0,
                        bottom: 0,
                      },
                    },
                    tooltips: modifyTooltip({
                      template: 'LineChartTemplate',
                      data: manipulateData,
                      platform: platform,
                      properties: properties,
                      average: average,
                      options: {
                        background: colors.tooltipBackground,
                        textColor: colors.tooltipTextColor,
                        caretColor: colors.tooltipBackground,
                      },
                    }),
                    chartArea: {
                      backgroundColor: colors.lineChartBackgroundColor,
                    },
                    scales: {
                      xAxes: [
                        {
                          ...lineChartOptions.scales.xAxes[0],
                          ticks: {
                            ...lineChartOptions.scales.xAxes[0].ticks,
                            fontColor: 'transparent',
                            padding: 22,
                            display: false,
                            callback: function(value, index, values) {
                              if (index === 0) {
                                return ' '.repeat(21) + value
                              } else if (index === values.length - 1) {
                                return value + ' '.repeat(18)
                              } else {
                                return value
                              }
                            },
                          },
                          gridLines: {
                            ...lineChartOptions.scales.xAxes[0].gridLines,
                            color: colors.lineChartGridColor,
                            zeroLineColor: colors.lineChartGridColor,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          ...lineChartOptions.scales.yAxes[0],

                          ticks: {
                            ...lineChartOptions.scales.yAxes[0].ticks,
                            callback: function(value, index, values) {
                              if (value === 0) {
                                return value + ' '.repeat(2)
                              } else if (value === chartYAxisMax) {
                                return value + '%'
                              } else {
                                return ''
                              }
                            },
                            stepSize: chartYAxisStepSize,
                            fontColor: colors.textColor,
                            max: chartYAxisMax,
                          },
                          gridLines: {
                            ...lineChartOptions.scales.yAxes[0].gridLines,
                            color: colors.lineChartGridColor,
                            zeroLineColor: colors.lineChartGridColor,
                          },
                        },
                      ],
                    },
                  }}
                />
                <div className={style.customXTicks}>
                  {manipulateData &&
                    !!manipulateData.labels &&
                    manipulateData.labels.map((label, i) => {
                      return (
                        <div
                          className={cx({
                            [style.tickItem]:
                              i < manipulateData.labels.length - 1,
                          })}
                          key={i}
                        >
                          <div className={style.textContainer}>
                            <span>{label}</span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={container}>
          {sortedProperties &&
            sortedProperties.map((property, idx) => {
              if (idx > 2) {
                return null
              }
              return (
                <div className={percentageCol} key={idx}>
                  <div
                    className={cx(style.legend, {
                      [style.dark]: colors.themeType === 'dark',
                      [style.light]: colors.themeType === 'light',
                    })}
                  >
                    <div
                      className={style.colorBubble}
                      style={{
                        backgroundColor:
                          datasetMap[property[0].name].backgroundColor.substr(
                            0,
                            4
                          ) === '#fff'
                            ? '#acb0be'
                            : datasetMap[property[0].name].backgroundColor,
                      }}
                    />
                    <div className={style.legendText}>{property[0].name}</div>
                  </div>
                  <div
                    className={style.divider}
                    style={{
                      background: colors.moduleBorder,
                    }}
                  />
                  <DoughnutChart
                    width={140}
                    height={140}
                    displayDataLabels={false}
                    cutoutPercentage={80}
                    datasetsBorderWidth={0}
                    datasetOptions={{
                      shadowOffsetX: 0.5,
                      shadowOffsetY: 0.5,
                      shadowBlur: 4,
                    }}
                    removeTooltip
                    average={average}
                    cvScoreData={{
                      platform: platform,
                    }}
                    layoutPadding={7}
                    data={{
                      datasets: [
                        {
                          borderColor: '#f3f6f9',
                          data: [
                            property[0].score.value === 'N/A'
                              ? 0
                              : Math.floor(property[0].score.value),
                            100 -
                              (property[0].score.value === 'N/A'
                                ? 0
                                : Math.floor(property[0].score.value)),
                          ],
                          backgroundColor: [
                            datasetMap[property[0].name].backgroundColor,
                            colors.doughnutChartBackgroundColor,
                          ],
                          hoverBackgroundColor: [
                            datasetMap[property[0].name].backgroundColor,
                            colors.doughnutChartBackgroundColor,
                          ],
                        },
                      ],
                      labels: ['a', 'b'],
                    }}
                    tooltipCaretPosition={idx <= 2 ? 'left' : 'right'}
                    tooltipTemplate="CircleChart"
                    currentDayIndex={
                      !!manipulateData &&
                      !!manipulateData.currentDayIndex &&
                      manipulateData.currentDayIndex
                    }
                    weekdayOrder={
                      !!manipulateData &&
                      !!manipulateData.weekdayOrder &&
                      manipulateData.weekdayOrder
                    }
                  />
                  <div
                    className={style.centerText}
                    style={{
                      color: colors.labelColor,
                    }}
                  >
                    <div className={style.wrapper}>
                      <span
                        className={style.bigText}
                        style={{
                          color: colors.labelColor,
                        }}
                      >
                        {property[0].score.value}{' '}
                      </span>
                      <span
                        className={style.littleText}
                        style={{
                          color: colors.labelColor,
                        }}
                      >
                        {property[0].score.value !== 'N/A' &&
                          `Score (${property[0].score.date.slice(0, 3)})`}
                      </span>
                    </div>
                  </div>
                  <p
                    className={style.doughnutChartText}
                    style={{
                      color: colors.labelColor,
                    }}
                  >
                    <b>{property[0].libraryPercent}%</b> of your library is shot
                    in <b>{property[0].name}</b> Pacing
                  </p>
                  <p
                    className={cx(style.sortText, {
                      [style.dark]: colors.themeType === 'dark',
                      [style.light]: colors.themeType === 'light',
                    })}
                  >
                    {sortCircles(idx)}
                  </p>
                </div>
              )
            })}

          {!loading && !isEmpty && (
            <div className={percentageCol} key={3}>
              <div
                className={cx(style.legend, {
                  [style.dark]: colors.themeType === 'dark',
                  [style.light]: colors.themeType === 'light',
                })}
                style={{
                  background: colors.labelBackground,
                  color: colors.labelColor,
                  boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                }}
              >
                <div
                  className={style.colorBubble}
                  style={{ backgroundColor: '#acb0be' }}
                />
                <div className={style.legendText}>
                  {!!platform && ucfirst(platform)} Average
                </div>
              </div>
              <div
                className={style.divider}
                style={{
                  background: colors.moduleBorder,
                }}
              />
              <DoughnutChart
                width={140}
                height={140}
                displayDataLabels={false}
                cutoutPercentage={80}
                datasetsBorderWidth={0}
                datasetOptions={{
                  shadowOffsetX: 0.5,
                  shadowOffsetY: 0.5,
                  shadowBlur: 4,
                }}
                removeTooltip
                average={null}
                cvScoreData={{
                  platform: platform,
                }}
                layoutPadding={7}
                data={{
                  datasets: [
                    {
                      borderColor: '#f3f6f9',
                      data: [average, 100 - average],
                      backgroundColor:
                        colors.themeType === 'light'
                          ? ['#fff', '#acb0be']
                          : ['#acb0be', '#545b79'],
                      hoverBackgroundColor:
                        colors.themeType === 'light'
                          ? ['#fff', '#acb0be']
                          : ['#acb0be', '#545b79'],
                    },
                  ],
                  labels: ['a', 'b'],
                }}
              />
              <div
                className={style.centerText}
                style={{
                  color: colors.labelColor,
                }}
              >
                <div
                  className={style.wrapper}
                  style={{
                    backgroundColor: colors.percentDifferenceColor,
                  }}
                >
                  <span
                    className={cx(style.bigText, style.averageText, {
                      [style.dark]: colors.themeType === 'dark',
                      [style.light]: colors.themeType === 'light',
                    })}
                  >
                    {average}
                  </span>
                  <span
                    className={cx(style.littleText, style.averageText, {
                      [style.dark]: colors.themeType === 'dark',
                      [style.light]: colors.themeType === 'light',
                    })}
                  >
                    Score (
                    {ucfirst(
                      moment()
                        .format('dddd')
                        .slice(0, 3)
                    )}
                    )
                  </span>
                </div>
              </div>
              <p
                className={cx(style.doughnutChartText, style.average)}
                style={{
                  color: colors.labelColor,
                }}
              >
                Your avg views per {!!platform && ucfirst(platform)} video over
                the past week is <b>11.2k</b> which is higher than{' '}
                <b>{!!average && average}%</b> of the Facebook market this week
              </p>
            </div>
          )}
        </div>
      </div>
    </Module>
  )
}

export default withTheme(LineAndDoughnutChartModule)
