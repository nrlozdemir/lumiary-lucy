import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import { customChartToolTip, metricSuffix } from 'Utils'
import style from './style.scss'

class BarItem extends Component {
  render() {
    const {
      chartData,
      options,
      datasetKeyProvider,
      maxSteps,
      barChartOptions,
      colors,
    } = this.props

    return (
      <div className="col-3">
        <div className={style.chartSection}>
          <Bar
            data={chartData}
            key={Math.random()}
            options={{
              ...barChartOptions,
              scales: {
                ...barChartOptions.scales,
                yAxes: [
                  {
                    ...options.scales.yAxes[0],
                    ticks: {
                      ...options.scales.yAxes[0].ticks,
                      stepSize: maxSteps.engagement,
                    },
                  },
                ],
              },
            }}
            datasetKeyProvider={datasetKeyProvider}
          />
        </div>
        <div className={style.chartSectionBadge}>
          {!!chartData.label && (
            <span
              style={{
                background: colors.labelBackground,
                color: colors.labelColor,
                boxShadow: `0 1px 2px 0 ${colors.labelShadow}`,
              }}
            >
              {chartData.label}
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default BarItem