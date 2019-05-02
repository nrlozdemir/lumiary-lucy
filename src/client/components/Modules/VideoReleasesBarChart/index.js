import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import { randomKey } from 'Utils/index'

import { options, wrapperBarOptions } from './chartOptions'

const barChartContainer = cx(style.panopticBarChart)
const barContainerClass = cx(style.barChartContainer)

import Module from 'Components/Module'

const plugins = [
  {
    beforeDraw: function (chart, easing) {
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

class VideoReleasesBarChart extends Component {
  datasetKeyProvider() {
    return randomKey(5)
  }

  render() {
    const {
      data,
      moduleKey,
      title,
      action,
      filters,
      legend
    } = this.props

    return (
      <Module
        moduleKey={moduleKey}
        title={title}
        action={action}
        filters={filters || []}
        legend={legend}
      >
        <div className={barChartContainer}>
          <div className={barContainerClass}>
            <div className={style.wrapperBarChart}>
              <Bar
                data={data}
                options={wrapperBarOptions}
                datasetKeyProvider={this.datasetKeyProvider}
                plugins={plugins}
              />
            </div>
            <div className={style.groupChartsWrapper}>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Live Action</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Stop Motion</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar
                    data={data}
                    options={options}
                    datasetKeyProvider={this.datasetKeyProvider}
                  />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Cinemagraph</span>
                </div>
              </div>
              <div className="col-3">
                <div className={style.chartSection}>
                  <Bar data={data} options={options} />
                </div>
                <div className={style.chartSectionBadge}>
                  <span>Animation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Module>
    )
  }
}

export default VideoReleasesBarChart;
