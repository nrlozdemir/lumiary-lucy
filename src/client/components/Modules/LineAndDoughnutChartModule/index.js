import React from 'react'
import cx from 'classnames'
import Module from 'Components/Module'
import style from './style.scss'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import { Line } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import { chartColors } from 'Utils/globals'
import { customChartToolTip } from 'Utils'
import {
  percentageManipulation,
  getCVScoreChartAttributes,
} from 'Utils/datasets'

const LineAndDoughnutChartModule = ({
  moduleKey,
  title,
  action,
  lineChartData,
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
    return b[0].score.value - a[0].score.value
  })

  const { datasets:lineChartDataSets = [] } = lineChartData
  const { chartYAxisMax, chartYAxisStepSize } = getCVScoreChartAttributes(
    lineChartDataSets,
    lineChartDataSets.reduce((accumulator, dataset) => {
      dataset.data.forEach((item) => {
        if(item > accumulator) {
          accumulator = item
        }
      })
      return accumulator
    }, 0)
  )

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
            <div
              className={`${cx(style.contentVitalityChart)}`}
              data-legend="Content Vitality Score"
            >
              <Line
                key={Math.random()}
                data={lineChartData}
                width={1120}
                height={291}
                plugins={plugins}
                options={{
                  ...lineChartOptions,
                  tooltips: customChartToolTip(colors, {
                    callbacks: {
                      title: () => '',
                      label: function(tooltipItem, data) {
                        const { datasetIndex } = tooltipItem
                        const count =
                          (data &&
                            data.datasets &&
                            data.datasets[datasetIndex] &&
                            data.datasets[datasetIndex].data[
                              tooltipItem['index']
                            ]) ||
                          ''
                        const name =
                          (data &&
                            lineChartData &&
                            lineChartData.datasets[datasetIndex].label) ||
                          ''
                        return `${percentageManipulation(count) ||
                          0} Score ${!!name && `| ${name}`}`
                      },
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
                          fontColor: colors.labelColor,
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
                              return value + ' '
                            } else if (value === chartYAxisMax) {
                              return value
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
                    className={style.legend}
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                    }}
                  >
                    {property[0].name}
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
                            property[0].score.value,
                            100 - property[0].score.value,
                          ],
                          backgroundColor: [chartColors[idx], '#acb0be'],
                          hoverBackgroundColor: [chartColors[idx], '#acb0be'],
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
                        Score ({property[0].score.date.slice(0, 3)})
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
                    in <b>{property[0].name}</b>
                  </p>
                </div>
              )
            })}
        </div>
      </div>
    </Module>
  )
}

export default withTheme(LineAndDoughnutChartModule)
