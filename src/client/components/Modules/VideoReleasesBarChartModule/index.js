import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import cx from 'classnames'
import style from './style.scss'
import { randomKey } from 'Utils'

import { options, wrapperBarOptions } from './chartOptions'

import Legend from 'Components/Legend'

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

const renderLegend = (legend, legendEnd) => {
  if (!legend.length) {
    return null
  }

  return (
    <div className={style.headerLabel}>
      <div className={`d-flex align-items-center ${legendEnd ? 'justify-content-end' : 'justify-content-center'}`}>
        {legend.map((item, idx) => (
          <Legend
            key={`BarChartLegend_${idx}`}
            color={item.color}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}

const VideoReleasesBarChartModule = ({
  data,
  moduleKey,
  title,
  action,
  filters,
  legend,
  legendEnd
}) => {

  const datasetKeyProvider = () => {
    return randomKey(5)
  }

  if (!data && !data.length) return false

  return (
    <Module
      moduleKey={moduleKey}
      title={title}
      action={action}
      filters={filters || []}
      legend={renderLegend(legend, legendEnd)}
    >
      <div className={barChartContainer} data-first-legend={legend[0].label} data-second-legend={legend[1].label}>
        <div className={barContainerClass}>
          <div className={style.wrapperBarChart}>
            <Bar
              data={data}
              options={wrapperBarOptions(data)}
              datasetKeyProvider={datasetKeyProvider}
              plugins={plugins}
            />
          </div>
          <div className={style.groupChartsWrapper}>
            <div className="col-3">
              <div className={style.chartSection}>
                <Bar
                  data={data}
                  options={options}
                  datasetKeyProvider={datasetKeyProvider}
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
                  datasetKeyProvider={datasetKeyProvider}
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
                  datasetKeyProvider={datasetKeyProvider}
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

VideoReleasesBarChartModule.defaultProps = {
  data: [],
  legend: [],
  legendEnd: false
}

VideoReleasesBarChartModule.propTypes = {
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  filters: PropTypes.array,
  legend: PropTypes.array,
  legendEnd: PropTypes.bool
}

export default VideoReleasesBarChartModule;
