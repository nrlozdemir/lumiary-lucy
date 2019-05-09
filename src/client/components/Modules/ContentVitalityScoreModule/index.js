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

function combineChartData(chartData) {
  return chartCombineDataset(chartData, lineChartData_DatasetOptions, {
    beforeDraw: function(chart, easing) {
      if (
        chart.config.options.chartArea &&
        chart.config.options.chartArea.backgroundColor
      ) {
        const ctx = chart.chart.ctx
        const chartArea = chart.chartArea

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
  })
}

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
                  dataSet={data}
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
                      shadowColor: colors.labelShadow,
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
                    id={'percentageContainer-1'}
                    percentage={33.4}
                    color="#5292E5"
                    backgroundColor={colors.moduleBackground}
                  />
                </div>
                <div className={percentageCol}>
                  <div
                    className={style.legend}
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      shadowColor: colors.labelShadow,
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
                    id={'percentageContainer-2'}
                    percentage={40.1}
                    color="#8562F3"
                    backgroundColor={colors.moduleBackground}
                  />
                </div>
                <div className={percentageCol}>
                  <div
                    className={style.legend}
                    style={{
                      background: colors.labelBackground,
                      color: colors.labelColor,
                      shadowColor: colors.labelShadow,
                    }}
                  >
                    Female Audience
                  </div>
                  <PercentageBarGraph
                    key={Math.random()}
                    id={'percentageContainer-3'}
                    percentage={46.8}
                    color="#2FD7C4"
                    backgroundColor={colors.moduleBackground}
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
