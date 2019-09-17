import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'

import StackedBarChart from 'Components/Charts/StackedBarChart'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import 'chartjs-plugin-datalabels'
import renderLegend from 'Components/Legend/render'

import style from './style.scss'
import classnames from 'classnames'
import { ThemeContext } from 'ThemeContext/themeContext'
import { isDataSetEmpty } from 'Utils/datasets'
import { formatToSmallText } from 'Utils/globals'

const barPlugins = [
  {
    beforeDraw: function(chart, easing) {
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
      let configX = chart.config.options.scales.xAxes
      //Save the rendering context state
      ctx.save()
      ctx.strokeStyle = configX[0].gridLines.color
      ctx.lineWidth = configX[0].gridLines.lineWidth

      ctx.beginPath()
      ctx.moveTo(chart.chartArea.right, chart.chartArea.top)
      ctx.lineTo(chart.chartArea.right, chart.chartArea.bottom)
      ctx.stroke()

      //Restore the rendering context state
      ctx.restore()
    },
  },
]

const BarAndDoughnutChartModule = ({
  moduleKey,
  title,
  action,
  filters,
  legend,
  leftTitle,
  rightTitle,
  reverse,
  barCustoms,
  doughnutCustoms,
  doughnutData,
  stackedChartData,
  loading = false,
}) => {
  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          moduleKey={moduleKey}
          title={title}
          action={action}
          filters={filters}
          legend={renderLegend(legend)}
          isEmpty={isDataSetEmpty(stackedChartData)}
          loading={loading}
        >
          <div
            className={classnames(style.container, reverse && style.reverse)}
          >
            {stackedChartData && (
              <div className={style.chartContainer}>
                <StackedBarChart
                  width={barCustoms.width}
                  height={barCustoms.height}
                  barData={!loading ? stackedChartData : null}
                  datalabels={barCustoms.datalabels}
                  barSpacing={4}
                  hideLabels={barCustoms.hideLabels}
                  {...barCustoms}
                />
                {barCustoms.hideLabels && (
                  <div className={style.labels}>
                    {stackedChartData.labels &&
                      stackedChartData.labels.map((label, idx) => {
                        return formatToSmallText[label.trim()] ? (
                          <div
                            className={style.label}
                            data-text={label.trim()}
                            key={idx}
                          >
                            {formatToSmallText[label.trim()]}{' '}
                            <i className="icon icon-Information" />
                          </div>
                        ) : (
                          <div className={style.label} key={idx}>
                            {label}
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>
            )}
            {doughnutData && (
              <div className={style.chartContainer}>
                <DoughnutChart
                  customDoughnutContainer={style.doughnutChartContainer}
                  key={Math.random()}
                  data={!loading ? doughnutData : {}}
                  width={doughnutCustoms.width}
                  height={doughnutCustoms.height}
                  options={{
                    ...doughnutCustoms.options,
                  }}
                  cutoutPercentage={doughnutCustoms.cutoutPercentage}
                  fillText={doughnutCustoms.fillText}
                  dataLabelFunction={doughnutCustoms.dataLabelFunction}
                  dataLabelInsert={doughnutCustoms.dataLabelInsert}
                  customStyle={{
                    marginLeft: reverse ? 0 : 56,
                    marginRight: reverse ? 56 : 0,
                  }}
                  datasetsBorderWidth={1.4}
                  tooltipMode="nearest"
                  datasetOptions={{
                    shadowOffsetX: 2,
                    shadowOffsetY: 1.5,
                    shadowBlur: 4,
                    hoverShadowBlur: 4,
                  }}
                  layoutPadding={8}
                />
              </div>
            )}
          </div>
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

BarAndDoughnutChartModule.propTypes = {
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.array,
  filters: PropTypes.array,
}

export default BarAndDoughnutChartModule
