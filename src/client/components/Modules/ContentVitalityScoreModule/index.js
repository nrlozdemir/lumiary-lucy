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
  chartYAxisMax = 100,
  brandCvSummary = {}
}) => {

  const formattedData = Object.keys(data).reduce((accumulator, brand) => {

    const thisBrand = {
      ...data[brand],
      uuid: brand,
    }

    // this assignment of variables needs to be fixed up
    if(authProfile.brand.uuid === brand){
      accumulator.brand_1 = {
        ...thisBrand,
        name: authProfile.brand.name,
      }
    } else if(brand !== 'other') {
      // authProfile.brand.comp
      accumulator.brand_2 = {
        ...thisBrand,
        name: 'test2',
      }
    } else {
      accumulator.average = {
        ...thisBrand,
        name: 'test1',
      }
    }

    return accumulator
  }, {
    brand_1: null,
    brand_2: null,
    average: {
      data: [],
      name: 'Average'
    },
  })

  console.log(data)
  console.log(authProfile)
  console.log(formattedData)

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
          {formattedData.brand_1 && formattedData.brand_2 && formattedData.average && (
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
                  dataSet={{
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    datasets: [{
                      data: formattedData.brand_2.videoPercents
                    }, {
                      data: formattedData.brand_1.videoPercents
                    }],
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
                    {`${formattedData.brand_2.name}`}
                  </div>
                  <div
                    className={style.divider}
                    style={{
                      background: colors.moduleBorder,
                    }}
                  />
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={formattedData.brand_1.averageCvScore}
                    color="blue"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.brand_1.videoPercents
                          }
                        ]
                      }
                    }
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              max: chartYAxisMax,
                            },
                          },
                        ],
                      }
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
                    percentage={formattedData.average.averageCvScore}
                    color="grey"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.average.videoPercents
                          }
                        ]
                      }
                    }
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              max: chartYAxisMax,
                            },
                          },
                        ],
                      }
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
                    percentage={formattedData.brand_2.averageCvScore}
                    color="green"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.brand_2.videoPercents
                          }
                        ]
                      }
                    }
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              max: chartYAxisMax,
                            },
                          },
                        ],
                      }
                    }}
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
