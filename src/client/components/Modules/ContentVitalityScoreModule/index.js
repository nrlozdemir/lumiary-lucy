import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import cx from 'classnames'
import LineChart from 'Components/Charts/LineChart'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
// import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
// import { isDataSetEmpty } from 'Utils/datasets'

const percentageCol = cx('col-4-no-gutters', style.percentageCol)

const ContentVitalityScoreModule = ({
  data = {},
  authProfile = {},
  moduleKey,
  title,
  action,
  filters,
  legend,
  removeTooltip,
  removePointRadius,
  xAxesFlatten,
  flattenFirstSpace,
  flattenLastSpace,
  options,
  loading = false,
  chartYAxisMax = 100,
  infoText,
}) => {
  const formattedData = Object.keys(data).reduce(
    (accumulator, uuid) => {
      switch (uuid) {
        case 'other':
          accumulator.average = {
            ...data[uuid],
            name: 'Average',
          }
          break

        default:
          if (uuid === authProfile.brand.uuid) {
            accumulator.brand_1 = {
              ...data[uuid],
              name: authProfile.brand.name,
            }
          } else {
            authProfile.brand.competitors.forEach((competitor) => {
              if (uuid === competitor.uuid) {
                accumulator.brand_2 = {
                  ...data[uuid],
                  name: competitor.name,
                }
              }
            })
          }
          break
      }

      return accumulator
    },
    {
      brand_1: null,
      brand_2: null,
      average: null,
    }
  )

  const roundRect = (ctx, x, y, width, height) => {
    const radius = 5
    ctx.beginPath()
    // ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
    // ctx.shadowBlur = 3
    // ctx.shadowOffsetX = 1
    // ctx.shadowOffsetY = 2
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()
    // ctx.shadowBlur = 0
    // ctx.shadowOffsetX = 0
    // ctx.shadowOffsetY = 0
  }

  // const newDatasets = {
  //   labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //   datasets: [
  //     {
  //       data:
  //         (formattedData.brand_2 && formattedData.brand_2.videoPercents) || [],
  //     },
  //     {
  //       data:
  //         (formattedData.brand_1 && formattedData.brand_1.videoPercents) || [],
  //     },
  //   ],
  // }

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
          loading={loading}
          isEmpty={false}
          infoText={infoText}
        >
          <div
            className="col-12-no-gutters"
            style={{ colors: colors.textColor }}
          >
            <div
              data-vertical-title="Number Of Videos"
              className={style.vitalityContainer}
            >
              <LineChart
                chartType="lineStackedArea"
                width={1120}
                height={295}
                tickUnvisible
                backgroundColor={colors.chartBackground}
                dataSet={
                  loading
                    ? {}
                    : {
                        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        datasets: [
                          {
                            data: [10, 25, 40, 55, 40, 25, 10, 9, 5, 4, 1],
                          },
                          {
                            data: [5, 6, 7, 8, 10, 15, 25, 45, 25, 15, 10],
                          },
                        ],
                      }
                }
                removeTooltip={removeTooltip}
                // removePointRadius={removePointRadius}
                // xAxesFlatten={xAxesFlatten}
                // flattenFirstSpace={flattenFirstSpace}
                // flattenLastSpace={flattenLastSpace}
                yAxesStepSize={500}
                yAxesMax={0}
                yAxesPercentage
                dynamicPercentage
                customLine
                options={{
                  ...options,
                  average: 50,
                  hover: {
                    mode: 'dataset',
                    intersect: false,
                    onHover: (a, c) => {
                      const max = Math.min.apply(
                        Math,
                        c.map(function(o) {
                          return o._model.y
                        })
                      )

                      const maxObject = c.find((o) => o._model.y === max)

                      const chart = maxObject && maxObject._chart
                      if (!maxObject) return null
                      const averagePoint =
                        ((chart.chartArea.right - chart.chartArea.left) / 100) *
                          chart.options.average +
                        48
                      chart.ctx.beginPath()
                      chart.ctx.setLineDash([8, 5])
                      const dashMarginTop = (30 * maxObject._model.y) / 285

                      if (averagePoint < maxObject._model.x) {
                        chart.ctx.moveTo(
                          averagePoint,
                          maxObject._model.y - dashMarginTop
                        )
                        chart.ctx.lineTo(
                          maxObject._model.x,
                          maxObject._model.y - dashMarginTop
                        )
                      } else {
                        chart.ctx.moveTo(
                          maxObject._model.x,
                          maxObject._model.y - dashMarginTop
                        )
                        chart.ctx.lineTo(
                          averagePoint,
                          maxObject._model.y - dashMarginTop
                        )
                      }
                      chart.ctx.moveTo(
                        maxObject._model.x,
                        maxObject._model.y - dashMarginTop
                      )
                      chart.ctx.lineTo(maxObject._model.x, maxObject._model.y)
                      chart.ctx.strokeStyle = '#505050'
                      chart.ctx.lineWidth = 2
                      chart.ctx.stroke()

                      chart.ctx.lineWidth = 4
                      chart.ctx.fillStyle = '#505050'
                      const rectWidth = 210
                      const rectHeight = 90

                      const rectX =
                        averagePoint < maxObject._model.x
                          ? maxObject._model.x + 20
                          : maxObject._model.x - rectWidth - 20
                      const rectY = maxObject._model.y - rectHeight / 2
                      roundRect(chart.ctx, rectX, rectY, rectWidth, rectHeight)
                      chart.ctx.font = '12px ClanOT'
                      chart.ctx.textAlign = 'center'
                      chart.ctx.textBaseline = 'middle'
                      chart.ctx.fillStyle = '#fff'

                      const text = `The average ${
                        maxObject._datasetIndex ? 'female' : 'male'
                      } scores 10\n points above your library\n average on facebook!`
                      const lines = text.split('\n')

                      for (let i = 0; i < lines.length; i++)
                        chart.ctx.fillText(
                          lines[i],
                          rectX + rectWidth / 2,
                          rectY + i * 20 + 25
                        )

                      if (averagePoint < maxObject._model.x) {
                        chart.ctx.beginPath()
                        chart.ctx.lineTo(rectX + 3, rectY + rectHeight / 2 - 13)
                        chart.ctx.lineTo(rectX - 10, rectY + rectHeight / 2)
                        chart.ctx.lineTo(rectX + 3, rectY + rectHeight / 2 + 13)
                      } else {
                        chart.ctx.beginPath()
                        chart.ctx.lineTo(
                          rectX + rectWidth,
                          rectY + rectHeight / 2 - 10
                        )
                        chart.ctx.lineTo(
                          rectX + rectWidth + 10,
                          rectY + rectHeight / 2
                        )
                        chart.ctx.lineTo(
                          rectX + rectWidth,
                          rectY + rectHeight / 2 + 10
                        )
                      }
                      chart.ctx.fillStyle = '#505050'
                      chart.ctx.fill()
                    },
                  },
                }}
              />
            </div>
            {formattedData.brand_1 &&
              formattedData.brand_2 &&
              formattedData.average && (
                <div className="row">
                  <div className={percentageCol}>
                    <div
                      className={style.legend}
                      style={{
                        background: colors.labelBackground,
                        color: colors.labelColor,
                        boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                      }}
                    >
                      {`${formattedData.brand_1.name}`}
                    </div>
                    <div
                      className={style.divider}
                      style={{
                        background: colors.moduleBorder,
                      }}
                    />
                    <PercentageBarGraph
                      key={Math.random()}
                      percentage={formattedData.brand_1.averageCvScore || 0}
                      color="blue"
                      percentageDataSet={{
                        datasets: [
                          {
                            data: formattedData.brand_1.videoPercents,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                max: chartYAxisMax,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                  <div className={percentageCol}>
                    <div
                      className={style.legend}
                      style={{
                        background: colors.labelBackground,
                        color: colors.labelColor,
                        boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                      }}
                    >
                      {`Average`}
                    </div>
                    <div
                      className={style.divider}
                      style={{
                        background: colors.moduleBorder,
                      }}
                    />
                    <PercentageBarGraph
                      key={Math.random()}
                      percentage={formattedData.average.averageCvScore || 0}
                      color="grey"
                      percentageDataSet={{
                        datasets: [
                          {
                            data: formattedData.average.videoPercents,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                max: chartYAxisMax,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                  <div className={percentageCol}>
                    <div
                      className={style.legend}
                      style={{
                        background: colors.labelBackground,
                        color: colors.labelColor,
                        boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
                      }}
                    >
                      {`${formattedData.brand_2.name}`}
                    </div>
                    <PercentageBarGraph
                      key={Math.random()}
                      percentage={formattedData.brand_2.averageCvScore || 0}
                      color="green"
                      percentageDataSet={{
                        datasets: [
                          {
                            data: formattedData.brand_2.videoPercents,
                          },
                        ],
                      }}
                      options={{
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                max: chartYAxisMax,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                </div>
              )}
          </div>
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

ContentVitalityScoreModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default ContentVitalityScoreModule
