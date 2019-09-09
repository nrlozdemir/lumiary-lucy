import React, { Component } from 'react'
import classnames from 'classnames'
import { Bar } from 'react-chartjs-2'
import { withTheme } from 'ThemeContext/withTheme'
import style from './style.scss'
import { modifyTooltip } from 'Utils/tooltip'

class BarItem extends Component {
  render() {
    const {
      chartData,
      options,
      datasetKeyProvider,
      maxSteps,
      barChartOptions,
      videoNormalizer,
      metric,
      themeContext: { colors },
    } = this.props

    return (
      <div className="col-3">
        <div
          className={classnames(style.chartSection, {
            [style.dark]: colors.themeType === 'dark',
            [style.light]: colors.themeType === 'light',
          })}
        >
          <Bar
            data={chartData}
            key={Math.random()}
            options={{
              ...barChartOptions,

              tooltips: modifyTooltip({
                template: 'VideoReleasesBarChartTemplate',
                data: chartData,
                options: {
                  background: colors.tooltipBackground,
                  textColor: colors.tooltipTextColor,
                  caretColor: colors.tooltipBackground,
                },
                videoNormalizer,
                metric,
              }),

              scales: {
                ...barChartOptions.scales,
                yAxes: [
                  {
                    ...options.scales.yAxes[0],
                    ticks: {
                      ...options.scales.yAxes[0].ticks,
                      fontColor: colors.textColor,
                      fontSize: 12,
                      stepSize: maxSteps.engagement,
                    },
                    gridLines: {
                      ...options.scales.xAxes[0].gridLines,
                    },
                  },
                ],
                xAxes: [
                  {
                    barPercentage: 1,
                    categoryPercentage: 1,
                    ...options.scales.xAxes[0],
                    ticks: {
                      ...options.scales.xAxes[0].ticks,
                      fontColor: colors.textColor,
                      fontSize: 12,
                    },
                    gridLines: {
                      ...options.scales.xAxes[0].gridLines,
                    },
                  },
                ],
              },
            }}
            datasetKeyProvider={datasetKeyProvider}
          />
        </div>
        <div
          className={classnames(style.chartSectionBadge, {
            [style.dark]: colors.themeType === 'dark',
            [style.light]: colors.themeType === 'light',
          })}
        >
          {!!chartData.label && (
            <span
              style={{
                background: colors.labelBackground,
                color: colors.labelColor,
                boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
              }}
              className={style.label}
            >
              {chartData.label}
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default withTheme(BarItem)
