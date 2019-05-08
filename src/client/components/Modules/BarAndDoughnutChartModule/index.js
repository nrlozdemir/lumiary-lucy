import React from 'react'
import PropTypes from 'prop-types'
import Module from 'Components/Module'

import { Bar } from 'react-chartjs-2'
import DoughnutChart from 'Components/Charts/DoughnutChart'
import 'chartjs-plugin-datalabels'
import { randomKey } from 'Utils/index'

import style from './style.scss'
import classnames from 'classnames'
import { ThemeContext } from 'ThemeContext/themeContext'

const datasetKeyProvider = () => {
  return randomKey(5)
}

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
  data,
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
          <div
            className={classnames(style.container, reverse && style.reverse)}
          >
            {data && data.stackedChartData && (
              <div className={style.chartContainer}>
                <Bar
                  width={barCustoms.width}
                  height={barCustoms.height}
                  data={data.stackedChartData}
                  datasetKeyProvider={datasetKeyProvider}
                  key={Math.random()}
                  options={{
                    ...barCustoms.options,
                    chartArea: {
                      backgroundColor: colors.chartBackground,
                    },
                    scales: {
                      xAxes: [
                        {
                          ...barCustoms.options.scales.xAxes[0],
                          ticks: {
                            ...barCustoms.options.scales.xAxes[0].ticks,
                            fontColor: colors.textColor,
                          },
                          gridLines: {
                            ...barCustoms.options.scales.xAxes[0].gridLines,
                            color: colors.chartStadiumBarBorder,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          ...barCustoms.options.scales.yAxes[0],
                          ticks: {
                            ...barCustoms.options.scales.yAxes[0].ticks,
                            fontColor: colors.textColor,
                          },
                          gridLines: {
                            ...barCustoms.options.scales.yAxes[0].gridLines,
                            color: colors.chartStadiumBarBorder,
                            zeroLineColor: colors.chartStadiumBarBorder,
                          },
                        },
                      ],
                    },
                  }}
                  plugins={barPlugins}
                  cutoutPercentage={barCustoms.cutoutPercentage}
                  fillText={barCustoms.fillText}
                  dataLabelFunction={barCustoms.dataLabelFunction}
                  dataLabelInsert={barCustoms.dataLabelInsert}
                />
              </div>
            )}
            {data && data.doughnutData && (
              <div className={style.chartContainer}>
                <DoughnutChart
                  data={data.doughnutData}
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
  data: PropTypes.any.isRequired,
  moduleKey: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  legend: PropTypes.object,
  filters: PropTypes.array,
}

export default BarAndDoughnutChartModule
