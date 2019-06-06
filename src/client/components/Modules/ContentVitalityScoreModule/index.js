import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'
import cx from 'classnames'
import LineChart from 'Components/Charts/LineChart'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { lineChartOptions, lineChartData_DatasetOptions } from './options'
import { chartCombineDataset } from 'Utils'
import style from './style.scss'
import { ThemeContext } from 'ThemeContext/themeContext'

const percentageCol = cx('col-4-no-gutters', style.percentageCol)

const ContentVitalityScoreModule = ({
  data,
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
}) => {
  const dataOverride = {
    datasets: [
      {
        data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      },
      {
        data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
      },
    ]
  }

  console.log('data', data)

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={legend}
        >
          {data && data.datasets && (
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
                  width={1140}
                  height={291}
                  backgroundColor={colors.chartBackground}
                  dataSet={{
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    datasets: data.datasets,
                  }}
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
                    Male Audience
                  </div>
                  <div
                    className={style.divider}
                    style={{
                      background: colors.moduleBorder,
                    }}
                  />
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={100}
                    color="blue"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                          }
                        ]
                      }
                    }
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
                    Your Library
                  </div>
                  <div
                    className={style.divider}
                    style={{
                      background: colors.moduleBorder,
                    }}
                  />
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={100}
                    color="grey"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                          }
                        ]
                      }
                    }/>
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
                    Female Audience
                  </div>
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={100}
                    color="green"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                          }
                        ]
                      }
                    }
                  />
                </div>
              </div>
            </div>
          )}
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
