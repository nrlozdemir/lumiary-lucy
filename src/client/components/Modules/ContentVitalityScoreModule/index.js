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
  chartYAxisMax = 100,
  brandCvSummary = {}
}) => {

  console.log('brandCvSummary', brandCvSummary)

  const { brands = {} } = data

  const formattedData = Object.keys(brands).reduce((accumulator, brand) => {

    const thisBrand = {
      ...brands[brand],
      uuid: brand,
    }
    if(!thisBrand.isCompetitor){
      accumulator.brand_1 = thisBrand
    } else {
      accumulator.brand_2 = thisBrand
    }

    if(accumulator.brand_1 && accumulator.brand_2){
      accumulator.brand_1.data.forEach((datum, idx) => {
        const average = (datum + accumulator.brand_2.data[idx]) / 2
        accumulator.average.data.push(average)
      })
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

  console.log(formattedData)
  console.log('data.datasets', data.datasets)
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
          {data && data.datasets && data.datasets.length > 0 && (
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
                    datasets: [formattedData.brand_2, formattedData.brand_1],
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
                    percentage={Math.round(brandCvSummary[formattedData.brand_1.uuid].sum/brandCvSummary[formattedData.brand_1.uuid].count).toFixed(1)}
                    color="blue"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.brand_1.data
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
                    {`${formattedData.average.name}`}
                  </div>
                  <div
                    className={style.divider}
                    style={{
                      background: colors.moduleBorder,
                    }}
                  />
                  <PercentageBarGraph
                    key={Math.random()}
                    percentage={Math.round((brandCvSummary[formattedData.brand_1.uuid].sum + brandCvSummary[formattedData.brand_2.uuid].sum)/(brandCvSummary[formattedData.brand_1.uuid].count + brandCvSummary[formattedData.brand_2.uuid].count)).toFixed(1)}
                    color="grey"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.average.data
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
                    percentage={Math.round(brandCvSummary[formattedData.brand_2.uuid].sum/brandCvSummary[formattedData.brand_2.uuid].count).toFixed(1)}
                    color="green"
                    percentageDataSet={
                      {
                        datasets: [
                          {
                            data: formattedData.brand_2.data
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
