import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import cx from 'classnames'
import LineChart from 'Components/Charts/LineChart'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'
import { isDataSetEmpty } from 'Utils/datasets'

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
  leftLabel,
  rightLabel
}) => {
  const formattedData = Object.keys(data).reduce(
    (accumulator, dataKey) => {
      switch (dataKey) {
        case 'other':
          accumulator.middleDataset = {
            ...data[dataKey],
            name: 'Average',
          }
          break

        case leftLabel:
          accumulator.leftDataset = {
            ...data[leftLabel],
            name: leftLabel,
          }
          break

        case rightLabel:
          accumulator.rightDataset = {
            ...data[rightLabel],
            name: rightLabel,
          }
          break

        default:
          if (dataKey === authProfile.brand.uuid) {
            accumulator.leftDataset = {
              ...data[dataKey],
              name: authProfile.brand.name,
            }
          } else {
            authProfile.brand.competitors.forEach((competitor) => {
              if (dataKey === competitor.uuid) {
                accumulator.rightDataset = {
                  ...data[dataKey],
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
      leftDataset: null,
      middleDataset: null,
      rightDataset: null,
    }
  )

  const newDatasets = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        data:
          (formattedData.rightDataset &&
            formattedData.rightDataset.videoPercents) ||
          [],
      },
      {
        data:
          (formattedData.leftDataset &&
            formattedData.leftDataset.videoPercents) ||
          [],
      },
    ],
  }

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
          isEmpty={isDataSetEmpty(loading ? {} : newDatasets)}
          infoText={infoText}
        >
          <div
            className="col-12-no-gutters"
            style={{ colors: colors.textColor }}
          >
            <div
              data-vertical-title="% with CV Score"
              className={style.vitalityContainer}
            >
              <LineChart
                chartType="lineStackedArea"
                width={1140}
                height={291}
                backgroundColor={colors.chartBackground}
                dataSet={
                  loading
                    ? {}
                    : {
                        datasets: [
                          {
                            data:
                              (formattedData.rightDataset &&
                                formattedData.rightDataset.videoPercents) ||
                              [],
                          },
                          {
                            data:
                              (formattedData.leftDataset &&
                                formattedData.leftDataset.videoPercents) ||
                              [],
                          },
                        ],
                      }
                }
                removeTooltip={removeTooltip}
                removePointRadius={removePointRadius}
                xAxesFlatten={xAxesFlatten}
                flattenFirstSpace={flattenFirstSpace}
                flattenLastSpace={flattenLastSpace}
                options={options}
              />
            </div>

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
                  Male Audience{' '}
                </div>
                <div
                  className={style.divider}
                  style={{
                    background: colors.moduleBorder,
                  }}
                />
                {formattedData.leftDataset && (
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={formattedData.leftDataset.averageCvScore || 0}
                    color="blue"
                    percentageDataSet={{
                      datasets: [
                        {
                          data: formattedData.leftDataset.videoPercents,
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
                )}
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
                  Percent Difference
                </div>
                <div
                  className={style.divider}
                  style={{
                    background: colors.moduleBorder,
                  }}
                />
                {formattedData.leftDataset && (
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={formattedData.middleDataset.averageCvScore || 0}
                    color="grey"
                    percentageDataSet={{
                      datasets: [
                        {
                          data: formattedData.middleDataset.videoPercents,
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
                )}
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
                  Female Audience{' '}
                </div>
                {formattedData.leftDataset && (
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={formattedData.rightDataset.averageCvScore || 0}
                    color="green"
                    percentageDataSet={{
                      datasets: [
                        {
                          data: formattedData.rightDataset.videoPercents,
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
                )}
              </div>
            </div>
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
